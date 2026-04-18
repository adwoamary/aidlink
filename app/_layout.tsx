import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { AidLinkTheme } from '@/constants/theme';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: AidLinkTheme.colors.background,
          },
          headerTintColor: AidLinkTheme.colors.text,
          headerTitleStyle: {
            fontWeight: '700',
          },
          contentStyle: {
            backgroundColor: AidLinkTheme.colors.background,
          },
        }}>
        <Stack.Screen name="index" options={{ title: 'AidLink', headerLargeTitle: true }} />
        <Stack.Screen name="resources/index" options={{ title: 'Resources' }} />
        <Stack.Screen name="resources/[id]" options={{ title: 'Resource Details' }} />
        <Stack.Screen name="request-help" options={{ title: 'Request Help' }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
