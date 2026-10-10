export const avatars = [
  { id: "fern", label: "Flower", position: "0% 0%" },
  { id: "sun", label: "Hoodie", position: "50% 0%" },
  { id: "sky", label: "Bow", position: "100% 0%" },
  { id: "headphones", label: "Headphones", position: "0% 100%" },
  { id: "books", label: "Books", position: "50% 100%" },
  { id: "glasses", label: "Glasses", position: "100% 100%" },
];
export function Avatar({
  id = "fern",
  large = false,
}: {
  id?: string;
  large?: boolean;
}) {
  const avatar = avatars.find((item) => item.id === id) ?? avatars[0];
  return (
    <span
      className={large ? "avatar student-art large" : "avatar student-art"}
      role="img"
      aria-label={`${avatar.label}, Quizzness student character`}
      style={{ backgroundPosition: avatar.position }}
    />
  );
}
