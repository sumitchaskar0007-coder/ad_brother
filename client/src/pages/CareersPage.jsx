import { useMemo, useState } from 'react';
import { withBase } from '../lib/paths';

const roles = [
  ['Front Office Manager', 'Front Office'], ['Receptionist', 'Front Office'], ['Guest Relations Executive', 'Front Office'],
  ['Restaurant Manager', 'Food & Beverage'], ['Captain', 'Food & Beverage'], ['Waiter / Steward', 'Food & Beverage'], ['Bartender', 'Food & Beverage'],
  ['Executive Chef', 'Culinary'], ['Sous Chef', 'Culinary'], ['Indian Cook', 'Culinary'], ['Chinese Cook', 'Culinary'], ['Tandoor Cook', 'Culinary'], ['Bakery & Pastry', 'Culinary'],
  ['General Manager', 'Leadership'], ['Housekeeping Manager', 'Operations'], ['Purchase & Stores', 'Operations'], ['Accounts', 'Operations'], ['Maintenance', 'Operations'],
];
const categories = ['All', 'Front Office', 'Food & Beverage', 'Culinary', 'Operations', 'Leadership'];

export default function CareersPage() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const visible = useMemo(() => roles.filter(([role, group]) => (category === 'All' || group === category) && role.toLowerCase().includes(query.toLowerCase())), [category, query]);

  return (
    <>
      <section className="careers-hero">
        <div className="shell careers-hero-grid">
          <div><p className="page-number">04 / CAREERS</p><p className="kicker">For hospitality professionals</p><h1>Your experience deserves the right stage.</h1><p>Join our talent network and help us understand where you have been—and where you want to go next.</p><a href="#talent-network" className="text-link">Explore role families <span>↓</span></a></div>
          <div className="careers-photo"><img src={withBase('/images/ad-staff.jpg')} alt="Hospitality professionals in a hotel kitchen" /><span>People power every<br />guest experience.</span></div>
        </div>
      </section>

      <section id="talent-network" className="role-directory">
        <div className="shell">
          <div className="directory-head"><div><p className="kicker">Talent network</p><h2>Where do you belong?</h2></div><label className="role-search"><span>Search</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try ‘Chef’ or ‘Manager’" /></label></div>
          <div className="category-chips" role="tablist">{categories.map((item) => <button type="button" key={item} role="tab" aria-selected={category === item} className={category === item ? 'is-active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <div className="role-list" aria-live="polite">
            {visible.map(([role, group], index) => <div key={`${role}-${group}`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{role}</strong><small>{group}</small><b>↗</b></div>)}
            {!visible.length && <p className="no-roles">No matching role family. Try another search.</p>}
          </div>
          <p className="directory-note">This is a talent directory, not a live vacancy list. Our team will contact you when a suitable client requirement matches your profile.</p>
        </div>
      </section>

      <section className="candidate-steps">
        <div className="shell">
          <div className="section-heading-row"><p className="section-index">YOUR NEXT STEP</p><h2 className="display-title">Make a clear<br /><em>first impression.</em></h2></div>
          <div className="candidate-step-grid">
            {[
              ['01', 'Introduce yourself', 'Tell us your department, role, location, and years of hospitality experience.'],
              ['02', 'Share your profile', 'Keep your CV current and include the practical skills relevant to your target role.'],
              ['03', 'Stay reachable', 'When a suitable requirement appears, fast and clear communication makes a difference.'],
            ].map(([num, title, copy]) => <article key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
          <a href="https://wa.me/919975978310?text=Hello%20AD%20Brothers%2C%20I%20would%20like%20to%20join%20your%20hospitality%20talent%20network." target="_blank" rel="noreferrer" className="candidate-apply">Join the talent network <span>↗</span></a>
        </div>
      </section>
    </>
  );
}
