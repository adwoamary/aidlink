/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

import { ResourceCategory } from '@/types/resource';

const tintColorLight = '#2f7d6d';
const tintColorDark = '#fff';

export const AidLinkTheme = {
  colors: {
    background: '#f6f1e8',
    backgroundMuted: '#fbf8f2',
    surface: '#fffdfa',
    surfaceStrong: '#ffffff',
    border: '#ded2c0',
    borderSoft: '#ebe2d6',
    text: '#20313d',
    textMuted: '#5b6975',
    textSoft: '#7b8793',
    headingOnDark: '#fffaf5',
    textOnDark: '#e7dfd3',
    primary: '#1f4f59',
    secondary: '#c56f4d',
    accent: '#2f7d6d',
    success: '#1f6a4e',
    successSoft: '#e2f3ea',
    info: '#305f80',
    infoSoft: '#e5eef6',
    danger: '#ba4d47',
    dangerSoft: '#f9e3e0',
  },
  spacing: {
    screen: 20,
    card: 20,
    cardLarge: 24,
  },
  radius: {
    chip: 999,
    input: 16,
    card: 24,
    hero: 28,
  },
};

export const CategoryColors: Record<
  ResourceCategory,
  {
    fill: string;
    text: string;
  }
> = {
  Food: {
    fill: '#f7e3d8',
    text: '#9d5438',
  },
  Shelter: {
    fill: '#e3ecef',
    text: '#335767',
  },
  Medical: {
    fill: '#e1f1ec',
    text: '#256554',
  },
  Jobs: {
    fill: '#efe4f3',
    text: '#6c4d7c',
  },
  'Financial Help': {
    fill: '#f6ebce',
    text: '#8c6b19',
  },
};

export const Colors = {
  light: {
    text: AidLinkTheme.colors.text,
    background: AidLinkTheme.colors.background,
    tint: tintColorLight,
    icon: AidLinkTheme.colors.textSoft,
    tabIconDefault: AidLinkTheme.colors.textSoft,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
