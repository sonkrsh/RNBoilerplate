import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BottomTabNavigator from './BottomTabNavigator';
import { CRUDDemoScreen, SettingsScreen } from '../screens';
import { PRIMARY_COLOR, SECONDARY_TEXT, SECONDARY_BG } from '../constants';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: PRIMARY_COLOR,
        drawerInactiveTintColor: SECONDARY_TEXT,
        headerTintColor: PRIMARY_COLOR,
        drawerStyle: {
          backgroundColor: SECONDARY_BG,
          width: 280,
        },
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -10,
        },
      }}
    >
      <Drawer.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{
          title: 'Home',
        }}
      />
      <Drawer.Screen 
        name="CRUDDemo" 
        component={CRUDDemoScreen}
        options={{
          title: 'CRUD Demo',
        }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
