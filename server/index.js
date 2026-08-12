import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/api/contact', (req, res) => {
  const { name, email, phone, company, requirement, message } = req.body;
  console.log('Contact request received:', { name, email, phone, company, requirement, message });

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
    location: 'Pune, Maharashtra, India'
  });
});

app.listen(port, () => {
  console.log(`AD Brothers backend is running at http://localhost:${port}`);
});
