import { Link } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";
import { useGameplay } from "./GameplayProvider";
import { routes } from "../content/phase2/routes";
export function Journal() {
  const { save, error } = useGameplay();
  const { preview } = useStudent();
  const base = preview ? "/preview" : "";
  return (
    <div className="page">
      <h1>Your learning journal</h1>
      <p>
        Gameplay is saved on this browser only, separately for each account.
        Local balances are not purchase credit.
      </p>
      {error && <p role="alert">{error}</p>}
      <p>
        {save.gems} gems · {save.pawTokens} Paw Tokens · cosmetics only
      </p>
      <h2>Adventures</h2>
      <ul>
        {routes.map((r) => (
          <li key={r.id}>
            <Link to={`${base}/missions/${r.id}`}>{r.title}</Link> ·{" "}
            {save.history.some((h) => h.routeId === r.id)
              ? "Completed"
              : save.checkpoints[r.id]
                ? "Saved adventure"
                : "Not completed"}
          </li>
        ))}
      </ul>
      <h2>Results and history</h2>
      {!save.history.length && (
        <p>Your completed adventures will appear here.</p>
      )}
      {routes.map((r) => {
        const history = save.history.filter((h) => h.routeId === r.id);
        if (!history.length) return null;
        return (
          <section key={r.id}>
            <h3>{r.title}</h3>
            <p>
              Best: {Math.max(...history.map((h) => h.percent))}% · Latest:{" "}
              {history.at(-1)!.percent}%
            </p>
            <ol>
              {history
                .slice()
                .reverse()
                .map((h, i) => (
                  <li key={i}>
                    {h.percent}% · {"★".repeat(h.stars)} · {h.label} · first try{" "}
                    {h.first}% · eventual {h.eventual}% · {h.hints} hints ·{" "}
                    {Math.round(h.elapsed / 60)} min · {h.gems} gems
                  </li>
                ))}
            </ol>
          </section>
        );
      })}
      <Link to={`${base}/explore/variables-topic`}>
        Return to the mission board
      </Link>
    </div>
  );
}
