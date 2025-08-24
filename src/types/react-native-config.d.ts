declare module 'react-native-config' {
  export interface NativeConfig {
    API_BASE_URL?: string;
    APP_ENV?: string;
    DEBUG?: string;
    TIMEOUT?: string;
    RETRY_ATTEMPTS?: string;
    APP_NAME?: string;
    LOG_LEVEL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}