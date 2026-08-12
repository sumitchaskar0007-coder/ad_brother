import { useState } from 'react';
import { withBase } from '../lib/paths';
import Faq from '../components/Faq';

const segments = {
  'New Hotel Projects': {
    number: '01',
    copy: 'Practical support from concept and feasibility through pre-opening planning, team structure, and launch readiness.',
    roles: ['Concept planning', 'Pre-opening roadmap', 'SOP development', 'Launch support'],
  },
  'Operating Hotels': {
    number: '02',
    copy: 'Independent reviews and hands-on guidance to improve service standards, operating discipline, and commercial performance.',
    roles: ['Operations audit', 'Cost controls', 'Service standards', 'Performance review'],
  },
  'F&B Businesses': {
    number: '03',
    copy: 'Management consulting for restaurants, cafés, clubs, catering operations, and commercial kitchens.',
    roles: ['Menu engineering', 'Kitchen systems', 'Outlet operations', 'Team planning'],
  },
};

export default function HomePage() {
  const [active, setActive] = useState('New Hotel Projects');
  const current = segments[active];

  return (
    <>
      <section className="home-hero">
        <div className="hero-index">01 / AD BROTHERS</div>
        <div className="shell home-hero-grid">
          <div className="hero-copy">
            <p className="kicker">Independent hospitality advisory</p>
            <h1>Hospitality assets deserve considered management.</h1>
            <p className="hero-lead">Discreet, practical advice for hotel owners, developers, and operators navigating new projects, operational improvement, F&amp;B performance, and long-term value.</p>
            <div className="hero-actions">
              <a href={withBase('/contact')} data-route className="text-link">Request a private consultation <span>↗</span></a>
              <a href={withBase('/services')} data-route className="text-link text-link-muted">View the advisory mandate <span>→</span></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo"><img src={withBase('/images/hospitality-team.jpg')} alt="Independent hospitality management advisor" /></div>
            <div className="hero-stamp"><strong>13+</strong><span>years of hospitality<br />industry focus</span></div>
            <div className="hero-note"><span>Based in Pune</span><strong>Working across India</strong></div>
          </div>
        </div>
        <div className="shell hero-credentials" aria-label="Advisory approach">
          <span>Owner-aligned advice</span>
          <span>Confidential engagement</span>
          <span>Operational due diligence</span>
          <span>India-wide perspective</span>
        </div>
        <div className="hero-scroll">Scroll to discover <span>↓</span></div>
      </section>

      <section className="statement-section">
        <div className="shell statement-grid">
          <p className="section-index">01 — OUR POINT OF VIEW</p>
          <div>
            <h2 className="display-title">Clear systems. Strong teams.<br /><em>Better guest experiences.</em></h2>
            <p className="statement-copy">We work with owners and hospitality leaders to turn business goals into practical operating plans. The focus is simple: smoother daily operations, accountable teams, controlled costs, and consistent service.</p>
          </div>
        </div>
      </section>

      <section className="advisory-section">
        <div className="shell advisory-head">
          <div>
            <p className="section-index">02 — EXECUTIVE ADVISORY</p>
            <p className="kicker">For owners, developers &amp; operators</p>
          </div>
          <div>
            <h2>A considered view of the entire hospitality asset.</h2>
            <p>We connect commercial ambition with the details that shape performance: positioning, operating structure, leadership, controls, service delivery, and opening readiness.</p>
          </div>
        </div>
        <div className="shell advisory-grid">
          {[
            ['01', 'Asset Positioning', 'Clarify the concept, market relevance, guest promise, operating model, and management priorities.'],
            ['02', 'Operating Performance', 'Review standards, controls, productivity, reporting, and departmental accountability.'],
            ['03', 'Opening Governance', 'Create the milestones, decision framework, readiness checks, and ownership needed for launch.'],
            ['04', 'Leadership & Organisation', 'Shape the structure, roles, leadership capability, and workforce plan around the business.'],
          ].map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="segment-section">
        <div className="shell">
          <div className="segment-head">
            <div><p className="kicker">Where we add value</p><h2>Consultancy for every stage.</h2></div>
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
            <h2 className="display-title">Practical advice.<br /><em>Measurable improvement.</em></h2>
          </div>
          <div className="feature-grid">
            {[
              ['01', 'Hotel Operations Consulting', 'Review operating standards, departmental coordination, service delivery, controls, and management reporting.'],
              ['02', 'Pre-opening & Project Support', 'Build the opening roadmap, organisation structure, SOPs, budgets, and readiness plan before launch.'],
              ['03', 'Workforce & Management Advisory', 'Define roles, staffing levels, leadership needs, training priorities, and recruitment strategy.'],
            ].map(([number, title, copy]) => (
              <a href={withBase('/services')} data-route className="feature-card" key={title}>
                <span>{number}</span><h3>{title}</h3><p>{copy}</p><b>Discover more ↗</b>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="human-section">
        <div className="human-photo"><img src={withBase('/images/ad-staff.jpg')} alt="Hospitality leadership and operations team" /></div>
        <div className="human-content">
          <p className="kicker kicker-light">How we work</p>
          <h2>Advice grounded in daily hospitality operations.</h2>
          <p>Every engagement starts with observation and clear business questions. We assess what is happening on the floor, identify the operational gaps, and build practical recommendations your management team can apply.</p>
          <a href={withBase('/about')} data-route className="text-link text-link-light">Why work with AD Brothers <span>↗</span></a>
        </div>
      </section>

      <Faq />

      <section className="home-cta">
        <div className="shell home-cta-inner">
          <p className="kicker">Start a conversation</p>
          <h2>Planning a project—or improving an operation?</h2>
          <div className="cta-choice-grid">
            <a href={withBase('/contact')} data-route><span>For owners &amp; operators</span><strong>I need hospitality consultancy</strong><b>↗</b></a>
            <a href={withBase('/services')} data-route><span>Explore capabilities</span><strong>View all consulting services</strong><b>↗</b></a>
          </div>
        </div>
      </section>
    </>
  );
}
