import { Link } from 'react-router-dom'
import { club } from '../data/site'

const socials = club.socials.filter((s) => s.u && s.u !== '#')

export default function Footer() {
  return (
    <footer className="footer">
      <div className="w">
        <div className="footer-grid">
          <div>
            <p className="brand">Swayam <small>E-Cell</small></p>
            <p className="muted mt-sm">{club.tagline}</p>
          </div>
          <div>
            <h3>Explore</h3>
            <p><Link to="/events/upcoming">Upcoming events</Link></p>
            <p><Link to="/events/past">Event archive</Link></p>
            <p><Link to="/about">About and team</Link></p>
            <p><Link to="/#partner">Partner with us</Link></p>
          </div>
          <div>
            <h3>Contact</h3>
            <p><a href={`mailto:${club.email}`}>{club.email}</a></p>
            <p className="muted">{club.phone}</p>
          </div>
          {socials.length > 0 && (
            <div>
              <h3>Follow</h3>
              {socials.map((s) => (
                <p key={s.n}><a href={s.u} target="_blank" rel="noreferrer">{s.n}</a></p>
              ))}
            </div>
          )}
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Swayam E-Cell, {club.college}</span>
          <span>Made in Hyderabad</span>
        </div>
      </div>
    </footer>
  )
}
