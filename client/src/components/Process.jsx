const steps = [
  ['01', 'Understand', 'We clarify your business, role, timeline, budget, and team culture.'],
  ['02', 'Source', 'We search relevant hospitality talent through focused industry networks.'],
  ['03', 'Screen', 'Candidates are reviewed for experience, fit, availability, and expectations.'],
  ['04', 'Support', 'We coordinate introductions and stay responsive through selection.'],
];

export default function Process() {
  return (
    <section id="process" className="section-space bg-white">
      <div className="site-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow justify-center"><span className="eyebrow-dot" /> A simple hiring process</div>
          <h2 className="section-title mt-5">From requirement to right fit.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">A clear, hands-on approach designed to save your team time and keep every search moving.</p>
        </div>
        <div className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="process-line hidden lg:block" />
          {steps.map(([number, title, copy]) => (
            <article key={number} className="process-card">
              <div className="process-number">{number}</div>
              <h3 className="mt-7 text-xl font-bold text-brand-navy">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
