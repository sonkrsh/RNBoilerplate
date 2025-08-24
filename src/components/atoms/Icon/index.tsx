import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { SECONDARY_TEXT } from '../../../constants';

interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  style?: TextStyle;
}

export function Icon({
  name,
  size = 'md',
  color = SECONDARY_TEXT,
  style,
}: IconProps) {
  return (
    <Text
      style={[
        styles.icon,
        styles[size],
        { color },
        style,
      ]}>
      {name}
    </Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
  },
  
  // Sizes
  xs: {
    fontSize: 12,
  },
  sm: {
    fontSize: 16,
  },
  md: {
    fontSize: 20,
  },
  lg: {
    fontSize: 24,
  },
  xl: {
    fontSize: 32,
  },
});