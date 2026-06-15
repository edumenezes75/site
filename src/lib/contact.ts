export const EMAIL = "edumenezes75@gmail.com";

// Pre-filled briefing email — lowers the friction for an ECD to send a brief,
// which is the site's single conversion goal.
const SUBJECT = "Project inquiry — Edu Menezes";
const BODY = [
  "Hi Edu — here's what we're thinking:",
  "",
  "Agency / brand:",
  "Project:",
  "Timeline:",
  "Scope / deliverables:",
  "Reference:",
  "",
].join("\n");

export const BRIEF_MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;
