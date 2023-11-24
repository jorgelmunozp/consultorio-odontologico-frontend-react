const date = new Date();

export const getDate = date
  .toLocaleDateString("es-CO", {
    formatMatcher: "basic",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .split("/");