import crypto from 'crypto';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 4000;
const jwtSecret = process.env.JWT_SECRET || '';
const adminUsername = process.env.ADMIN_USERNAME || '';
const adminPassword = process.env.ADMIN_PASSWORD || '';
const mongoUri = process.env.MONGODB_URI || '';
const defaultOrigins = [
  'http://localhost:5173',
  'https://sumitchaskar0007-coder.github.io',
  'https://ad-brothers-india.govind-budhw-2600.chatgpt.site',
];
const allowedOrigins = (process.env.CLIENT_ORIGINS || defaultOrigins.join(','))
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  category: { type: String, required: true, trim: true, maxlength: 60 },
  description: { type: String, trim: true, maxlength: 500, default: '' },
  imageUrl: { type: String, required: true },
  altText: { type: String, trim: true, maxlength: 180, default: '' },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

gallerySchema.index({ createdAt: -1 });
gallerySchema.index({ category: 1, createdAt: -1 });

const GalleryItem = mongoose.model('GalleryItem', gallerySchema);

app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed.'));
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '3mb' }));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, error: 'Too many sign-in attempts. Please wait 15 minutes.' },
});

function secureEqual(value, expected) {
  const valueBuffer = Buffer.from(String(value));
  const expectedBuffer = Buffer.from(String(expected));
  return valueBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(valueBuffer, expectedBuffer);
}

function requireDatabase(_req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ success: false, error: 'Gallery database is not connected.' });
  }
  return next();
}

function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : '';

  if (!token || !jwtSecret) {
    return res.status(401).json({ success: false, error: 'Please sign in to continue.' });
  }

  try {
    const payload = jwt.verify(token, jwtSecret, { algorithms: ['HS256'] });
    if (payload.role !== 'admin') throw new Error('Invalid role');
    req.admin = payload;
    return next();
  } catch {
    return res.status(401).json({ success: false, error: 'Your session has expired. Please sign in again.' });
  }
}

function validateImageUrl(value) {
  if (typeof value !== 'string' || !value) return false;
  if (/^data:image\/(jpeg|png|webp);base64,[a-z0-9+/=]+$/i.test(value)) return value.length <= 2_500_000;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) && value.length <= 2_000;
  } catch {
    return false;
  }
}

function cleanGalleryInput(body) {
  const item = {
    title: String(body.title || '').trim(),
    category: String(body.category || '').trim(),
    description: String(body.description || '').trim(),
    imageUrl: String(body.imageUrl || '').trim(),
    altText: String(body.altText || '').trim(),
    featured: Boolean(body.featured),
  };

  if (!item.title || item.title.length > 120) return { error: 'Add a title of up to 120 characters.' };
  if (!item.category || item.category.length > 60) return { error: 'Add a category of up to 60 characters.' };
  if (item.description.length > 500) return { error: 'Description must be 500 characters or fewer.' };
  if (item.altText.length > 180) return { error: 'Image description must be 180 characters or fewer.' };
  if (!validateImageUrl(item.imageUrl)) return { error: 'Use a valid image URL or upload a JPG, PNG, or WebP image under 1.5 MB.' };
  if (!item.altText) item.altText = item.title;
  return { item };
}

app.get('/api/health', (_req, res) => {
  res.json({ success: true, database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.post('/api/admin/login', loginLimiter, (req, res) => {
  if (!adminUsername || !adminPassword || !jwtSecret) {
    return res.status(503).json({ success: false, error: 'Admin access has not been configured.' });
  }

  const valid = secureEqual(req.body?.username || '', adminUsername)
    && secureEqual(req.body?.password || '', adminPassword);
  if (!valid) return res.status(401).json({ success: false, error: 'Incorrect username or password.' });

  const token = jwt.sign(
    { sub: adminUsername, role: 'admin' },
    jwtSecret,
    { algorithm: 'HS256', expiresIn: '8h', issuer: 'ad-brothers-api' },
  );
  return res.json({ success: true, token, admin: { username: adminUsername } });
});

app.get('/api/admin/me', requireAdmin, (req, res) => {
  res.json({ success: true, admin: { username: req.admin.sub } });
});

app.get('/api/gallery', requireDatabase, async (_req, res, next) => {
  try {
    const items = await GalleryItem.find().sort({ featured: -1, createdAt: -1 }).lean();
    return res.json({ success: true, items });
  } catch (error) {
    return next(error);
  }
});

app.post('/api/admin/gallery', requireAdmin, requireDatabase, async (req, res, next) => {
  const { item, error } = cleanGalleryInput(req.body || {});
  if (error) return res.status(400).json({ success: false, error });
  try {
    const created = await GalleryItem.create(item);
    return res.status(201).json({ success: true, item: created });
  } catch (databaseError) {
    return next(databaseError);
  }
});

app.patch('/api/admin/gallery/:id', requireAdmin, requireDatabase, async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ success: false, error: 'Invalid gallery item.' });
  }
  const { item, error } = cleanGalleryInput(req.body || {});
  if (error) return res.status(400).json({ success: false, error });
  try {
    const updated = await GalleryItem.findByIdAndUpdate(req.params.id, item, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, error: 'Gallery item not found.' });
    return res.json({ success: true, item: updated });
  } catch (databaseError) {
    return next(databaseError);
  }
});

app.delete('/api/admin/gallery/:id', requireAdmin, requireDatabase, async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ success: false, error: 'Invalid gallery item.' });
  }
  try {
    const deleted = await GalleryItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Gallery item not found.' });
    return res.json({ success: true });
  } catch (databaseError) {
    return next(databaseError);
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ success: false, error: 'Please provide name, email, phone, and message.' });
  }
  return res.json({ success: true, message: 'Thank you! Your enquiry has been received.' });
});

app.get('/api/info', (_req, res) => {
  res.json({
    company: 'AD Brothers',
    business: 'Hotel & Hospitality Management and Manpower Consulting',
    founded: 2013,
    location: 'Pune, Maharashtra, India',
  });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  const message = error.name === 'ValidationError'
    ? 'Please check the gallery information and try again.'
    : 'Something went wrong. Please try again.';
  res.status(500).json({ success: false, error: message });
});

async function start() {
  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10_000 });
      console.log('MongoDB Atlas connected.');
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
    }
  } else {
    console.warn('MONGODB_URI is not configured. Gallery writes are unavailable.');
  }

  app.listen(port, () => {
    console.log(`AD Brothers backend is running on port ${port}.`);
  });
}

start();
