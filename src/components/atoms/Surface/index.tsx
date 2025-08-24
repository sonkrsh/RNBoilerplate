import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import {
  SECONDARY_BG,
  PRIMARY_BG,
  PRIMARY_COLOR,
  TRANSPARENT,
  STROKE_SEPARATOR,
  BLACK,
} from '../../../constants';

interface SurfaceProps {
  children: React.ReactNode;
  elevation?: 'none' | 'low' | 'medium' | 'high';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  background?: 'primary' | 'secondary' | 'accent' | 'transparent';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  border?: 'none' | 'thin' | 'medium' | 'thick'; // 👈 border option
  borderColor?: string; // 👈 border color
  style?: ViewStyle;
}

export function Surface({
  children,
  elevation = 'none',
  radius = 'none',
  background = 'primary',
  padding = 'none',
  border = 'none',
  borderColor = STROKE_SEPARATOR,
  style,
}: SurfaceProps) {
  const getBackgroundStyle = () => {
    switch (background) {
      case 'primary':
        return { backgroundColor: PRIMARY_BG };
      case 'secondary':
        return { backgroundColor: SECONDARY_BG };
      case 'accent':
        return { backgroundColor: PRIMARY_COLOR };
      case 'transparent':
        return { backgroundColor: TRANSPARENT };
      default:
        return { backgroundColor: SECONDARY_BG };
    }
  };

  const getPaddingStyle = () => {
    switch (padding) {
      case 'xs':
        return styles.paddingXs;
      case 'sm':
        return styles.paddingSm;
      case 'md':
        return styles.paddingMd;
      case 'lg':
        return styles.paddingLg;
      case 'xl':
        return styles.paddingXl;
      default:
        return undefined;
    }
  };

  const getBorderStyle = () => {
    switch (border) {
      case 'thin':
        return { borderWidth: 1, borderColor };
      case 'medium':
        return { borderWidth: 2, borderColor };
      case 'thick':
        return { borderWidth: 3, borderColor };
      default:
        return {};
    }
  };

  return (
    <View
      style={[
        styles.surface,
        styles[elevation],
        styles[radius],
        getBackgroundStyle(),
        getPaddingStyle(),
        getBorderStyle(),
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    // base container style (flex, etc if needed)
  },

  // Elevation (shadows)
  none: {
    shadowOpacity: 0,
    elevation: 0,
  },
  low: {
    shadowColor: BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  high: {
    shadowColor: BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },

  // Radius
  sm: { borderRadius: 4 },
  md: { borderRadius: 8 },
  lg: { borderRadius: 12 },
  xl: { borderRadius: 20 },
  full: { borderRadius: 9999 },

  // Padding
  paddingXs: { padding: 4 },
  paddingSm: { padding: 8 },
  paddingMd: { padding: 16 },
  paddingLg: { padding: 24 },
  paddingXl: { padding: 32 },
});
