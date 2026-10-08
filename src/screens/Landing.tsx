import { Link } from "react-router-dom";
import { Mascot } from "../components/Mascot";
export function Landing() {
  return (
    <div className="landing">
      <header className="app-header">
        <Link className="brand" to="/">
          <span className="brand-mark">q</span>quizzness
          <span className="brand-dot">✦</span>
        </Link>
        <div className="actions">
          <Link to="/login">Log in</Link>
          <Link className="button small" to="/signup">
            Join the adventure ↗
          </Link>
        </div>
      </header>
      <main id="main">
        <section className="landing-hero">
          <div>
            <p className="eyebrow">For curious minds. Across every subject.</p>
            <h1>
              Your next chapter
              <br />
              is an <em>adventure.</em>
            </h1>
            <p className="lead">
              A new way to explore what you’re studying. Discover your worlds,
              build understanding, and make every small step count.
            </p>
            <div className="actions">
              <Link className="button" to="/signup">
                Find your starting point <span>↗</span>
              </Link>
              <Link className="text-link" to="/preview">
                Explore the student preview →
              </Link>
            </div>
            <p className="muted">Tertiary learning, with a little more play.</p>
            <Mascot state="welcome" />
          </div>
          <figure className="campus-hero">
            <img
              src="/brand/quizzness-campus.png"
              alt="The Quizzness pixel campus, with purple-roofed buildings, a panther fountain and paths through the gardens"
              width="1672"
              height="941"
            />
            <figcaption>
              Your guild. Your subjects. Your next adventure.
              <br />
              Campus artwork · exploration is coming later.
            </figcaption>
          </figure>
        </section>
        <section className="landing-subjects">
          <p className="eyebrow">Many subjects. One place to begin.</p>
          <div>
            <span>Mathematics</span>
            <span>Business</span>
            <span>Biology</span>
            <span>Computer Science</span>
            <span>And beyond ↗</span>
          </div>
        </section>
      </main>
      <footer className="app-footer">
        Your learning journey belongs to you. Independent learners welcome.
      </footer>
    </div>
  );
}
