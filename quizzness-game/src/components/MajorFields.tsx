import { useState } from "react";
import { getMajor, majors, yearOptions } from "../data/majors";
import type { StudentProfile } from "../types/student";
type Fields = Pick<StudentProfile, "study_field" | "major_id" | "year_of_study">;
// Shared major + year picker for onboarding and the profile screen.
export function MajorFields({
  value,
  onChange,
}: {
  value: Fields;
  onChange: (next: Fields) => void;
}) {
  // "Other" is tracked by major_id, so typed text never hides its own input.
  const [otherSelected, setOtherSelected] = useState(value.major_id === "other");
  return (
    <>
      <label>
        What are you studying?
        <select
          value={value.major_id}
          onChange={(e) => {
            const major = getMajor(e.target.value);
            const other = major?.id === "other";
            setOtherSelected(other);
            onChange({
              ...value,
              major_id: major?.id ?? "",
              study_field: major && !other ? major.label : "",
            });
          }}
        >
          <option value="">Choose a subject</option>
          {majors.map((major) => (
            <option key={major.id} value={major.id}>
              {major.label}
            </option>
          ))}
        </select>
      </label>
      {otherSelected && (
        <label>
          Your subject
          <input
            maxLength={120}
            value={value.study_field}
            onChange={(e) => onChange({ ...value, study_field: e.target.value })}
          />
        </label>
      )}
      <label>
        Year of study (optional)
        <select
          value={value.year_of_study}
          onChange={(e) => onChange({ ...value, year_of_study: e.target.value })}
        >
          <option value="">Prefer not to say</option>
          {yearOptions.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
      </label>
    </>
  );
}
