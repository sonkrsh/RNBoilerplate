import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../../atoms';

interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void;
}

export function LanguageSelector({ onLanguageChange }: LanguageSelectorProps) {
  return (
    <View style={styles.container}>
      <Button
        title="English"
        onPress={() => onLanguageChange('en')}
        variant="outline"
        size="small"
        style={styles.button}
      />
      <Button
        title="हिंदी"
        onPress={() => onLanguageChange('hi')}
        variant="outline"
        size="small"
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    minWidth: 80,
  },
});