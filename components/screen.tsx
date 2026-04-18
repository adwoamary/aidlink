import { PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { AidLinkTheme } from '@/constants/theme';

// This wrapper keeps each screen consistent and easy to reuse.
export function Screen({ children }: PropsWithChildren) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AidLinkTheme.colors.background,
  },
});
