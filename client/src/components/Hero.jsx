export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <div className="site-container relative z-10 grid min-h-[720px] items-center gap-14 py-16 lg:grid-cols-[1.04fr_.96fr] lg:py-20">
        <div className="max-w-2xl">
          <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> Hospitality talent, thoughtfully matched</div>
          <h1 className="mt-7 text-5xl font-extrabold leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.7rem]">
            The right people.<br />
            <span className="text-brand-sky">A better guest experience.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
            AD Brothers connects hotels, resorts, restaurants, and hospitality businesses with dependable people—from frontline teams to senior management.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#contact" className="button button-primary">Hire hospitality talent <span aria-hidden="true">↗</span></a>
            <a href="#candidates" className="button button-ghost">I’m looking for a job <span aria-hidden="true">↓</span></a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/75">
            <span className="check-item">Role-focused screening</span>
            <span className="check-item">Pan-India support</span>
            <span className="check-item">Hospitality specialists</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[590px] lg:mx-0">
          <div className="hero-image-wrap">
            <img src="/images/ad-staff.jpg" alt="Hospitality professionals working with AD Brothers" className="h-full w-full object-cover" />
            <div className="hero-image-shade" />
          </div>
          <div className="hero-experience-card">
            <strong>Since 2013</strong>
            <span>Hospitality-focused hiring expertise</span>
          </div>
          <a href="tel:+919975978310" className="hero-call-card">
            <span className="hero-call-icon">↗</span>
            <span><small>Speak with our team</small><strong>+91 99759 78310</strong></span>
          </a>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-white/[0.045]">
        <div className="site-container grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
          {[
            ['2013', 'Serving since'],
            ['Pan India', 'Recruitment reach'],
            ['360°', 'Hiring support'],
            ['Hospitality', 'Our core expertise'],
          ].map(([value, label]) => (
            <div key={label} className="px-4 py-6 text-center sm:px-8">
              <p className="text-lg font-bold text-white sm:text-xl">{value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
