import { useState } from 'react';

const initialForm = { name: '', email: '', phone: '', company: '', requirement: 'Hire staff', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');

  const handleChange = ({ target: { name, value } }) => setForm((current) => ({ ...current, [name]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const details = [
      'Hello AD Brothers, I would like to make an enquiry.',
      '',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Company: ${form.company || 'Not provided'}`,
      `Requirement: ${form.requirement}`,
      `Details: ${form.message}`,
    ].join('\n');
    window.open(`https://wa.me/919975978310?text=${encodeURIComponent(details)}`, '_blank', 'noopener,noreferrer');
    setStatus('success');
    setForm(initialForm);
  };

  return (
    <section id="contact" className="section-space bg-white">
      <div className="site-container">
        <div className="contact-shell">
          <div className="contact-content">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> Let’s talk</div>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-[-0.035em] text-white sm:text-5xl">Build the hospitality team your business deserves.</h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-300">Tell us what you need. Our team will get in touch to understand your hiring or consulting requirement.</p>
            <div className="mt-10 space-y-5 text-sm">
              <a href="tel:+919975978310" className="contact-detail"><span>Call</span><strong>+91 99759 78310</strong></a>
              <a href="mailto:info@adbrothers.in" className="contact-detail"><span>Email</span><strong>info@adbrothers.in</strong></a>
              <div className="contact-detail items-start"><span>Visit</span><strong>Shop No. 203, Khedekar Corner Building,<br />Narhe Dhayari Road, Pune 411041</strong></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="field-label">Your name *<input required name="name" value={form.name} onChange={handleChange} placeholder="Full name" /></label>
              <label className="field-label">Phone number *<input required name="phone" value={form.phone} onChange={handleChange} inputMode="tel" placeholder="+91" /></label>
              <label className="field-label">Email address *<input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" /></label>
              <label className="field-label">Company<input name="company" value={form.company} onChange={handleChange} placeholder="Business name" /></label>
            </div>
            <label className="field-label mt-5">I would like to
              <select name="requirement" value={form.requirement} onChange={handleChange}>
                <option>Hire staff</option>
                <option>Discuss hotel consulting</option>
                <option>Apply for a job</option>
                <option>Ask a general question</option>
              </select>
            </label>
            <label className="field-label mt-5">Tell us more *
              <textarea required name="message" rows="4" value={form.message} onChange={handleChange} placeholder="Role, location, timeline, or experience..." />
            </label>
            <button type="submit" className="button button-primary mt-6 w-full">
              Send enquiry on WhatsApp <span aria-hidden="true">↗</span>
            </button>
            <div className="mt-4 min-h-6" aria-live="polite">
              {status === 'success' && <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">Your enquiry is ready in WhatsApp. Tap send there to share it with our team.</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
