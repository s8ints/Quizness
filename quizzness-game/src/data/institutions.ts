// Institutions offered in onboarding/profile. Caribbean first; "Other" lets
// any student type their own. Students never need an institution to use Quizzness.
export const institutionGroups: { region: string; names: string[] }[] = [
  {
    region: "Barbados",
    names: [
      "The University of the West Indies, Cave Hill",
      "Barbados Community College",
      "Samuel Jackman Prescod Institute of Technology",
      "Codrington College",
    ],
  },
  {
    region: "Jamaica",
    names: [
      "The University of the West Indies, Mona",
      "University of Technology, Jamaica",
      "Northern Caribbean University",
      "University of the Commonwealth Caribbean",
    ],
  },
  {
    region: "Trinidad and Tobago",
    names: [
      "The University of the West Indies, St. Augustine",
      "The University of Trinidad and Tobago",
      "University of the Southern Caribbean",
    ],
  },
  {
    region: "Wider Caribbean",
    names: [
      "The University of the West Indies, Five Islands",
      "The University of the West Indies, Global Campus",
      "University of Guyana",
      "University of The Bahamas",
      "University of Belize",
    ],
  },
];
export const listedInstitutions = institutionGroups.flatMap(
  (group) => group.names,
);
