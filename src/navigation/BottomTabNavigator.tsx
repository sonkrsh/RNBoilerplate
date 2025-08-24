import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FloatingBottomNavigation from './FloatingBottomNavigation';
import { PRIMARY_BG } from '../constants';

import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import NotificationsScreen from '../screens/Notification';

const tabs = [
  { key: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { key: 'analytics', label: 'Analytics', icon: '📊' },
  { key: 'gallery', label: 'Gallery', icon: '🖼️' },
  { key: 'docs', label: 'Documents', icon: '📄' },
  { key: 'menu', label: 'Menu', icon: '☰' },
];

export default function BottomTabNavigator() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <HomeScreen />;
      case 'analytics':
        return <ProfileScreen />;
      case 'gallery':
        return <NotificationsScreen />;
      case 'docs':
        return <ProfileScreen />;
      case 'menu':
        return <NotificationsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {renderActiveScreen()}
      <FloatingBottomNavigation
        activeTab={activeTab}
        onTabPress={handleTabPress}
        tabs={tabs}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_BG,
  },
});
