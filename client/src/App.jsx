import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import DashboardPage from './pages/DashboardPage';
import { withBase, withoutBase } from './lib/paths';

const routes = {
  '/': HomePage,
  '/services': ServicesPage,
  '/about': AboutPage,
  '/careers': CareersPage,
  '/contact': ContactPage,
  '/gallery': GalleryPage,
  '/dashboard': DashboardPage,
};

const metadata = {
  '/': {
    title: 'AD Brothers | Hotel & Hospitality Management Consultancy India',
    description: 'Hotel operations, pre-opening, F&B, workforce, audit, and hospitality management consultancy from Pune across India.',
  },
  '/services': {
    title: 'Hotel Management Consultancy Services | AD Brothers',
    description: 'Explore hotel operations, pre-opening, commercial performance, F&B, workforce advisory, and hospitality audit services.',
  },
  '/about': {
    title: 'About AD Brothers | Hospitality Management Consultants',
    description: 'Learn about AD Brothers, a Pune-based hotel and hospitality management consultancy serving the industry since 2013.',
  },
  '/careers': {
    title: 'Hospitality Careers & Hotel Jobs | AD Brothers',
    description: 'Join the AD Brothers hospitality talent network for hotel, restaurant, culinary, housekeeping, and management opportunities.',
  },
  '/contact': {
    title: 'Contact AD Brothers | Hotel Consultancy India',
    description: 'Contact AD Brothers in Pune for hotel operations, pre-opening, F&B, workforce, audit, and hospitality consulting requirements.',
  },
  '/gallery': {
    title: 'Hospitality Gallery | AD Brothers',
    description: 'View selected moments from AD Brothers hotel operations, project advisory, food and beverage, and hospitality workforce engagements.',
  },
  '/dashboard': {
    title: 'Gallery Dashboard | AD Brothers',
    description: 'Secure AD Brothers gallery administration.',
  },
};

export default function App() {
  const currentPath = () => withoutBase(window.location.pathname).replace(/\/$/, '') || '/';
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const onPopState = () => setPath(currentPath());
    const onRouteClick = (event) => {
      const link = event.target.closest('a[data-route]');
      if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      const nextPath = withoutBase(url.pathname).replace(/\/$/, '') || '/';
      window.history.pushState({}, '', withBase(nextPath));
      setPath(nextPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', onPopState);
    document.addEventListener('click', onRouteClick);
    return () => {
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('click', onRouteClick);
    };
  }, []);

  useEffect(() => {
    const pageMeta = metadata[path] || metadata['/'];
    document.title = pageMeta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', pageMeta.description);
    document.querySelector('meta[name="robots"]')?.setAttribute('content', path === '/dashboard' ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://sumitchaskar0007-coder.github.io/ad_brother${path === '/' ? '/' : path}`);
  }, [path]);

  const Page = routes[path] || HomePage;
  const isDashboard = path === '/dashboard';

  return (
    <div className="min-h-screen bg-cream text-ink">
      {!isDashboard && <Header currentPath={path} />}
      <main key={path} className="page-enter"><Page /></main>
      {!isDashboard && <Footer />}
      {!isDashboard && <a
        href="https://wa.me/919975978310?text=Hello%20AD%20Brothers%2C%20I%20would%20like%20to%20connect."
        target="_blank"
        rel="noreferrer"
        className="floating-chat"
        aria-label="Chat with AD Brothers on WhatsApp"
      >
        <span className="chat-pulse" />
        <span>Let’s talk</span>
      </a>}
    </div>
  );
}
