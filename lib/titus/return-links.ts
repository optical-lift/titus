export function getReturnLabel(from?: string) {
  if (!from) {
    return "← Course catalogue";
  }

  if (from.startsWith("/courses/")) {
    return "← Return to current course";
  }

  if (from.startsWith("/lessons/")) {
    return "← Return to current lesson";
  }

  return "← Return";
}

export function getReturnHref(from?: string, fallback = "/") {
  return from || fallback;
}
