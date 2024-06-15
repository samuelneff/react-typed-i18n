export function resolveCurrentLocale() {
  return Intl.DateTimeFormat().resolvedOptions().locale;
}
