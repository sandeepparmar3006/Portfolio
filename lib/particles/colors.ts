// Reads theme colors from live CSS custom props so the particle field never hardcodes hex.

export interface ThemeColors {
  ink: string;
  dim: string;
  pulse: string;
  data: string;
  signal: string;
}

export function getThemeColors(): ThemeColors {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string) => styles.getPropertyValue(name).trim();
  return {
    ink: read('--ink'),
    dim: read('--dim'),
    pulse: read('--pulse'),
    data: read('--data'),
    signal: read('--signal'),
  };
}
