import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from '../../atoms';
import { PRIMARY_COLOR } from '../../../constants';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
}

export function ScreenHeader({ title, subtitle, icon }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      {icon && (
        <Icon
          name={icon}
          size="xl"
          color={PRIMARY_COLOR}
          style={styles.icon}
        />
      )}
      <Text
        variant="h3"
        weight="bold"
        align="center"
        color="primary">
        {title}
      </Text>
      {subtitle && (
        <Text
          variant="body"
          align="center"
          color="secondary"
          style={styles.subtitle}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  icon: {
    marginBottom: 16,
  },
  subtitle: {
    marginTop: 8,
  },
});