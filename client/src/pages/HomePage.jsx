import { useState } from 'react';
import { withBase } from '../lib/paths';

const segments = {
  'Hotels & Resorts': {
    number: '01',
    copy: 'From front office and housekeeping to F&B leadership and general management.',
    roles: ['Front office', 'Housekeeping', 'Food & beverage', 'Hotel leadership'],
  },
  'Restaurants & Cafés': {
    number: '02',
    copy: 'Guest-facing, kitchen, delivery, and outlet management talent for growing food businesses.',
    roles: ['Outlet managers', 'Service teams', 'Baristas', 'Kitchen crew'],
  },
  'Kitchens & Catering': {
    number: '03',
    copy: 'Culinary specialists and operations teams for commercial kitchens and catering projects.',
    roles: ['Executive chefs', 'Speciality cooks', 'Stewards', 'Stores & purchase'],
  },
};

export default function HomePage() {
  const [active, setActive] = useState('Hotels & Resorts');
  const current = segments[active];

  return (
    <>
      <section className="home-hero">
        <div className="hero-index">01 / AD BROTHERS</div>
        <div className="shell home-hero-grid">
          <div className="hero-copy">
            <p className="kicker">Hospitality people, placed with purpose</p>
            <h1>Your next great hire is closer than you think.</h1>
            <p className="hero-lead">Specialist recruitment and manpower support for the businesses that make people feel welcome.</p>
            <div className="hero-actions">
              <a href={withBase('/contact')} data-route className="text-link">Hire your next team member <span>↗</span></a>
              <a href={withBase('/careers')} data-route className="text-link text-link-muted">Explore hospitality careers <span>→</span></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo"><img src={withBase('/images/ad-staff.jpg')} alt="Hospitality professionals connected by AD Brothers" /></div>
            <div className="hero-stamp"><strong>13</strong><span>years close to<br />hospitality</span></div>
            <div className="hero-note"><span>Based in Pune</span><strong>Working across India</strong></div>
          </div>
        </div>
        <div className="hero-scroll">Scroll to discover <span>↓</span></div>
      </section>

      <section className="statement-section">
        <div className="shell statement-grid">
          <p className="section-index">01 — OUR POINT OF VIEW</p>
          <div>
            <h2 className="display-title">Hospitality is personal.<br /><em>Hiring should be too.</em></h2>
            <p className="statement-copy">We go beyond job titles and CVs. We learn how your operation works, what your guests expect, and which kind of person will genuinely strengthen your team.</p>
          </div>
        </div>
      </section>

      <section className="segment-section">
        <div className="shell">
          <div className="segment-head">
            <div><p className="kicker">Where we work</p><h2>Built around hospitality.</h2></div>
            <a href={withBase('/services')} data-route className="circle-link">View all<br />services <span>↗</span></a>
          </div>
          <div className="segment-explorer">
            <div className="segment-tabs" role="tablist">
              {Object.keys(segments).map((segment) => (
                <button key={segment} type="button" role="tab" aria-selected={active === segment} onClick={() => setActive(segment)} className={active === segment ? 'is-active' : ''}>
                  <span>{segments[segment].number}</span>{segment}<b>↗</b>
                </button>
              ))}
            </div>
            <div className="segment-panel" role="tabpanel">
              <span className="segment-big-number">{current.number}</span>
              <p>{current.copy}</p>
              <div>{current.roles.map((role) => <span key={role}>{role}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-services">
        <div className="shell">
          <div className="section-heading-row">
            <p className="section-index">02 — WHAT WE DO</p>
            <h2 className="display-title">One partner.<br /><em>Every people need.</em></h2>
          </div>
          <div className="feature-grid">
            {[
              ['01', 'Recruitment', 'Focused search and selection for operational, specialist, and leadership roles.'],
              ['02', 'Manpower', 'Reliable teams for ongoing needs, seasonal demand, and hospitality projects.'],
              ['03', 'Consulting', 'Practical guidance for workforce planning, pre-opening, and operations.'],
            ].map(([number, title, copy]) => (
              <a href={withBase('/services')} data-route className="feature-card" key={title}>
                <span>{number}</span><h3>{title}</h3><p>{copy}</p><b>Discover more ↗</b>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="human-section">
        <div className="human-photo"><img src={withBase('/images/hospitality-team.jpg')} alt="Hospitality recruitment consultation" /></div>
        <div className="human-content">
          <p className="kicker kicker-light">A human business</p>
          <h2>We listen first.<br />Then we search.</h2>
          <p>Every assignment begins with a real conversation. That is how we understand the detail behind the requirement—and how we find people who feel right, not just look right on paper.</p>
          <a href={withBase('/about')} data-route className="text-link text-link-light">Meet AD Brothers <span>↗</span></a>
        </div>
      </section>

      <section className="home-cta">
        <div className="shell home-cta-inner">
          <p className="kicker">Your next move</p>
          <h2>Hiring—or looking?</h2>
          <div className="cta-choice-grid">
            <a href={withBase('/contact')} data-route><span>For businesses</span><strong>I need hospitality talent</strong><b>↗</b></a>
            <a href={withBase('/careers')} data-route><span>For candidates</span><strong>I’m ready for my next role</strong><b>↗</b></a>
          </div>
        </div>
      </section>
    </>
  );
}
