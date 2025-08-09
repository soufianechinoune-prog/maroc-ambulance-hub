export function slugifyHeading(text: string): string {
  return (text || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // accents
    .replace(/[\p{Emoji_Presentation}\p{Emoji}\uFE0F]/gu, "") // emojis
    .replace(/[^a-zA-Z0-9\s-]/g, "") // punctuation & symbols
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export function smoothScrollToId(id: string, offset = 96) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}
