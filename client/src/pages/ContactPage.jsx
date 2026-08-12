import { useState } from 'react';

const initial = { name: '', phone: '', email: '', company: '', subject: 'Hotel operations consultancy', message: '' };

export default function ContactPage() {
  const [mode, setMode] = useState('employer');
  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);
  const update = ({ target: { name, value } }) => setForm((current) => ({ ...current, [name]: value }));
  const switchMode = (nextMode) => {
    setMode(nextMode);
    setSent(false);
    setForm((current) => ({
      ...current,
      subject: nextMode === 'employer' ? 'Hotel operations consultancy' : 'Join talent network',
    }));
  };
  const submit = (event) => {
    event.preventDefault();
    const text = [
      `Hello AD Brothers, I am contacting you as ${mode === 'employer' ? 'an employer' : 'a hospitality candidate'}.`, '',
      `Name: ${form.name}`, `Phone: ${form.phone}`, `Email: ${form.email}`,
      `Company: ${form.company || 'Not provided'}`, `Subject: ${form.subject}`, `Message: ${form.message}`,
    ].join('\n');
    window.open(`https://wa.me/919975978310?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSent(true); setForm(initial);
  };

  return (
    <>
      <section className="contact-hero">
        <div className="shell contact-hero-grid">
          <div><p className="page-number">05 / CONTACT</p><p className="kicker">Talk to AD Brothers</p><h1>Let’s improve your hospitality business.</h1></div>
          <div className="contact-intro"><p>Planning a hotel, improving an operation, reviewing F&amp;B performance, or strengthening your management team? Start with a conversation.</p><a href="tel:+919975978310">+91 99759 78310 <span>↗</span></a></div>
        </div>
      </section>

      <section className="contact-main">
        <div className="shell contact-main-grid">
          <div className="contact-sidebar">
            <p className="kicker kicker-light">Choose your path</p>
            <button type="button" className={mode === 'employer' ? 'is-active' : ''} onClick={() => switchMode('employer')}><span>01</span><strong>I need consultancy</strong><b>↗</b></button>
            <button type="button" className={mode === 'candidate' ? 'is-active' : ''} onClick={() => switchMode('candidate')}><span>02</span><strong>I’m looking for work</strong><b>↗</b></button>
            <div className="contact-address"><span>Visit us</span><p>Shop No. 203, Khedekar Corner Building,<br />Narhe Dhayari Road, Narhe,<br />Pune 411041, Maharashtra</p><a href="https://maps.google.com/?q=Narhe+Dhayari+Road+Pune+411041" target="_blank" rel="noreferrer">Open in Maps ↗</a></div>
          </div>

          <form onSubmit={submit} className="editorial-form">
            <div className="form-intro"><span>{mode === 'employer' ? 'Consultancy enquiry' : 'Candidate introduction'}</span><h2>{mode === 'employer' ? 'Tell us about your property and priorities.' : 'Tell us about the work you do best.'}</h2></div>
            <div className="form-grid">
              <label><span>Name *</span><input required name="name" value={form.name} onChange={update} placeholder="Your full name" /></label>
              <label><span>Phone *</span><input required name="phone" value={form.phone} onChange={update} placeholder="+91" inputMode="tel" /></label>
              <label><span>Email *</span><input required type="email" name="email" value={form.email} onChange={update} placeholder="you@email.com" /></label>
              <label><span>{mode === 'employer' ? 'Company' : 'Current employer'}</span><input name="company" value={form.company} onChange={update} placeholder="Optional" /></label>
              <label className="full"><span>Subject</span><select name="subject" value={form.subject} onChange={update}>{mode === 'employer' ? <><option>Hotel operations consultancy</option><option>Pre-opening &amp; launch support</option><option>F&amp;B or kitchen consulting</option><option>Hospitality audit</option><option>Workforce &amp; recruitment advisory</option></> : <><option>Join talent network</option><option>Management role</option><option>Culinary role</option><option>Operational role</option></>}</select></label>
              <label className="full"><span>Message *</span><textarea required rows="5" name="message" value={form.message} onChange={update} placeholder={mode === 'employer' ? 'Property type, location, stage, current challenge, and support required…' : 'Your department, experience, preferred location, and target role…'} /></label>
            </div>
            <button type="submit" className="form-submit">Continue on WhatsApp <span>↗</span></button>
            {sent && <p className="form-success" aria-live="polite">Your message is ready in WhatsApp. Tap send there to share it with our team.</p>}
          </form>
        </div>
      </section>

      <section className="direct-contact"><div className="shell"><p>Prefer direct contact?</p><div><a href="mailto:info@adbrothers.in">info@adbrothers.in <span>↗</span></a><a href="tel:+919975978310">+91 99759 78310 <span>↗</span></a></div></div></section>
    </>
  );
}
