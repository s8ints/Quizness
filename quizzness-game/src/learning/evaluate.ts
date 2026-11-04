import type { Activity, ActivityDraft, ActivityResult } from "./types";

/** Content-authored comparison only: student answers are never executed as code. */
export function evaluateActivity(
  activity: Activity,
  draft: ActivityDraft,
): ActivityResult {
  const fields =
    "slots" in activity ? activity.slots.map((slot) => slot.id) : ["answer"];
  if (fields.some((field) => !draft[field]?.trim())) {
    return {
      correct: false,
      complete: false,
      feedback:
        "Finish each part before checking. This does not use an attempt.",
      incorrectFields: [],
    };
  }
  const incorrectFields = fields.filter((field) => {
    const value = draft[field].trim();
    if ("slots" in activity) {
      return (
        !activity.options.some((option) => option.id === value) ||
        activity.slots.find((slot) => slot.id === field)?.answer !== value
      );
    }
    if ("options" in activity)
      return (
        !activity.options.some((option) => option.id === value) ||
        activity.answer !== value
      );
    return !activity.accepted.some((accepted) => {
      if (activity.numeric)
        return (
          /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(value) &&
          Number.isFinite(Number(value)) &&
          Number(value) === Number(accepted)
        );
      return activity.caseSensitive
        ? value === accepted.trim()
        : value.toLocaleLowerCase() === accepted.trim().toLocaleLowerCase();
    });
  });
  const correct = incorrectFields.length === 0;
  const labels =
    "slots" in activity
      ? activity.slots
          .filter((slot) => incorrectFields.includes(slot.id))
          .map((slot) => slot.label)
          .join(", ")
      : "your answer";
  return {
    complete: true,
    correct,
    incorrectFields,
    feedback: correct
      ? activity.explanation
      : `Review ${labels}. ${activity.hint} Your choices are kept so you can revise them.`,
  };
}
