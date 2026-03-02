import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

import { useThemePreference } from '@/contexts/theme-preference-context';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const systemColorScheme = useRNColorScheme() ?? 'light';
  const { preference } = useThemePreference();

  if (!hasHydrated) {
    return 'light';
  }

  if (preference === 'system') {
    return systemColorScheme;
  }

  return preference;
}
