import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Surface } from '../../atoms';
import { LanguageSelector, ScreenHeader } from '../../molecules';

export function WelcomeSection() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Surface
      background="primary"
      padding="lg"
      style={styles.container}>
      <ScreenHeader
        title={t('hello')}
        subtitle={t('welcome')}
      />
      <LanguageSelector onLanguageChange={handleLanguageChange} />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});