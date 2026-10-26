import { Link, useLocation } from 'react-router-dom'

export default function NotFound() {
  const { pathname } = useLocation()
  return (
    <div className="w page narrow">
      <span className="eyebrow">Error 404</span>
      <h1 className="page-title">Page not found</h1>
      <p className="intro">
        There is nothing at <span className="mono">{pathname}</span>. The link may be old, or the page may have moved.
      </p>
      <div className="actions mt-md">
        <Link className="btn" to="/">Go to the home page</Link>
        <Link className="btn btn--ghost" to="/events">Browse events</Link>
      </div>
    </div>
  )
}
