import type { Activity } from "../../learning/types";

/** Original introductory demo material; not validated against a university course. */
export const contentNotice =
  "Original introductory demo content — not checked against your university's course.";
export type MissionRoute = {
  id: string;
  missionId: string;
  title: string;
  story: string;
  objectives: string[];
  lesson: string;
  activities: Activity[];
  variantActivities: Activity[];
};

const types = [
  { id: "number", label: "Number" },
  { id: "text", label: "Text" },
  { id: "boolean", label: "True/false" },
];
const objectives = [
  "Choose useful variable names",
  "Distinguish numbers, text and true/false values",
  "Trace assignment and value changes",
];
const lesson =
  "A variable is a name for a stored value. In our language-neutral pseudocode, name ← value means store the value under that name. Text uses quotation marks, numbers do not, and true/false values express a condition. Read assignments from top to bottom: a new assignment replaces the previous value. For example, points ← 4 followed by points ← points + 2 leaves points holding 6. This notation is a teaching tool, not a particular programming language.";

type Story = {
  id: string;
  title: string;
  story: string;
  item: string;
  label: string;
  flag: string;
  place: string;
};
const stories: Story[] = [
  {
    id: "campus-event",
    title: "Organise a campus event",
    story:
      "The welcome-event organiser needs a reliable sign-up sheet. Visit the welcome desk, stores and ticket counter to put each piece of information in the right place.",
    item: "tickets",
    label: "eventName",
    flag: "doorsOpen",
    place: "welcome desk",
  },
  {
    id: "terminal-repair",
    title: "Repair the mixed-up terminal",
    story:
      "The library terminal has mixed up names, counts and connection states. Help the technician restore the records without changing what they mean.",
    item: "connections",
    label: "terminalName",
    flag: "isOnline",
    place: "library terminal",
  },
  {
    id: "adventure-inventory",
    title: "Prepare an adventure inventory",
    story:
      "The campus exploration club is packing supplies. Help the quartermaster label the inventory and keep its counts up to date before the trip.",
    item: "supplies",
    label: "packName",
    flag: "isPacked",
    place: "supply shelf",
  },
];

function computingActivities(story: Story, variant: number): Activity[] {
  const n = variant === 0 ? 6 : 9;
  const add = variant === 0 ? 3 : 2;
  const name = variant === 0 ? "Welcome" : "Discovery";
  const prefix = `${story.id}-v${variant}`;
  return [
    {
      id: `${prefix}-name`,
      kind: "choice",
      title: "Give the count a name",
      objective: objectives[0],
      prompt: `At the ${story.place}, which name best describes how many ${story.item} are available?`,
      options: [
        { id: "count", label: `${story.item}Count` },
        { id: "word", label: `${story.label}` },
        { id: "state", label: story.flag },
      ],
      answer: "count",
      hint: "Choose a name that communicates both the item and that the value is a count.",
      explanation: `${story.item}Count clearly identifies a count. A name describing a title or state would obscure the purpose of the value.`,
    },
    {
      id: `${prefix}-match`,
      kind: "matching",
      title: "Match values to their types",
      objective: objectives[1],
      prompt:
        "Place each value with its data type. Quotation marks are meaningful.",
      options: types,
      slots: [
        { id: "count", label: String(n), answer: "number" },
        { id: "name", label: `"${name}"`, answer: "text" },
        { id: "state", label: "true", answer: "boolean" },
      ],
      hint: "Numbers can be used directly in arithmetic; quoted words are text; true and false describe conditions.",
      explanation: `${n} is a number, "${name}" is text, and true is a true/false value. The written representation tells us the intended type.`,
    },
    {
      id: `${prefix}-classify`,
      kind: "classification",
      title: "Sort the records",
      objective: objectives[1],
      prompt:
        "Classify all four stored values. Several values can share a type.",
      options: types,
      slots: [
        { id: "a", label: `${story.item}Count ← ${n}`, answer: "number" },
        { id: "b", label: `${story.label} ← "${name}"`, answer: "text" },
        { id: "c", label: `${story.flag} ← false`, answer: "boolean" },
        { id: "d", label: 'displayCode ← "42"', answer: "text" },
      ],
      hint: "A digit sequence inside quotation marks is still text in this exercise. Read the value, not only the variable name.",
      explanation:
        'The count is numeric, the two quoted values are text, and false is a true/false value. "42" and 42 have different types.',
    },
    {
      id: `${prefix}-assign`,
      kind: "assignment",
      title: "Build the assignment",
      objective: objectives[2],
      prompt: `Build an instruction storing ${n} in ${story.item}Count. Read the slots from left to right.`,
      options: [
        { id: "name", label: `${story.item}Count` },
        { id: "arrow", label: "←" },
        { id: "value", label: String(n) },
        { id: "text", label: `"${n}"` },
      ],
      slots: [
        { id: "target", label: "Variable name", answer: "name" },
        { id: "operator", label: "Assignment symbol", answer: "arrow" },
        { id: "value", label: "Numeric value", answer: "value" },
      ],
      hint: "The name goes on the left, the assignment arrow in the middle, and the numeric value on the right.",
      explanation: `${story.item}Count ← ${n} stores a number under the chosen name. Quoting the number would store text instead.`,
    },
    {
      id: `${prefix}-trace`,
      kind: "trace",
      title: "Follow the changing count",
      objective: objectives[2],
      prompt: `Follow each instruction in order. What is the final value of ${story.item}Count?`,
      steps: [
        `${story.item}Count ← ${n}`,
        `${story.item}Count ← ${story.item}Count + ${add}`,
        `${story.item}Count ← ${story.item}Count - 1`,
      ],
      accepted: [String(n + add - 1)],
      numeric: true,
      hint: "Start with the first value, add the next amount, then subtract one. Each line uses the latest value.",
      explanation: `The values are ${n}, then ${n + add}, then ${n + add - 1}. Assignment replaces the previous value rather than remembering both.`,
    },
    {
      id: `${prefix}-correct`,
      kind: "correction",
      title: "Find the mixed-up record",
      objective: objectives[1],
      prompt:
        "The count must be numeric and the status must be true/false. Which line needs correction?",
      options: [
        { id: "count", label: `${story.item}Count ← ${n}` },
        { id: "state", label: `${story.flag} ← "false"` },
        { id: "name", label: `${story.label} ← "${name}"` },
      ],
      answer: "state",
      hint: "Check whether the status is storing a condition or a quoted word. Those are different types.",
      explanation: `${story.flag} ← "false" stores text. Remove the quotation marks to store the true/false value false.`,
    },
    {
      id: `${prefix}-answer`,
      kind: "short-answer",
      title: "Record the final supply count",
      objective: objectives[2],
      prompt: `There are ${n} ${story.item}. ${add} more arrive. What numeric value should be stored in ${story.item}Count?`,
      accepted: [String(n + add)],
      numeric: true,
      hint: "Combine the original count with the arriving items, then enter only the numeric value.",
      explanation: `${n} + ${add} = ${n + add}. Store ${n + add} as a number so it can be used in later calculations.`,
    },
  ];
}

const computingRoutes: MissionRoute[] = stories.map((story) => ({
  id: story.id,
  missionId: "variables-values-types",
  title: story.title,
  story: story.story,
  objectives,
  lesson,
  activities: computingActivities(story, 0),
  variantActivities: computingActivities(story, 1),
}));

function mathActivities(variant: number): Activity[] {
  const start = variant === 0 ? 5 : 7;
  const added = variant === 0 ? 3 : 4;
  return [
    {
      id: `math-v${variant}-numeric`,
      kind: "short-answer",
      title: "Keep an equation balanced",
      objective: "Solve a one-step equation",
      prompt: `Solve x + ${added} = ${start + added}. Enter the numeric value of x.`,
      accepted: [String(start)],
      numeric: true,
      hint: "Undo the addition on both sides so the variable stands alone.",
      explanation: `Subtract ${added} from both sides: x = ${start + added} - ${added} = ${start}.`,
    },
    {
      id: `math-v${variant}-match`,
      kind: "matching",
      title: "Match equivalent expressions",
      objective: "Recognise equivalent arithmetic",
      prompt: "Match each expression to its value.",
      options: [
        { id: "a", label: String(start * 2) },
        { id: "b", label: String(start + added) },
        { id: "c", label: String(start - added) },
      ],
      slots: [
        { id: "double", label: `2 × ${start}`, answer: "a" },
        { id: "sum", label: `${start} + ${added}`, answer: "b" },
        { id: "difference", label: `${start} - ${added}`, answer: "c" },
      ],
      hint: "Evaluate one expression at a time. Multiplication by two means adding the number to itself.",
      explanation: `2 × ${start} = ${start * 2}; ${start} + ${added} = ${start + added}; ${start} - ${added} = ${start - added}.`,
    },
    {
      id: `math-v${variant}-error`,
      kind: "correction",
      title: "Find the incorrect step",
      objective: "Check equality-preserving steps",
      prompt: `A student solves x + ${added} = ${start + added}. Which step first breaks the equality?`,
      options: [
        { id: "a", label: `Start: x + ${added} = ${start + added}` },
        {
          id: "b",
          label: `Subtract ${added} from the left but add ${added} to the right`,
        },
        { id: "c", label: `Conclude x = ${start + added * 2}` },
      ],
      answer: "b",
      hint: "An equation stays balanced only if you perform the same operation on both sides.",
      explanation: `The second step performs different operations on the two sides. Subtract ${added} from both sides instead, giving x = ${start}.`,
    },
  ];
}

function traceActivities(variant: number): Activity[] {
  return computingActivities(stories[0], variant)
    .filter((a) => ["trace", "assignment", "short-answer"].includes(a.kind))
    .map((a) => ({ ...a, id: `changing-${a.id}` }));
}

export const routes: MissionRoute[] = [
  ...computingRoutes,
  {
    id: "checkpoint",
    missionId: "variables-values-types",
    title: "Optional shared checkpoint",
    story:
      "Check the ideas shared by all three adventures with a fresh set of examples.",
    objectives,
    lesson,
    activities: computingActivities(stories[1], 1).filter((a) =>
      ["matching", "trace", "correction"].includes(a.kind),
    ),
    variantActivities: computingActivities(stories[2], 0).filter((a) =>
      ["matching", "trace", "correction"].includes(a.kind),
    ),
  },
  {
    id: "changing-values",
    missionId: "changing-values",
    title: "Changing values: repair the counter",
    story:
      "The event counter needs a careful trace. Work through its updates one at a time.",
    objectives: [
      "Read assignments in order",
      "Calculate the latest stored value",
    ],
    lesson,
    activities: traceActivities(0),
    variantActivities: traceActivities(1),
  },
  {
    id: "mathematics-demo",
    missionId: "mathematics-foundations",
    title: "Mathematics: balance the equation",
    story:
      "Help check the calculations for a campus project. This independent demo uses the same activity engine as the computing routes.",
    objectives: [
      "Solve a one-step equation",
      "Recognise equivalent arithmetic",
      "Identify a step that breaks equality",
    ],
    lesson:
      "An equation says two quantities are equal. To keep it balanced, apply the same operation to both sides. For example, x + 2 = 6 becomes x = 4 when you subtract 2 from both sides. Check by substituting 4 into the original equation.",
    activities: mathActivities(0),
    variantActivities: mathActivities(1),
  },
];

export function getRoute(id: string, variant = 0): MissionRoute | undefined {
  const route = routes.find((r) => r.id === id);
  if (!route) return undefined;
  return {
    ...route,
    activities:
      Math.abs(variant) % 2 === 1 ? route.variantActivities : route.activities,
  };
}
