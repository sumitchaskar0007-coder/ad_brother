import { useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../lib/api';
import { withBase } from '../lib/paths';

const sampleItems = [
  { _id: 'sample-1', title: 'Hotel operations advisory', category: 'Hotel Operations', description: 'On-property review focused on service consistency, operating systems, and management rhythm.', imageUrl: withBase('/images/hotel-management.jpg'), altText: 'Hospitality management team at a hotel', featured: true },
  { _id: 'sample-2', title: 'Hospitality workforce planning', category: 'People & Culture', description: 'Practical team structures and role planning shaped around the needs of each operation.', imageUrl: withBase('/images/ad-staff.jpg'), altText: 'AD Brothers hospitality team', featured: false },
  { _id: 'sample-3', title: 'Commercial kitchen consulting', category: 'Food & Beverage', description: 'Kitchen workflow, equipment, menu, cost, and operating guidance for stronger F&B performance.', imageUrl: withBase('/images/kitchen-equipment.jpg'), altText: 'Professional commercial kitchen equipment', featured: false },
  { _id: 'sample-4', title: 'Pre-opening readiness', category: 'Project Advisory', description: 'Opening plans, SOPs, recruitment coordination, and readiness reviews before welcoming guests.', imageUrl: withBase('/images/about-hospitality.png'), altText: 'Hospitality project planning', featured: false },
];

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let active = true;
    apiRequest('/api/gallery')
      .then(({ items: galleryItems }) => {
        if (active) setItems(galleryItems);
      })
      .catch(() => {
        if (active) {
          setItems(sampleItems);
          setOffline(true);
        }
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!selected) return undefined;
    const close = (event) => event.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [selected]);

  const categories = useMemo(() => ['All', ...new Set(items.map((item) => item.category))], [items]);
  const visibleItems = activeCategory === 'All' ? items : items.filter((item) => item.category === activeCategory);

  return (
    <>
      <section className="gallery-hero">
        <div className="shell gallery-hero-grid">
          <div>
            <p className="page-number">06 / GALLERY</p>
            <p className="kicker">Work in hospitality</p>
            <h1>Experience behind<br /><em>every engagement.</em></h1>
          </div>
          <p>Selected moments from hotel operations, project advisory, food and beverage consulting, and hospitality workforce engagements.</p>
        </div>
      </section>

      <section className="gallery-section">
        <div className="shell">
          <div className="gallery-toolbar">
            <p>{loading ? 'Loading gallery…' : `${visibleItems.length} ${visibleItems.length === 1 ? 'entry' : 'entries'}`}</p>
            <div className="gallery-filters" aria-label="Filter gallery by category">
              {categories.map((category) => (
                <button key={category} type="button" className={activeCategory === category ? 'is-active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>
              ))}
            </div>
          </div>

          {!loading && visibleItems.length === 0 && (
            <div className="gallery-empty"><span>Gallery</span><h2>New work will be added here soon.</h2></div>
          )}

          <div className="gallery-grid">
            {visibleItems.map((item, index) => (
              <button type="button" className={`gallery-card ${item.featured ? 'is-featured' : ''}`} key={item._id} onClick={() => setSelected(item)}>
                <span className="gallery-image"><img src={item.imageUrl} alt={item.altText || item.title} loading={index > 2 ? 'lazy' : 'eager'} /></span>
                <span className="gallery-card-copy"><small>{item.category}</small><strong>{item.title}</strong><b>View ↗</b></span>
              </button>
            ))}
          </div>

          {offline && <p className="gallery-sync-note">Showing the introductory gallery. Connected dashboard entries will appear here once the gallery service is online.</p>}
        </div>
      </section>

      {selected && (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={selected.title} onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
          <div className="gallery-modal-card">
            <button type="button" className="gallery-modal-close" onClick={() => setSelected(null)} aria-label="Close image">×</button>
            <img src={selected.imageUrl} alt={selected.altText || selected.title} />
            <div><p>{selected.category}</p><h2>{selected.title}</h2>{selected.description && <span>{selected.description}</span>}</div>
          </div>
        </div>
      )}
    </>
  );
}
