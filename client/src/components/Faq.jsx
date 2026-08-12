import { useState } from 'react';

const questions = [
  ['What hospitality roles can AD Brothers help us hire?', 'We support frontline, culinary, housekeeping, front office, food and beverage, support, and senior management roles for hotels, resorts, restaurants, clubs, cafés, and related businesses.'],
  ['Do you provide recruitment outside Pune?', 'Yes. AD Brothers is based in Pune and supports hospitality manpower requirements across India, depending on the role and project scope.'],
  ['Can you help staff a new hotel or restaurant?', 'Yes. We can discuss phased and pre-opening recruitment for individual departments or complete operational teams.'],
  ['How can candidates apply?', 'Candidates can contact our team through WhatsApp or the enquiry form. Share your preferred department, experience, location, and contact details so the team can respond when a suitable requirement is available.'],
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section-space bg-brand-mist">
      <div className="site-container grid gap-12 lg:grid-cols-[.68fr_1.32fr]">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" /> Common questions</div>
          <h2 className="section-title mt-5">Good hiring starts with clarity.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">Need something more specific? Speak directly with our Pune team.</p>
          <a href="tel:+919975978310" className="mt-7 inline-flex text-lg font-bold text-brand-navy hover:text-brand-blue">+91 99759 78310 →</a>
        </div>
        <div className="space-y-3">
          {questions.map(([question, answer], index) => (
            <div key={question} className="faq-item">
              <button type="button" onClick={() => setOpen(open === index ? -1 : index)} className="faq-question" aria-expanded={open === index}>
                <span>{question}</span>
                <span className={`faq-plus ${open === index ? 'rotate-45' : ''}`}>+</span>
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
