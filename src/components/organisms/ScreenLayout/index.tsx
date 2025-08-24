import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface } from '../../atoms';
import { ScreenHeader } from '../../molecules';

interface ScreenLayoutProps {
  title: string;
  subtitle?: string;
  icon?: string;
  children?: React.ReactNode;
}

export function ScreenLayout({
  title,
  subtitle,
  icon,
  children,
}: ScreenLayoutProps) {
  return (
    <Surface
      background="secondary"
      style={styles.container}>
      <ScreenHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
      />
      {children}
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});