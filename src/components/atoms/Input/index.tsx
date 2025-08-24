import React, { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { Text, Icon } from '../';
import { TouchableOpacity } from 'react-native';
import {
  PRIMARY_COLOR,
  SECONDARY_TEXT,
  STROKE_SEPARATOR,
  ERROR_RED,
  PRIMARY_BG,
} from '../../../constants';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

export function Input({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  variant = 'outlined',
  size = 'md',
  style,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [styles.container, styles[size]];

    if (variant === 'filled') {
      baseStyle.push(styles.filled);
    } else {
      baseStyle.push(styles.outlined);
    }

    if (isFocused) {
      baseStyle.push(styles.focused);
    }

    if (error) {
      baseStyle.push(styles.error);
    }

    return baseStyle;
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Text
          variant="label"
          color={error ? 'error' : 'secondary'}
          style={styles.label}
        >
          {label}
        </Text>
      )}

      <View style={getContainerStyle()}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            size="sm"
            color={isFocused ? PRIMARY_COLOR : SECONDARY_TEXT}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={SECONDARY_TEXT}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon &&
          (onRightIconPress ? (
            <TouchableOpacity onPress={onRightIconPress}>
              <Icon
                name={rightIcon}
                size="sm"
                color={SECONDARY_TEXT}
                style={styles.rightIcon}
              />
            </TouchableOpacity>
          ) : (
            <Icon
              name={rightIcon}
              size="sm"
              color={SECONDARY_TEXT}
              style={styles.rightIcon}
            />
          ))}
      </View>

      {(error || helper) && (
        <Text
          variant="caption"
          color={error ? 'error' : 'secondary'}
          style={styles.helperText}
        >
          {error || helper}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    marginLeft: 4,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderColor: STROKE_SEPARATOR,
  },
  filled: {
    backgroundColor: PRIMARY_BG,
    borderColor: 'transparent',
  },
  focused: {
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
  },
  error: {
    borderColor: ERROR_RED,
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  lg: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 52,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: PRIMARY_COLOR,
    padding: 0, // Remove default padding
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  helperText: {
    marginTop: 4,
    marginLeft: 4,
  },
});
