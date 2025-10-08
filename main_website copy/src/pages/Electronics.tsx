export function Electronics() {
  const pageStyles = `
    .electronics-hero {
      padding: 56px 0 24px;
    }
    .electronics-hero h1 {
      margin: 0 0 12px;
      font-size: clamp(30px, 4vw, 42px);
    }
    .electronics-hero p {
      margin: 0;
      color: var(--muted);
      max-width: 60ch;
      line-height: 1.6;
    }
    .electronics-frame {
      margin: 0 0 64px;
      border-radius: 18px;
      border: 1px solid var(--border);
      background: radial-gradient(800px 420px at 20% 0%, rgba(106, 169, 255, 0.18), transparent 65%),
                  radial-gradient(640px 320px at 90% 10%, rgba(155, 107, 255, 0.15), transparent 70%),
                  var(--panel);
      box-shadow: var(--shadow);
    }
    .electronics-iframe {
      display: block;
      width: 100%;
      min-height: 720px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      background: var(--card);
    }
    .electronics-frame-inner {
      padding: 16px;
    }
    .electronics-note {
      margin-top: 18px;
      color: var(--muted);
      font-size: 0.95rem;
      text-align: center;
    }
    @media (max-width: 900px) {
      .electronics-hero {
        padding-top: 40px;
      }
      .electronics-iframe {
        min-height: 560px;
      }
    }
    @media (max-width: 600px) {
      .electronics-iframe {
        min-height: 480px;
      }
    }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <section className="electronics-hero">
        <div className="container">
          <h1>Timesheets</h1>
          <p>
            Live dashboard for the dodecahedron orientation project. The view below is powered by the timesheet device service,
            exposing the most recent IMU readings and classification in real time.
          </p>
        </div>
      </section>

      <section className="electronics-frame">
        <div className="container">
          <div className="electronics-frame-inner">
            <iframe
              className="electronics-iframe"
              src="/timesheet-app/"
              title="Dodecahedron orientation dashboard"
              loading="lazy"
            ></iframe>
          </div>
          <p className="electronics-note">
            If the dashboard does not load, make sure the timesheet device service is running.
          </p>
        </div>
      </section>
    </>
  );
}
