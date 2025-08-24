import Toast from 'react-native-toast-message';
import {ApiError} from './axiosInstance';

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export enum NotificationPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
}

export interface NotificationConfig {
  title: string;
  message: string;
  type: NotificationType;
  duration?: number;
  position?: NotificationPosition;
  onPress?: () => void;
}

class NotificationService {
  private static instance: NotificationService;
  private errorCounts = new Map<string, number>();
  private lastErrorTime = new Map<string, number>();
  private readonly DUPLICATE_THRESHOLD = 5000; // 5 seconds
  private readonly MAX_ERRORS_PER_ENDPOINT = 3;
  private defaultPosition: NotificationPosition = NotificationPosition.BOTTOM;

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private getPositionProps(position: NotificationPosition = this.defaultPosition) {
    switch (position) {
      case NotificationPosition.TOP:
        return {
          position: 'top' as const,
          topOffset: 60,
          bottomOffset: undefined,
        };
      case NotificationPosition.BOTTOM:
        return {
          position: 'bottom' as const,
          topOffset: undefined,
          bottomOffset: 60,
        };
      default:
        return {
          position: 'bottom' as const,
          topOffset: undefined,
          bottomOffset: 60,
        };
    }
  }

  setDefaultPosition(position: NotificationPosition) {
    this.defaultPosition = position;
  }

  getDefaultPosition(): NotificationPosition {
    return this.defaultPosition;
  }

  showSuccess(title: string, message: string, duration = 3000, position?: NotificationPosition) {
    const finalPosition = position || this.defaultPosition;
    const positionProps = this.getPositionProps(finalPosition);
    
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      visibilityTime: duration,
      ...positionProps,
    });
  }

  showError(title: string, message: string, duration = 4000, position?: NotificationPosition) {
    const finalPosition = position || this.defaultPosition;
    const positionProps = this.getPositionProps(finalPosition);
    
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      visibilityTime: duration,
      ...positionProps,
    });
  }

  showInfo(title: string, message: string, duration = 3000, position?: NotificationPosition) {
    const finalPosition = position || this.defaultPosition;
    const positionProps = this.getPositionProps(finalPosition);
    
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
      visibilityTime: duration,
      ...positionProps,
    });
  }

  showCustom(config: NotificationConfig) {
    const finalPosition = config.position || this.defaultPosition;
    const positionProps = this.getPositionProps(finalPosition);
    
    Toast.show({
      type: config.type,
      text1: config.title,
      text2: config.message,
      visibilityTime: config.duration || 3000,
      ...positionProps,
      onPress: config.onPress,
    });
  }

  handleApiError(error: ApiError, endpoint?: string) {
    const now = Date.now();
    const errorKey = endpoint || 'unknown';

    // Check for duplicate errors
    const lastTime = this.lastErrorTime.get(errorKey) || 0;
    if (now - lastTime < this.DUPLICATE_THRESHOLD) {
      const count = this.errorCounts.get(errorKey) || 0;
      if (count >= this.MAX_ERRORS_PER_ENDPOINT) {
        // Don't show more notifications for this endpoint
        return;
      }
      this.errorCounts.set(errorKey, count + 1);
    } else {
      // Reset count for new error
      this.errorCounts.set(errorKey, 1);
    }

    this.lastErrorTime.set(errorKey, now);

    const title = this.getErrorTitle(error.status);
    const message = this.getErrorMessage(error);

    // Show notification based on error severity (using default position)
    if (error.status && error.status >= 500) {
      this.showError(title, message, 5000);
    } else if (error.status === 401) {
      this.showError('Authentication Required', 'Please login again', 6000);
    } else if (error.status === 403) {
      this.showError('Access Denied', 'You don\'t have permission for this action', 4000);
    } else if (error.status === 404) {
      this.showInfo('Not Found', 'The requested resource was not found', 3000);
    } else {
      this.showError(title, message, 4000);
    }
  }

  private getErrorTitle(status?: number): string {
    if (!status) return 'Network Error';
    
    if (status >= 500) return 'Server Error';
    if (status === 401) return 'Unauthorized';
    if (status === 403) return 'Forbidden';
    if (status === 404) return 'Not Found';
    if (status >= 400) return 'Request Error';
    
    return 'Error';
  }

  private getErrorMessage(error: ApiError): string {
    // Use custom message if available
    if (error.message && error.message !== 'Something went wrong') {
      return error.message;
    }

    // Generate message based on status
    if (!error.status) {
      return 'Please check your internet connection';
    }

    switch (error.status) {
      case 401:
        return 'Your session has expired';
      case 403:
        return 'You don\'t have permission to access this resource';
      case 404:
        return 'The requested resource could not be found';
      case 429:
        return 'Too many requests. Please try again later';
      case 500:
        return 'Internal server error. Our team has been notified';
      case 502:
      case 503:
      case 504:
        return 'Service temporarily unavailable. Please try again';
      default:
        if (error.status >= 500) {
          return 'Something went wrong on our end';
        }
        return error.message || 'An unexpected error occurred';
    }
  }

  // Clear error counts (useful for testing or manual reset)
  clearErrorCounts() {
    this.errorCounts.clear();
    this.lastErrorTime.clear();
  }

  hide() {
    Toast.hide();
  }
}

export default NotificationService.getInstance();