import { useState } from 'react';

const nav = [
  ['Home', '/'],
  ['Services', '/services'],
  ['About', '/about'],
  ['Careers', '/careers'],
  ['Contact', '/contact'],
];

export default function Header({ currentPath }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-shell">
        <a href="/" data-route className="logo-link" onClick={() => setOpen(false)} aria-label="AD Brothers home">
          <img src="/images/ad-brothers-logo.png" alt="AD Brothers" />
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([label, href]) => (
            <a key={href} href={href} data-route className={currentPath === href ? 'is-active' : ''}>{label}</a>
          ))}
        </nav>

        <div className="header-action">
          <a href="tel:+919975978310" className="header-phone"><span>Call our team</span><strong>+91 99759 78310</strong></a>
          <a href="/contact" data-route className="round-arrow" aria-label="Start an enquiry">↗</a>
        </div>

        <button type="button" className={`nav-toggle ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          <span /><span />
        </button>
      </div>

      <div className={`mobile-drawer ${open ? 'is-open' : ''}`}>
        <nav aria-label="Mobile navigation">
          {nav.map(([label, href], index) => (
            <a key={href} href={href} data-route onClick={() => setOpen(false)} className={currentPath === href ? 'is-active' : ''}>
              <span>0{index + 1}</span>{label}<b>↗</b>
            </a>
          ))}
        </nav>
        <div className="mobile-contact">
          <a href="tel:+919975978310">+91 99759 78310</a>
          <p>Narhe, Pune · Serving across India</p>
        </div>
      </div>
    </header>
  );
}
