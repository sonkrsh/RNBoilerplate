import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Icon, Text } from '../../atoms';
import { PRIMARY_COLOR, SECONDARY_TEXT, WHITE } from '../../../constants';

interface TabItemProps {
  icon: string;
  label: string;
  isActive: boolean;
  onPress: () => void;
  animatedValue: Animated.Value;
}

export function TabItem({
  icon,
  label,
  isActive,
  onPress,
  animatedValue,
}: TabItemProps) {
  const animatedScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        isActive && styles.activeContainer,
        { transform: [{ scale: animatedScale }] },
      ]}
    >
      <TouchableOpacity
        style={[styles.tab, isActive && styles.activeTab]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Icon
          name={icon}
          size="md"
          color={isActive ? WHITE : SECONDARY_TEXT}
          style={isActive ? styles.activeIcon : undefined}
        />
        {isActive && (
          <Text
            variant="label"
            color={isActive ? 'primary' : 'secondary'}
            weight="semibold"
            style={styles.label}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  activeContainer: {
    flex: 1.5,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    minHeight: 40,
  },
  activeTab: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 16,
  },
  activeIcon: {
    marginRight: 6,
    color: WHITE,
  },
  label: {
    color: WHITE,
    fontSize: 13,
  },
});
