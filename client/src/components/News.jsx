export default function News({ news }) {
  return (
    <section id="news" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">Our Latest News</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Featured updates from AD Brothers</h2>
          </div>
          <div className="flex gap-3">
            <button className="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-brand-red hover:text-brand-red">←</button>
            <button className="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-brand-red hover:text-brand-red">→</button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {news.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-brand-gray/90 shadow-sm">
              <div className="h-56 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80)' }} />
              <div className="space-y-4 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-brand-red">{item.date}</p>
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{item.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
