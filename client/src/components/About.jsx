import { withBase } from '../lib/paths';

export default function About() {
  return (
    <section id="about" className="section-space bg-white">
      <div className="site-container grid items-center gap-16 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
          <div className="about-image-main">
            <img src={withBase('/images/about-hospitality.png')} alt="AD Brothers hospitality recruitment team in Pune" className="h-full w-full object-cover object-top" />
          </div>
          <div className="about-image-secondary">
            <img src={withBase('/images/hotel-management.jpg')} alt="Hotel management consultation" className="h-full w-full object-cover" />
          </div>
          <div className="about-badge"><strong>13+</strong><span>Years of industry focus</span></div>
        </div>

        <div>
          <div className="eyebrow"><span className="eyebrow-dot" /> About AD Brothers</div>
          <h2 className="section-title mt-5">Hospitality experience meets recruitment discipline.</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Founded in Pune in 2013, AD Brothers specializes in identifying, evaluating, and placing talent across the hotel and hospitality industry. We understand that every role affects the guest experience—and every business needs a team that fits its standards and culture.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="value-card">
              <span className="value-mark bg-brand-green" />
              <h3>Industry understanding</h3>
              <p>Hospitality-first knowledge across operational and management roles.</p>
            </div>
            <div className="value-card">
              <span className="value-mark bg-brand-pink" />
              <h3>Personal attention</h3>
              <p>A practical, responsive process tailored to each requirement.</p>
            </div>
          </div>
          <a href="#process" className="button button-dark mt-9">See how we work <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
}
