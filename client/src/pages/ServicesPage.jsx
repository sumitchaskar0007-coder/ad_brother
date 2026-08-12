import { useState } from 'react';

const services = [
  { id: 'recruitment', number: '01', title: 'Hospitality Recruitment', intro: 'The right person for the role—and the operation.', detail: 'We source and screen talent across frontline, specialist, support, and leadership positions. Every search is shaped around your service style, location, timeline, and expectations.', items: ['Role scoping', 'Candidate sourcing', 'Initial screening', 'Interview coordination'] },
  { id: 'manpower', number: '02', title: 'Hotel Manpower', intro: 'Dependable teams when and where you need them.', detail: 'For ongoing operations, project needs, and workforce expansion, we help build capable teams across key hotel and food-service departments.', items: ['Operational staffing', 'Department hiring', 'Team expansion', 'Pan-India search'] },
  { id: 'leadership', number: '03', title: 'Management Search', intro: 'Leaders who raise standards and move businesses forward.', detail: 'Focused hiring for general managers, department heads, executive chefs, F&B leaders, and other experienced hospitality professionals.', items: ['Leadership mapping', 'Discreet search', 'Experience validation', 'Culture alignment'] },
  { id: 'preopening', number: '04', title: 'Pre-opening Teams', intro: 'Build the people plan before the doors open.', detail: 'We support new hotels, restaurants, cafés, clubs, and kitchens with phased hiring plans designed around launch schedules and operating structures.', items: ['Manpower planning', 'Phased recruitment', 'Opening teams', 'Department coordination'] },
  { id: 'consulting', number: '05', title: 'Operations Consulting', intro: 'Practical hospitality thinking, applied to your operation.', detail: 'Our consulting conversations focus on team structure, service delivery, process clarity, and the people decisions behind better daily operations.', items: ['Workforce structure', 'Service workflows', 'Role clarity', 'Operational support'] },
];

export default function ServicesPage() {
  const [activeId, setActiveId] = useState('recruitment');
  const active = services.find((service) => service.id === activeId);

  return (
    <>
      <section className="inner-hero services-hero">
        <div className="shell inner-hero-grid">
          <div><p className="page-number">02 / SERVICES</p><p className="kicker">What we do</p><h1>People solutions for a people-first industry.</h1></div>
          <div className="inner-hero-copy"><p>From one critical hire to a complete operational team, our work is designed around the reality of hospitality.</p><a href="/contact" data-route className="text-link">Share a requirement <span>↗</span></a></div>
        </div>
      </section>

      <section className="service-explorer-section">
        <div className="shell service-explorer-grid">
          <div className="service-selector" role="tablist">
            {services.map((service) => (
              <button key={service.id} type="button" role="tab" aria-selected={activeId === service.id} onClick={() => setActiveId(service.id)} className={activeId === service.id ? 'is-active' : ''}>
                <span>{service.number}</span><strong>{service.title}</strong><b>↗</b>
              </button>
            ))}
          </div>
          <article className="service-detail" key={active.id}>
            <span className="service-watermark">{active.number}</span>
            <p className="kicker kicker-light">Selected service</p>
            <h2>{active.intro}</h2>
            <p>{active.detail}</p>
            <ul>{active.items.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
            <a href="/contact" data-route className="text-link text-link-light">Discuss this service <span>↗</span></a>
          </article>
        </div>
      </section>

      <section className="model-section">
        <div className="shell">
          <div className="section-heading-row"><p className="section-index">HOW WE CAN HELP</p><h2 className="display-title">Flexible by design.<br /><em>Focused by nature.</em></h2></div>
          <div className="model-grid">
            {[
              ['A single hire', 'A targeted search for a specific operational, specialist, or leadership position.'],
              ['A growing department', 'Multiple hires for a team expansion, new outlet, or changing operation.'],
              ['A complete opening team', 'Planned recruitment across functions, aligned to your pre-opening timeline.'],
            ].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="process-dark">
        <div className="shell">
          <p className="kicker kicker-light">How it moves</p><h2>Clear from brief to joining.</h2>
          <div className="process-row">
            {[
              ['01', 'Discover', 'Business, role, culture, timeline.'],
              ['02', 'Search', 'Focused hospitality networks.'],
              ['03', 'Assess', 'Experience, fit, availability.'],
              ['04', 'Connect', 'Shortlist and coordination.'],
            ].map(([num, title, copy]) => <div key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
