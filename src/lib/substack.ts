const DEFAULT_URL = "https://substack.com";

export function getSubstackBaseUrl(): string {
  const raw = import.meta.env.VITE_SUBSTACK_PUBLISHING_URL?.trim();
  if (!raw) return DEFAULT_URL;
  return raw.replace(/\/$/, "");
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Opens the Substack subscribe flow with the email prefilled when supported.
 * Falls back to the publication subscribe page.
 */
export function subscribeViaSubstack(email: string): void {
  const base = getSubstackBaseUrl();
  const trimmed = email.trim();
  const url = new URL(`${base}/subscribe`);
  if (trimmed) {
    url.searchParams.set("email", trimmed);
  }
  window.open(url.toString(), "_blank", "noopener,noreferrer");
}
