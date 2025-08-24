import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Surface } from '../components/atoms';
import { TabItem } from '../components/molecules';

interface Tab {
  key: string;
  label: string;
  icon: string;
}

interface FloatingBottomNavigationProps {
  activeTab: string;
  onTabPress: (tabKey: string) => void;
  tabs: Tab[];
}

export default function FloatingBottomNavigation({
  activeTab,
  onTabPress,
  tabs,
}: FloatingBottomNavigationProps) {
  const insets = useSafeAreaInsets();
  const animatedValue = new Animated.Value(0);

  const handleTabPress = (tabKey: string) => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    onTabPress(tabKey);
  };

  return (
    <View style={[styles.container, { bottom: insets.bottom }]}>
      <Surface
        elevation="low"
        border="thin"
        radius="lg"
        background="primary"
        padding="sm"
        style={styles.navigationBar}
      >
        {tabs.map(tab => (
          <TabItem
            key={tab.key}
            icon={tab.icon}
            label={tab.label}
            isActive={activeTab === tab.key}
            onPress={() => handleTabPress(tab.key)}
            animatedValue={animatedValue}
          />
        ))}
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
