import { useState } from 'react';

const groups = {
  'Front of house': ['Front Office Manager', 'Receptionist', 'Guest Relations', 'Bell Desk', 'Reservations'],
  'Food & beverage': ['F&B Manager', 'Restaurant Manager', 'Captain', 'Waiter / Steward', 'Bartender'],
  Culinary: ['Executive Chef', 'Sous Chef', 'Indian / Chinese Cook', 'Tandoor Cook', 'Bakery & Pastry'],
  Operations: ['General Manager', 'Housekeeping', 'Purchase & Stores', 'Accounts', 'Maintenance'],
};

export default function Talent() {
  const [activeGroup, setActiveGroup] = useState('Front of house');

  return (
    <section id="candidates" className="section-space overflow-hidden bg-brand-navy text-white">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> Roles we recruit</div>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-[-0.035em] sm:text-5xl">Talent for every part of the guest journey.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">Explore some of the roles we regularly support. Employers can share an opening; candidates can introduce themselves for suitable opportunities.</p>
            <div className="mt-8 flex flex-wrap gap-3" role="tablist" aria-label="Hospitality job categories">
              {Object.keys(groups).map((group) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeGroup === group}
                  key={group}
                  onClick={() => setActiveGroup(group)}
                  className={`talent-tab ${activeGroup === group ? 'talent-tab-active' : ''}`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>

          <div className="talent-panel" role="tabpanel">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-sky">Current category</p>
                <h3 className="mt-2 text-2xl font-bold">{activeGroup}</h3>
              </div>
              <span className="text-4xl font-light text-white/20">↗</span>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {groups[activeGroup].map((role) => (
                <li key={role} className="talent-role"><span>✓</span>{role}</li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
              <a href="#contact" className="button button-primary flex-1">I need to hire</a>
              <a href="https://wa.me/919975978310?text=Hello%20AD%20Brothers%2C%20I%20am%20looking%20for%20a%20hospitality%20job." target="_blank" rel="noreferrer" className="button button-ghost flex-1">I’m a candidate</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
