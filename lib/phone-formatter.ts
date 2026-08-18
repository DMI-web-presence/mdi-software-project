/**
 * Formats a raw phone input string into Romanian phone format:
 * - Local: 07XX XXX XXX
 * - International: +40 7XX XXX XXX
 */
export function formatRomaniaPhone(value: string): string {
  // Keep only digits and '+'
  const cleaned = value.replace(/[^\d+]/g, "");

  // If it starts with +40, format as +40 7XX XXX XXX (or other area codes starting with 2, 3, 7)
  if (cleaned.startsWith("+40")) {
    const digits = cleaned.slice(3).replace(/\D/g, "");
    if (digits.length === 0) return "+40";
    if (digits.length <= 3) return `+40 ${digits}`;
    if (digits.length <= 6) return `+40 ${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `+40 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
  }

  // Otherwise, format as XXXX XXX XXX
  const digits = cleaned.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
}
