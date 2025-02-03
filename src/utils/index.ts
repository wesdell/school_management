export const getTitleFromPath = (pathname: string) => {
  const segments = pathname.split("/");

  if (segments.length >= 3) {
    return segments[2] // Tomamos el segundo índice que contiene "announcements" o "students"
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return "List";
};
