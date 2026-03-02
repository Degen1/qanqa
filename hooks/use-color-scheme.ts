import { useColorScheme as useNativeColorScheme } from 'react-native';

import { useThemePreference } from '@/contexts/theme-preference-context';

export function useColorScheme(): 'light' | 'dark' {
  const systemColorScheme = useNativeColorScheme() ?? 'light';
  const { preference } = useThemePreference();

  if (preference === 'system') {
    return systemColorScheme;
  }

  return preference;
}
