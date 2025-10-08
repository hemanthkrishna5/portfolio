import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  const [thisWeekSteps, setThisWeekSteps] = useState('—');
  const [lastWeekSteps, setLastWeekSteps] = useState('—');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://activity.tesseract.sbs/public/steps', { credentials: 'omit' });
        if (!res.ok) return;
        const d = await res.json();
        const n = (x: string | number) => Number(x || 0).toLocaleString();
        setThisWeekSteps(n(d?.thisWeek?.steps ?? d?.week?.steps));
        setLastWeekSteps(n(d?.lastWeek?.steps));
      } catch (_) {}
    })();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>Builds, data & side-projects</h1>
            <p>Personal hub for experiments, activity insights, and electronics. Minimal, fast, and privacy-friendly.</p>
            <div className="cta-row">
              <a className="btn btn-primary" href="https://activity.tesseract.sbs" target="_blank" rel="noopener">Open Activity Dashboard</a>
              <Link className="btn btn-ghost" to="/portfolio">See Portfolio</Link>
            </div>
          </div>
          <div className="hero-card">
            <div className="stat">
              <div className="stat-label">This week</div>
              <div className="stat-value">{thisWeekSteps}</div>
              <div className="stat-sub">Mon → Sun</div>
            </div>
            <div className="stat">
              <div className="stat-label">Last week</div>
              <div className="stat-value">{lastWeekSteps}</div>
              <div className="stat-sub">Prev Mon → Sun</div>
            </div>
            <a className="mini-link" href="https://activity.tesseract.sbs" target="_blank" rel="noopener">Live stats →</a>
          </div>
        </div>
        <div className="bg-grid" aria-hidden="true"></div>
      </section>

      <section className="cards container">
        <a className="card" href="https://activity.tesseract.sbs" target="_blank" rel="noopener">
          <div className="card-icon">🏃‍♂️</div>
          <h3>Activity tracker</h3>
          <p>Daily steps, active kcal, workouts — private dashboard behind auth.</p>
          <span className="card-link">Open dashboard ↗</span>
        </a>

        <Link className="card" to="/portfolio">
          <div className="card-icon">🧰</div>
          <h3>Portfolio</h3>
          <p>Projects, write-ups, and small tools I tinker with.</p>
          <span className="card-link">View portfolio →</span>
        </Link>

        <Link className="card" to="/electronics">
          <div className="card-icon">🔧</div>
          <h3>Electronic projects</h3>
          <p>PCBs, microcontrollers, sensors, and logs from the bench.</p>
          <span className="card-link">Explore builds →</span>
        </Link>
      </section>
    </>
  );
}
