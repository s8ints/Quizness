import { useState } from "react";
import { institutionGroups, listedInstitutions } from "../data/institutions";
// Dropdown of institutions plus "Other", which reveals a text box.
// The chosen name is stored as plain text in the profile's institution field.
export function InstitutionField({
  value,
  onChange,
  optional = false,
}: {
  value: string;
  onChange: (institution: string) => void;
  // On the profile page an empty choice means "learning independently".
  optional?: boolean;
}) {
  const [other, setOther] = useState(
    !!value && !listedInstitutions.includes(value),
  );
  return (
    <>
      <label>
        Your university or college
        <select
          value={other ? "__other" : value}
          onChange={(e) => {
            const isOther = e.target.value === "__other";
            setOther(isOther);
            onChange(isOther ? "" : e.target.value);
          }}
        >
          <option value="">
            {optional
              ? "None, I’m learning independently"
              : "Choose your institution"}
          </option>
          {institutionGroups.map((group) => (
            <optgroup key={group.region} label={group.region}>
              {group.names.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </optgroup>
          ))}
          <option value="__other">Other (type it)</option>
        </select>
      </label>
      {other && (
        <label>
          Institution name
          <input
            maxLength={160}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. University of Toronto"
          />
        </label>
      )}
    </>
  );
}
