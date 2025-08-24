import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Surface, Text } from '../../atoms';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  elevation?: 'none' | 'low' | 'medium' | 'high';
  style?: ViewStyle;
}

export function Card({
  title,
  children,
  elevation = 'low',
  style,
}: CardProps) {
  return (
    <Surface
      elevation={elevation}
      radius="md"
      background="primary"
      padding="md"
      style={[styles.card, style]}>
      {title && (
        <Text
          variant="h4"
          weight="semibold"
          color="primary"
          style={styles.title}>
          {title}
        </Text>
      )}
      {children}
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
  },
  title: {
    marginBottom: 12,
  },
});