import { withBase } from '../lib/paths';

export default function AboutPage() {
  return (
    <>
      <section className="inner-hero about-hero">
        <div className="shell">
          <p className="page-number">03 / ABOUT</p>
          <div className="about-hero-title"><p className="kicker">Who we are</p><h1>Hospitality is our industry.<br /><em>People are our work.</em></h1></div>
          <div className="about-hero-image"><img src={withBase('/images/ad-staff.jpg')} alt="AD Brothers hospitality network" /></div>
        </div>
      </section>

      <section className="story-section">
        <div className="shell story-grid">
          <div><p className="section-index">OUR STORY</p><span className="story-year">2013</span></div>
          <div><h2 className="display-title">A Pune beginning.<br /><em>An India-wide outlook.</em></h2><p>AD Brothers began with a focused idea: hospitality businesses deserve recruitment partners who understand the work behind the welcome.</p><p>Over the years, our focus has stayed clear—listen carefully, search thoughtfully, and build connections that work for both businesses and candidates.</p></div>
        </div>
      </section>

      <section className="beliefs-section">
        <div className="shell">
          <p className="kicker">What guides us</p>
          <div className="beliefs-grid">
            {[
              ['01', 'Context before candidates', 'A job title never tells the whole story. We begin with the business behind the brief.'],
              ['02', 'Fit beyond experience', 'Capability matters. So do attitude, pace, expectations, and the way someone works with others.'],
              ['03', 'Straight conversations', 'Clear communication keeps hiring moving and gives both sides the confidence to decide well.'],
              ['04', 'Hospitality at heart', 'We stay close to the industry so our advice remains practical, relevant, and grounded.'],
            ].map(([num, title, copy]) => <article key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="photo-story">
        <div className="photo-story-main"><img src={withBase('/images/about-hospitality.png')} alt="AD Brothers team in Pune" /></div>
        <div className="photo-story-copy"><p className="kicker kicker-light">Close to the work</p><h2>Small enough to care.<br />Experienced enough to deliver.</h2><p>Our approach is personal because hospitality is personal. Clients speak with people who understand the assignment. Candidates are treated as people, not profiles.</p><a href={withBase('/contact')} data-route className="text-link text-link-light">Start a conversation <span>↗</span></a></div>
        <div className="photo-story-small"><img src={withBase('/images/hotel-management.jpg')} alt="Hospitality management meeting" /></div>
      </section>

      <section className="numbers-section">
        <div className="shell numbers-grid">
          <div><strong>13+</strong><span>Years industry focused</span></div>
          <div><strong>India</strong><span>Nationwide search reach</span></div>
          <div><strong>360°</strong><span>People support</span></div>
          <div><strong>1:1</strong><span>Personal attention</span></div>
        </div>
      </section>
    </>
  );
}
