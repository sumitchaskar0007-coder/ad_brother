const accentClasses = {
  blue: 'service-accent-blue',
  green: 'service-accent-green',
  pink: 'service-accent-pink',
  orange: 'service-accent-orange',
};

export default function Services({ services }) {
  return (
    <section id="services" className="section-space bg-brand-mist">
      <div className="site-container">
        <div className="grid gap-7 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" /> What we do</div>
            <h2 className="section-title mt-5">Your complete hospitality workforce partner.</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-600 lg:justify-self-end lg:text-lg">
            Whether you need one specialist or a complete opening team, we understand the roles, urgency, and service standards that make hospitality businesses work.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="service-card group">
              <div className={`service-number ${accentClasses[service.accent]}`}>{service.number}</div>
              <h3 className="mt-8 text-xl font-bold text-brand-navy">{service.title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{service.description}</p>
              <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-navy">
                Discuss your requirement <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
