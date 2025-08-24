import Config from 'react-native-config';

export interface AppConfig {
  API_BASE_URL: string;
  APP_ENV: string;
  DEBUG: boolean;
  TIMEOUT: number;
  RETRY_ATTEMPTS: number;
  APP_NAME: string;
  LOG_LEVEL: string;
}

const config: AppConfig = {
  API_BASE_URL: Config.API_BASE_URL || 'https://dev-api.yourapp.com',
  APP_ENV: Config.APP_ENV || 'development',
  DEBUG: Config.DEBUG === 'true',
  TIMEOUT: parseInt(Config.TIMEOUT || '30000', 10),
  RETRY_ATTEMPTS: parseInt(Config.RETRY_ATTEMPTS || '3', 10),
  APP_NAME: Config.APP_NAME || 'RNBoilerplate',
  LOG_LEVEL: Config.LOG_LEVEL || 'debug',
};

export { config };
export default config;