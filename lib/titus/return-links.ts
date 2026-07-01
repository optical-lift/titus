const allowedReturnPrefixes = [
  "/",
  "/courses/",
  "/lessons/",
  "/chains/",
  "/lenses/",
  "/patterns/",
  "/traditions/",
  "/registry",
  "/search",
  "/sources/",
];

export function getSafeReturnPath(from?: string) {
  if (!from) {
    return undefined;
  }

  let decoded = from;

  try {
    decoded = decodeURIComponent(from);
  } catch {
    return undefined;
  }

  if (!decoded.startsWith("/")) {
    return undefined;
  }

  if (decoded.startsWith("//")) {
    return undefined;
  }

  if (decoded.includes("\\")) {
    return undefined;
  }

  const pathOnly = decoded.split("?")[0].split("#")[0];

  const isAllowed = allowedReturnPrefixes.some((prefix) => {
    if (prefix === "/") {
      return decoded === "/";
    }

    return pathOnly === prefix.replace(/\/$/, "") || pathOnly.startsWith(prefix);
  });

  return isAllowed ? decoded : undefined;
}

export function getReturnLabel(from?: string) {
  const safeFrom = getSafeReturnPath(from);

  if (!safeFrom) {
    return "← Course catalogue";
  }

  if (safeFrom.startsWith("/courses/")) {
    return "← Return to current course";
  }

  if (safeFrom.startsWith("/lessons/")) {
    return "← Return to current lesson";
  }

  return "← Return";
}

export function getReturnHref(from?: string, fallback = "/") {
  return getSafeReturnPath(from) || fallback;
}
