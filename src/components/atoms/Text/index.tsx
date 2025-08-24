import React from 'react';
import {
  Text as RNText,
  StyleSheet,
  TextStyle,
  TextProps as RNTextProps, // 👈 import RN props
} from 'react-native';
import {
  PRIMARY_TEXT,
  SECONDARY_TEXT,
  PRIMARY_COLOR,
  ERROR_RED,
  SUCCESS_GREEN,
  WARNING_AMBER,
} from '../../../constants';

interface TextProps extends RNTextProps {
  // 👈 extend RN props
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'accent' | 'error' | 'success' | 'warning';
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  style?: TextStyle;
}

export function Text({
  children,
  variant = 'body',
  color = 'primary',
  align = 'left',
  weight = 'normal',
  style,
  ...rest // 👈 spread extra props
}: TextProps) {
  const getColorStyle = () => {
    switch (color) {
      case 'primary':
        return { color: PRIMARY_TEXT };
      case 'secondary':
        return { color: SECONDARY_TEXT };
      case 'accent':
        return { color: PRIMARY_COLOR };
      case 'error':
        return { color: ERROR_RED };
      case 'success':
        return { color: SUCCESS_GREEN };
      case 'warning':
        return { color: WARNING_AMBER };
      default:
        return { color: PRIMARY_TEXT };
    }
  };

  return (
    <RNText
      style={[
        styles.base,
        styles[variant],
        getColorStyle(),
        styles[align],
        styles[weight],
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System',
  },

  // Variants
  h1: { fontSize: 32, lineHeight: 40 },
  h2: { fontSize: 28, lineHeight: 36 },
  h3: { fontSize: 24, lineHeight: 32 },
  h4: { fontSize: 20, lineHeight: 28 },
  body: { fontSize: 16, lineHeight: 24 },
  caption: { fontSize: 14, lineHeight: 20 },
  label: { fontSize: 12, lineHeight: 16 },

  // Alignment
  left: { textAlign: 'left' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },

  // Weight
  normal: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  semibold: { fontWeight: '600' },
  bold: { fontWeight: '700' },
});
