import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isOnboarded: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  isOfflineMode: boolean;
  lastSync: string | null;
  notifications: {
    enabled: boolean;
    pushEnabled: boolean;
    emailEnabled: boolean;
  };
  settings: {
    autoLock: boolean;
    biometricsEnabled: boolean;
    analyticsEnabled: boolean;
  };
  connectivity: {
    isConnected: boolean;
    connectionType: string;
  };
}

const initialState: AppState = {
  isOnboarded: false,
  theme: 'system',
  language: 'en',
  isOfflineMode: false,
  lastSync: null,
  notifications: {
    enabled: true,
    pushEnabled: true,
    emailEnabled: true,
  },
  settings: {
    autoLock: false,
    biometricsEnabled: false,
    analyticsEnabled: true,
  },
  connectivity: {
    isConnected: true,
    connectionType: 'unknown',
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Onboarding
    setOnboarded: (state, action: PayloadAction<boolean>) => {
      state.isOnboarded = action.payload;
    },

    // Theme
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },

    // Language
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },

    // Offline mode
    setOfflineMode: (state, action: PayloadAction<boolean>) => {
      state.isOfflineMode = action.payload;
    },

    // Sync
    updateLastSync: (state) => {
      state.lastSync = new Date().toISOString();
    },

    // Connectivity
    updateConnectivity: (state, action: PayloadAction<{ isConnected: boolean; connectionType: string }>) => {
      state.connectivity = action.payload;
    },

    // Notifications
    updateNotificationSettings: (state, action: PayloadAction<Partial<AppState['notifications']>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },

    // Settings
    updateAppSettings: (state, action: PayloadAction<Partial<AppState['settings']>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },

    // Reset app state
    resetAppState: () => initialState,
  },
});

export const {
  setOnboarded,
  setTheme,
  setLanguage,
  setOfflineMode,
  updateLastSync,
  updateConnectivity,
  updateNotificationSettings,
  updateAppSettings,
  resetAppState,
} = appSlice.actions;

export default appSlice.reducer;

// Selectors
export const selectApp = (state: { app: AppState }) => state.app;
export const selectIsOnboarded = (state: { app: AppState }) => state.app.isOnboarded;
export const selectTheme = (state: { app: AppState }) => state.app.theme;
export const selectLanguage = (state: { app: AppState }) => state.app.language;
export const selectIsOfflineMode = (state: { app: AppState }) => state.app.isOfflineMode;
export const selectConnectivity = (state: { app: AppState }) => state.app.connectivity;
export const selectNotificationSettings = (state: { app: AppState }) => state.app.notifications;
export const selectAppSettings = (state: { app: AppState }) => state.app.settings;