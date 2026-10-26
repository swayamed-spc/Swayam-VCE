import { Link } from 'react-router-dom'
import { archive } from '../lib/events'
import { club, departments, institutionalBackbone, leadership, pillars, quotes } from '../data/site'

// "Our journey": the archive grouped by academic year, oldest first
const FLAGSHIP = ['Summit', 'Festival', 'Hackathon', 'Competition']
const years = Object.entries(
  archive.reduce((acc, e) => {
    const y = e.raw.academicYear || String(e.start.getFullYear())
    ;(acc[y] ??= []).push(e)
    return acc
  }, {}),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([year, list]) => {
    const sorted = [...list].sort((a, b) => {
      const rank = (e) => (FLAGSHIP.includes(e.category) ? FLAGSHIP.indexOf(e.category) : 9)
      return rank(a) - rank(b) || a.start - b.start
    })
    return { year, total: list.length, top: sorted.slice(0, 4) }
  })

export default function About() {
  const { founder, coordinator, ecosystem } = institutionalBackbone
  return (
    <div className="w page">
      <h1 className="page-title">About Swayam</h1>
      <p className="intro">{club.about}</p>

      <div className="stack mt-lg">
        <section className="quotes" aria-label="Vision and mission">
          {quotes.map((q) => (
            <blockquote key={q.a}>
              <p>{q.q}</p>
              <cite>{q.a}</cite>
            </blockquote>
          ))}
        </section>

        <section>
          <h2 className="mb-md">Our journey</h2>
          <div className="timeline">
            {years.map(({ year, total, top }) => (
              <div key={year}>
                <b>{year}</b>
                <div>
                  <h3>{total} {total === 1 ? 'event' : 'events'}</h3>
                  <p>
                    Including{' '}
                    {top.map((e, i) => (
                      <span key={e.key}>
                        {i > 0 && (i === top.length - 1 ? ' and ' : ', ')}
                        <Link to={e.href}>{e.name}</Link>
                      </span>
                    ))}
                    {total > top.length && `, plus ${total - top.length} more`}.
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-md"><Link className="text-link" to="/events/past">See the full event archive</Link></p>
        </section>

        <section>
          <h2 className="mb-md">What we do</h2>
          <div className="pillars">
            {pillars.map((p) => (
              <div key={p.t}>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-md">Faculty and institution</h2>
          <div className="backbone">
            {[founder, coordinator].map((p) => (
              <div key={p.name} className="card">
                <span className="eyebrow">{p.role}</span>
                <h3>{p.name}</h3>
                <p>{p.designation}</p>
              </div>
            ))}
            <div className="card">
              <span className="eyebrow">Institution</span>
              <h3>{ecosystem.institution}</h3>
              <p>{ecosystem.sponsoringBody}. {ecosystem.affiliation}. {ecosystem.approval}.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-md">Leadership</h2>
          <div className="leaders">
            {leadership.map((l) => (
              <div key={l.name} className="person">
                <div className="person-photo"><img src={l.img} alt={l.name} loading="lazy" /></div>
                <h3>{l.name}</h3>
                <p className="accent">{l.role}</p>
                <p>{l.dept}</p>
                <p className="focus">{l.focus}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-md">Our {departments.length} wings</h2>
          <div className="grid">
            {departments.map((d) => (
              <Link key={d.id} to={`/teams/${d.id}`} className="card dept-card">
                <h3>{d.name}</h3>
                <p>{d.mandate}</p>
                <div className="dept-heads" aria-label={`Led by ${d.heads.map((h) => h.name).join(' and ')}`}>
                  {d.heads.map((h) => <img key={h.name} src={h.img} alt="" loading="lazy" />)}
                </div>
                <span className="more-link">Meet the team</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <p className="muted mt-lg">
        Questions? Email <a className="text-link" href={`mailto:${club.email}`}>{club.email}</a> or call {club.phone}.
      </p>
    </div>
  )
}
