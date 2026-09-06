import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="TalentScreen home">
          <span className="brand-mark">T</span>
          <span>TalentScreen</span>
        </Link>
        <nav aria-label="Main navigation">
          <NavLink to="/jobs">Open roles</NavLink>
          <NavLink to="/apply">Apply</NavLink>
        </nav>
        <Link className="header-cta" to="/jobs">
          Find your next role <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <span className="brand">
          <span className="brand-mark">T</span>
          <span>TalentScreen</span>
        </span>
        <span>Thoughtful hiring, made clearer.</span>
        <div className="footer-developer">
          <span>Developed by Adarsh Bhoja</span>
          <a href="mailto:adarshboja70@gmail.com">adarshboja70@gmail.com</a>
          <a
            href="https://github.com/Adarshboja"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
        <span>© 2026 TalentScreen</span>
      </footer>
    </div>
  );
}
