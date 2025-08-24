import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { PRIMARY_COLOR, SECONDARY_TEXT, WHITE, STROKE_SEPARATOR, TRANSPARENT } from '../../../constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}>
      <Text
        style={[
          styles.text,
          styles[`${variant}Text`],
          styles[`${size}Text`],
          disabled && styles.disabledText,
          textStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Variants
  primary: {
    backgroundColor: PRIMARY_COLOR,
  },
  secondary: {
    backgroundColor: SECONDARY_TEXT,
  },
  outline: {
    backgroundColor: TRANSPARENT,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  
  // Sizes
  small: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  large: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  
  // States
  disabled: {
    backgroundColor: STROKE_SEPARATOR,
    borderColor: STROKE_SEPARATOR,
  },
  
  // Text styles
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: WHITE,
  },
  secondaryText: {
    color: WHITE,
  },
  outlineText: {
    color: PRIMARY_COLOR,
  },
  
  // Text sizes
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  
  disabledText: {
    color: SECONDARY_TEXT,
  },
});