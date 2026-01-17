export const normalizeEnum = (value) => {
  if (!value) return "";

  return value
    .toString()
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "_") // spaces → _
    .replace(/-+/g, "_"); // dashes → _
};
