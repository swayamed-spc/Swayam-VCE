import { Link, useParams } from 'react-router-dom'
import { Crumbs } from '../components/ui'
import { departments } from '../data/site'
import NotFound from './NotFound'

export default function DepartmentDetail() {
  const { departmentId } = useParams()
  const index = departments.findIndex((d) => d.id === departmentId)
  if (index === -1) return <NotFound />
  const d = departments[index]
  const prev = departments[(index - 1 + departments.length) % departments.length]
  const next = departments[(index + 1) % departments.length]

  return (
    <div className="w page">
      <Crumbs items={[{ label: 'About', to: '/about' }, { label: 'Wings', to: '/about' }, { label: d.shortName }]} />
      <h1 className="page-title">{d.name}</h1>
      <p className="intro">{d.mandate}</p>

      <div className="stack mt-lg">
        <section>
          <h2 className="mb-md">Led by</h2>
          <div className="heads">
            {d.heads.map((h) => (
              <div key={h.name} className="person">
                <div className="person-photo"><img src={h.img} alt={h.name} loading="lazy" /></div>
                <h3>{h.name}</h3>
                <p>{h.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="prose">
          <h2>What the wing does</h2>
          <ul>{d.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
        </section>

        {d.work?.length > 0 && (
          <section>
            <h2 className="mb-md">Selected work</h2>
            <div className="work">
              {d.work.map((w) => (
                <article key={w.title} className={`work-item ${w.image ? '' : 'work-item--noimg'}`}>
                  {w.image && <img src={w.image} alt="" loading="lazy" />}
                  <div>
                    <span className="eyebrow">{w.year}</span>
                    <h3>{w.link ? <Link className="text-link" to={w.link}>{w.title}</Link> : w.title}</h3>
                    <p><b>Role:</b> {w.role}</p>
                    <p><b>Outcome:</b> {w.outcome}</p>
                    {w.source && <p className="small">Source: {w.source}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      <nav className="pager" aria-label="Other wings">
        <Link to={`/teams/${prev.id}`}><span className="small">Previous wing</span><b>{prev.name}</b></Link>
        <Link to={`/teams/${next.id}`} className="right"><span className="small">Next wing</span><b>{next.name}</b></Link>
      </nav>
    </div>
  )
}
