import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';

const routes = {
  '/': HomePage,
  '/services': ServicesPage,
  '/about': AboutPage,
  '/careers': CareersPage,
  '/contact': ContactPage,
};

const metadata = {
  '/': {
    title: 'AD Brothers | Hospitality Recruitment & Hotel Manpower India',
    description: 'Hospitality recruitment, hotel manpower, management hiring, and consulting support from Pune across India.',
  },
  '/services': {
    title: 'Hospitality Recruitment & Manpower Services | AD Brothers',
    description: 'Explore hotel staffing, management hiring, pre-opening recruitment, operations consulting, and kitchen workforce services.',
  },
  '/about': {
    title: 'About AD Brothers | Hospitality Recruitment Specialists',
    description: 'Learn about AD Brothers, a Pune-based hospitality recruitment and manpower consultancy serving the industry since 2013.',
  },
  '/careers': {
    title: 'Hospitality Careers & Hotel Jobs | AD Brothers',
    description: 'Join the AD Brothers hospitality talent network for hotel, restaurant, culinary, housekeeping, and management opportunities.',
  },
  '/contact': {
    title: 'Contact AD Brothers | Hire Hospitality Staff',
    description: 'Contact AD Brothers in Pune for hotel manpower, hospitality recruitment, management hiring, and consulting requirements.',
  },
};

export default function App() {
  const [path, setPath] = useState(window.location.pathname.replace(/\/$/, '') || '/');

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname.replace(/\/$/, '') || '/');
    const onRouteClick = (event) => {
      const link = event.target.closest('a[data-route]');
      if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      const nextPath = url.pathname.replace(/\/$/, '') || '/';
      window.history.pushState({}, '', nextPath);
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
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://www.adbrothers.in${path === '/' ? '/' : path}`);
  }, [path]);

  const Page = routes[path] || HomePage;

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header currentPath={path} />
      <main key={path} className="page-enter"><Page /></main>
      <Footer />
      <a
        href="https://wa.me/919975978310?text=Hello%20AD%20Brothers%2C%20I%20would%20like%20to%20connect."
        target="_blank"
        rel="noreferrer"
        className="floating-chat"
        aria-label="Chat with AD Brothers on WhatsApp"
      >
        <span className="chat-pulse" />
        <span>Let’s talk</span>
      </a>
    </div>
  );
}
