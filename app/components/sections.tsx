import Reveal from "./Reveal";
import HeroAurora from "./HeroAurora";
import {
  heroStats,
  competencies,
  stack,
  timeline,
  projects,
  skillGroups,
  education,
  contacts,
} from "@/lib/data";

export function Hero() {
  return (
    <section id="intake" className="hero" aria-label="Overview">
      <div className="hero-watermark" aria-hidden="true">
        DATA
      </div>
      <HeroAurora />
      <div className="hero-inner">
        <Reveal>
          <div className="hero-eyebrow">
            Data Analysis · AI Systems · Applied Engineering
          </div>
        </Reveal>
        <h1 className="hero-headline">
          <Reveal>
            <span className="line">Where messy data</span>
          </Reveal>
          <Reveal delay={100}>
            <span className="line accent">becomes working systems.</span>
          </Reveal>
        </h1>
        <Reveal delay={320}>
          <p className="hero-bio">
            Started in data. Stayed to build the systems that use it.
          </p>
        </Reveal>
        <Reveal delay={420}>
          <div className="hero-stats" role="list" aria-label="Key statistics">
            {heroStats.map((s) => (
              <div className="hero-stat" role="listitem" key={s.label}>
                <div className="stat-num">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Competencies() {
  return (
    <section className="competencies" aria-label="Core competencies">
      <Reveal className="section-head">
        <h2 className="section-title">Core Competencies</h2>
        <p className="section-sub">
          Six areas where I turn ambiguous data problems into shipped,
          decision-ready output.
        </p>
      </Reveal>
      <div className="comp-grid">
        {competencies.map((c, i) => (
          <Reveal key={c.name} delay={(i % 3) * 60}>
            <div className="comp-cell">
              <div className="comp-name">{c.name}</div>
              <div className="comp-desc">{c.desc}</div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="stack-band">
        <div className="stack-band-label mono">Stack</div>
        <div className="stack-row" role="list" aria-label="Technology stack">
          {stack.map((t, i) => (
            <span
              className={`stack-tag${t.core ? " stack-tag--core" : ""}`}
              role="listitem"
              key={t.name}
              style={{ transitionDelay: `${i * 22}ms` }}
            >
              {t.name}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="stage" aria-label="Professional experience">
      <Reveal className="section-head">
        <h2 className="section-title">Professional History</h2>
        <p className="section-sub">
          End-to-end data roles spanning research, operations, and production
          analytics.
        </p>
      </Reveal>
      <div className="timeline">
        {timeline.map((t) => (
          <Reveal as="article" className="tl-item" key={t.title + t.date}>
            <div className="tl-marker" aria-hidden="true" />
            <div className="tl-date mono">{t.date}</div>
            <div className="tl-body">
              <h3 className="tl-title">{t.title}</h3>
              <div className="tl-org">{t.org}</div>
              <ul className="tl-list">
                {t.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="tl-metrics" aria-label="Key metrics">
                {t.metrics.map((m) => (
                  <span className="tl-metric mono" key={m}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <section id="projects" className="stage stage-alt" aria-label="Featured projects">
      <Reveal className="section-head">
        <h2 className="section-title">Featured Work</h2>
        <p className="section-sub">
          Applied research and engineering across ML, cloud, and systems design.
        </p>
      </Reveal>
      <div className="proj-featured-row">
        {featured.map((p, i) => (
          <Reveal as="article" className="proj-card proj-card--featured" key={p.name} delay={i * 80} dataAccent={p.accent}>
            <div className="proj-tags" aria-label="Technologies used">
              {p.tags.map((t) => (
                <span className="proj-tag mono" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <h3 className="proj-name">{p.name}</h3>
            <div className="proj-org">{p.org}</div>
            <ul className="proj-body">
              {p.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            {p.stats && (
              <div className="proj-stats" role="list" aria-label="Results">
                {p.stats.map((s) => (
                  <div className="proj-stat" role="listitem" key={s.label}>
                    <div className="proj-stat-num">{s.value}</div>
                    <div className="proj-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
            {p.links && (
              <div className="proj-links">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    className={`proj-link${l.primary ? " proj-link--primary" : ""}`}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </Reveal>
        ))}
      </div>
      <div className="proj-grid">
        {rest.map((p, i) => (
          <Reveal as="article" className="proj-card" key={p.name} delay={i * 80} dataAccent={p.accent}>
            <div className="proj-tags" aria-label="Technologies used">
              {p.tags.map((t) => (
                <span className="proj-tag mono" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <h3 className="proj-name">{p.name}</h3>
            <div className="proj-org">{p.org}</div>
            <ul className="proj-body">
              {p.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="stage stage-alt" aria-label="Technical skills">
      <Reveal className="section-head">
        <h2 className="section-title">Technical Proficiency</h2>
        <p className="section-sub">
          A full-stack data toolkit spanning languages, platforms,
          visualisation, and applied LLM engineering.
        </p>
      </Reveal>
      <div className="skills-grid">
        {skillGroups.map((g, i) => (
          <Reveal key={g.cat} delay={(i % 2) * 60}>
            <div className="skill-group">
              <div className="skill-cat mono">{g.cat}</div>
              <div className="skill-items">
                {g.items.map((s) => (
                  <span className="skill-pill" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="stage" aria-label="Education">
      <Reveal className="section-head">
        <h2 className="section-title">Academic Background</h2>
        <p className="section-sub">
          Strong foundation in computer engineering and information systems.
        </p>
      </Reveal>
      <div className="edu-grid">
        {education.map((e, i) => (
          <Reveal as="article" className="edu-card" key={e.degree} delay={i * 100}>
            <div className="edu-card-head">
              <div>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-uni">{e.uni}</div>
              </div>
              <div className="edu-gpa-block">
                <span className="edu-gpa">{e.gpa}</span>
                <span className="edu-gpa-sub mono">{e.gpaSub}</span>
              </div>
            </div>
            <div className="edu-card-body">
              <div className="edu-meta mono">Coursework highlights</div>
              <ul className="edu-courses">
                {e.courses.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="contact" aria-label="Contact">
      <div className="contact-watermark" aria-hidden="true">
        CONNECT
      </div>
      <div className="contact-inner">
        <Reveal>
          <h2 className="contact-title">
            Let&apos;s turn your
            <br />
            data into <span className="accent">decisions</span>.
          </h2>
          <p className="contact-sub">
            Open to Data Analyst, Analytics Engineer, and Research roles across
            EU, UAE, Asia &amp; global remote teams.
          </p>
        </Reveal>
        <Reveal className="contact-links" delay={100}>
          {contacts.map((c) => (
            <a
              key={c.label}
              className="contact-link"
              href={c.href}
              {...(c.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className="contact-link-label mono">{c.label}</span>
              <span className="contact-link-value">{c.value}</span>
            </a>
          ))}
        </Reveal>
      </div>
      <footer className="site-footer">
        <span>Sandeep Parmar · Data Analyst &amp; AI Systems</span>
        <span className="availability">
          <span className="availability-dot" aria-hidden="true" />
          Open to Global Opportunities
        </span>
      </footer>
    </section>
  );
}
