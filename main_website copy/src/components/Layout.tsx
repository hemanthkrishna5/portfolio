import { Outlet, Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export function Layout() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" to="/">
            <span className="logo" aria-hidden="true">TS</span>
            <span>tesseract.sbs</span>
          </Link>
          <nav className="nav">
            <NavLink to="/">Home</NavLink>
            <a href="https://activity.tesseract.sbs" target="_blank" rel="noopener">Activity tracker</a>
            <NavLink to="/portfolio">Portfolio</NavLink>
            <NavLink to="/electronics">Electronic projects</NavLink>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <span>© {year} tesseract.sbs</span>
          <span className="small">Built with Cloudflare Pages & Tunnel</span>
        </div>
      </footer>
    </>
  );
}
