import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar, useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { store } from './store';
import { ErrorBoundary } from './utilities';
import AppNavigator from './navigation/AppNavigator';

import './i18n/i18n';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppNavigator />

          <SafeAreaView edges={['bottom']}>
            <Toast />
          </SafeAreaView>
        </ErrorBoundary>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;