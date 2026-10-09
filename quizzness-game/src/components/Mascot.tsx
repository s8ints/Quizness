export const mascotStates = {
  default: "Let’s think this through together.",
  welcome: "Welcome to Quizzness. Your guild is waiting.",
  thinking: "One idea at a time. What are you studying?",
  happy: "A small step is still a step forward.",
  encouraging: "Take your time. We’ll find your next step together.",
  celebrating: "Look how far you’ve come!",
  surprised: "There’s a new world of ideas to explore.",
  help: "Let’s find a way forward. You can try again.",
} as const;
export function Mascot({
  state = "default",
  message,
  compact = false,
}: {
  state?: keyof typeof mascotStates;
  message?: string;
  compact?: boolean;
}) {
  return (
    <aside
      className={`mascot-guide mascot-${state}${compact ? " compact" : ""}`}
      data-mascot-state={state}
    >
      <img
        src="/brand/panthy-pixel.svg"
        alt="Panthy, your purple pixel learning guide"
        width="144"
        height="138"
      />
      <div className="mascot-speech">
        <strong>Panthy · the thinking purple panther</strong>
        <p>{message ?? mascotStates[state]}</p>
      </div>
    </aside>
  );
}
