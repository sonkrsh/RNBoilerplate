import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '../Text';
import { PRIMARY_COLOR } from '../../../constants';

interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  overlay?: boolean;
  style?: ViewStyle;
}

export function Loading({
  size = 'large',
  color = PRIMARY_COLOR,
  text,
  overlay = false,
  style,
}: LoadingProps) {
  const containerStyle = [styles.container, overlay && styles.overlay, style];

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text
          variant="body"
          color="secondary"
          align="center"
          style={styles.text}
        >
          {text}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 999,
  },
  text: {
    marginTop: 12,
  },
});
