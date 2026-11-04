export interface ActivityBase {
  id: string;
  title: string;
  objective: string;
  prompt: string;
  hint: string;
  explanation: string;
}
export interface ActivityOption {
  id: string;
  label: string;
}
export interface ActivitySlot {
  id: string;
  label: string;
  answer: string;
}
export type Activity = ActivityBase &
  (
    | {
        kind: "choice" | "correction";
        options: ActivityOption[];
        answer: string;
      }
    | {
        kind: "matching" | "classification" | "assignment";
        options: ActivityOption[];
        slots: ActivitySlot[];
      }
    | {
        kind: "trace";
        steps: string[];
        accepted: string[];
        numeric?: boolean;
        caseSensitive?: boolean;
      }
    | {
        kind: "short-answer";
        accepted: string[];
        numeric?: boolean;
        caseSensitive?: boolean;
      }
  );
export type ActivityDraft = Record<string, string>;
export interface ActivityResult {
  correct: boolean;
  complete: boolean;
  feedback: string;
  incorrectFields: string[];
}
