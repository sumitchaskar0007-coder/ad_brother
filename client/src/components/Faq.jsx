import { useState } from 'react';

const questions = [
  ['What does your hotel management consultancy cover?', 'We support operations reviews, pre-opening planning, SOP development, organisation structure, cost controls, service standards, workforce planning, F&B systems, and management improvement.'],
  ['Can you support a new hotel before opening?', 'Yes. We can help shape the opening roadmap, department structure, manpower plan, SOPs, operating checklists, recruitment phases, and launch-readiness priorities.'],
  ['Do you work with independent hotels and restaurants?', 'Yes. Our approach is suitable for independent hotels, resorts, restaurants, cafés, clubs, catering businesses, and commercial kitchens that need practical management support.'],
  ['Can consultancy include recruitment and training?', 'Yes. Recruitment, leadership search, workforce planning, role clarity, and training priorities can be included when they support the wider operational objective.'],
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq-section">
      <div className="shell faq-grid">
        <div className="faq-intro">
          <p className="kicker">Consultancy questions</p>
          <h2>Clear answers before the work begins.</h2>
          <p>Every hotel or hospitality business is different. We define the scope around your property, stage, priorities, and management needs.</p>
          <a href="tel:+919975978310">Speak with our Pune team <span>→</span></a>
        </div>
        <div className="faq-list">
          {questions.map(([question, answer], index) => (
            <div key={question} className="faq-item">
              <button type="button" onClick={() => setOpen(open === index ? -1 : index)} className="faq-question" aria-expanded={open === index}>
                <span>{question}</span>
                <span className={`faq-plus ${open === index ? 'is-open' : ''}`}>+</span>
              </button>
              <div className={`faq-answer ${open === index ? 'faq-answer-open' : ''}`}>
                <p>{answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
