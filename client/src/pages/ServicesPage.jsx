import { useState } from 'react';
import { withBase } from '../lib/paths';

const services = [
  { id: 'operations', number: '01', title: 'Hotel Operations Consulting', intro: 'Turn operational gaps into a clear improvement plan.', detail: 'We review how departments work together, how service standards are delivered, and how management information supports decisions. Recommendations are practical, prioritised, and suited to the property.', items: ['Operational review', 'Department workflows', 'Service standards', 'Management reporting'] },
  { id: 'preopening', number: '02', title: 'Pre-opening & Launch', intro: 'Prepare the operation before the first guest arrives.', detail: 'From organisation structure to opening checklists, we help owners and leadership teams sequence the work required for a controlled, confident hotel or restaurant launch.', items: ['Opening roadmap', 'SOP framework', 'Manpower plan', 'Readiness review'] },
  { id: 'commercial', number: '03', title: 'Commercial Performance', intro: 'Improve control without compromising the guest experience.', detail: 'We help management teams examine operating costs, productivity, purchasing, revenue opportunities, and reporting routines to support healthier performance.', items: ['Cost review', 'Productivity analysis', 'Revenue opportunities', 'Control systems'] },
  { id: 'fnb', number: '04', title: 'F&B & Kitchen Consulting', intro: 'Build efficient food operations from menu to service.', detail: 'Consulting for restaurants, cafés, banquet operations, clubs, catering businesses, and commercial kitchens, with attention to workflow, consistency, controls, and team capability.', items: ['Menu engineering', 'Kitchen planning', 'Service workflow', 'Food cost controls'] },
  { id: 'workforce', number: '05', title: 'Workforce & HR Advisory', intro: 'Align the organisation around the operation you need.', detail: 'We define staffing levels, role responsibilities, leadership requirements, training priorities, and recruitment plans that support the business model.', items: ['Organisation structure', 'Role clarity', 'Recruitment strategy', 'Training priorities'] },
  { id: 'audit', number: '06', title: 'Hospitality Audit', intro: 'An independent view of what is working—and what is not.', detail: 'A focused operational assessment provides owners and managers with clear findings, priority risks, and a realistic action plan for the next stage of improvement.', items: ['Property assessment', 'Gap analysis', 'Priority actions', 'Follow-up review'] },
];

export default function ServicesPage() {
  const [activeId, setActiveId] = useState('operations');
  const active = services.find((service) => service.id === activeId);

  return (
    <>
      <section className="inner-hero services-hero">
        <div className="shell inner-hero-grid">
          <div><p className="page-number">02 / SERVICES</p><p className="kicker">Consultancy services</p><h1>Better systems for stronger hospitality businesses.</h1></div>
          <div className="inner-hero-copy"><p>From a new hotel project to an established operation, our work connects strategy with the practical detail of daily hospitality management.</p><a href={withBase('/contact')} data-route className="text-link">Discuss your project <span>↗</span></a></div>
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
            <a href={withBase('/contact')} data-route className="text-link text-link-light">Discuss this consultancy service <span>↗</span></a>
          </article>
        </div>
      </section>

      <section className="model-section">
        <div className="shell">
          <div className="section-heading-row"><p className="section-index">HOW WE CAN HELP</p><h2 className="display-title">Flexible by design.<br /><em>Focused by nature.</em></h2></div>
          <div className="model-grid">
            {[
              ['A focused review', 'Assess a specific department, control issue, workflow, or management priority.'],
              ['An improvement programme', 'Build a coordinated action plan across operations, people, standards, and performance.'],
              ['A complete hotel project', 'Support the journey from planning and pre-opening through launch and stabilisation.'],
            ].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="process-dark">
        <div className="shell">
          <p className="kicker kicker-light">Our consulting process</p><h2>Clear from assessment to action.</h2>
          <div className="process-row">
            {[
              ['01', 'Understand', 'Goals, property, challenges, and priorities.'],
              ['02', 'Assess', 'Operations, systems, standards, and people.'],
              ['03', 'Plan', 'Practical actions, owners, sequence, and measures.'],
              ['04', 'Support', 'Implementation guidance and progress review.'],
            ].map(([num, title, copy]) => <div key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
