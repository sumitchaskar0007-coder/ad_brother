import { withBase } from '../lib/paths';

export default function AboutPage() {
  return (
    <>
      <section className="inner-hero about-hero">
        <div className="shell">
          <p className="page-number">03 / ABOUT</p>
          <div className="about-hero-title"><p className="kicker">Who we are</p><h1>Hospitality experience.<br /><em>Practical management advice.</em></h1></div>
          <div className="about-hero-image"><img src={withBase('/images/about-hospitality.png')} alt="AD Brothers hospitality management consultancy" /></div>
        </div>
      </section>

      <section className="story-section">
        <div className="shell story-grid">
          <div><p className="section-index">OUR STORY</p><span className="story-year">2013</span></div>
          <div><h2 className="display-title">A Pune beginning.<br /><em>An India-wide outlook.</em></h2><p>AD Brothers began with a focused idea: hospitality businesses deserve advisors who understand both management decisions and the daily work behind the guest experience.</p><p>Since 2013, we have stayed close to hotel operations, workforce realities, leadership requirements, and the practical systems that help hospitality businesses perform consistently.</p></div>
        </div>
      </section>

      <section className="beliefs-section">
        <div className="shell">
          <p className="kicker">What guides us</p>
          <div className="beliefs-grid">
            {[
              ['01', 'Understand before advising', 'We begin with the property, business model, leadership priorities, and operational reality.'],
              ['02', 'Practical over theoretical', 'Recommendations must work for the team, budget, market, and stage of the business.'],
              ['03', 'Clarity and accountability', 'Every plan needs clear priorities, responsible owners, sensible timelines, and measurable outcomes.'],
              ['04', 'Hospitality at heart', 'We stay close to the industry so our advice remains relevant, grounded, and guest focused.'],
            ].map(([num, title, copy]) => <article key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="photo-story">
        <div className="photo-story-main"><img src={withBase('/images/about-hospitality.png')} alt="AD Brothers team in Pune" /></div>
        <div className="photo-story-copy"><p className="kicker kicker-light">Close to the operation</p><h2>Independent thinking.<br />Hands-on support.</h2><p>Our consultancy approach combines management perspective with operational detail. Clients receive direct attention, honest observations, and recommendations designed for implementation—not a report that sits on a shelf.</p><a href={withBase('/contact')} data-route className="text-link text-link-light">Discuss your business <span>↗</span></a></div>
        <div className="photo-story-small"><img src={withBase('/images/hotel-management.jpg')} alt="Hospitality management meeting" /></div>
      </section>

      <section className="numbers-section">
        <div className="shell numbers-grid">
          <div><strong>13+</strong><span>Years industry focused</span></div>
          <div><strong>India</strong><span>Nationwide project outlook</span></div>
          <div><strong>360°</strong><span>Operations perspective</span></div>
          <div><strong>1:1</strong><span>Direct consultant attention</span></div>
        </div>
      </section>
    </>
  );
}
