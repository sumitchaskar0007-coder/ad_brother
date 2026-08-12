import { withBase } from '../lib/paths';

const nav = [['Services', '/services'], ['About', '/about'], ['Gallery', '/gallery'], ['Careers', '/careers'], ['Contact', '/contact']];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <p className="kicker kicker-light">Start a conversation</p>
            <h2>Better hospitality begins<br />with better operations.</h2>
          </div>
          <a href={withBase('/contact')} data-route className="footer-cta">Discuss your project <span>↗</span></a>
        </div>
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={withBase('/images/ad-brothers-logo.png')} alt="AD Brothers" />
            <p>Hotel and hospitality management consultancy for stronger operations, capable teams, and consistent guest experiences.</p>
          </div>
          <div>
            <h3>Navigate</h3>
            {nav.map(([label, href]) => <a key={href} href={withBase(href)} data-route>{label}</a>)}
          </div>
          <div>
            <h3>Contact</h3>
            <a href="tel:+919975978310">+91 99759 78310</a>
            <a href="mailto:info@adbrothers.in">info@adbrothers.in</a>
            <p>Narhe, Pune 411041<br />Maharashtra, India</p>
          </div>
          <div>
            <h3>Focus</h3>
            <p>Hotel Operations</p>
            <p>Pre-opening Projects</p>
            <p>F&amp;B Consulting</p>
            <p>Workforce Advisory</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AD Brothers</p>
          <p>Since 2013 · Pune · India</p>
        </div>
      </div>
    </footer>
  );
}
