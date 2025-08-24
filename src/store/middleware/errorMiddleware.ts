import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import notificationService from '../../services/notificationService';
import { ApiError } from '../../services/axiosInstance';

// Type guard to check if error is FetchBaseQueryError
const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
  return error && typeof error.status === 'number';
};

// Convert RTK Query error to ApiError format
const convertRtkQueryError = (error: any): ApiError => {
  if (isFetchBaseQueryError(error)) {
    return {
      message:
        (error.data as { message?: string })?.message || 'An error occurred',
      status: typeof error.status === 'number' ? error.status : undefined,
      data: error.data,
    };
  }

  // Handle SerializedError
  if (error && typeof error === 'object' && 'message' in error) {
    return {
      message: error.message || 'Network error occurred',
      status: undefined,
      data: error,
    };
  }

  return {
    message: 'An unexpected error occurred',
    status: undefined,
    data: error,
  };
};

export const rtkQueryErrorMiddleware: Middleware = () => next => action => {
  // Check if this is a rejected action from RTK Query
  if (isRejectedWithValue(action)) {
    const error = convertRtkQueryError(action.payload);

    // Extract endpoint name from action type
    const actionType = action.type;
    const endpointMatch = actionType.match(/^api\/(.+)\/rejected$/);
    const endpoint = endpointMatch ? endpointMatch[1] : 'unknown';

    // Show global notification
    notificationService.handleApiError(error, endpoint);

    // Log error in development
    if (__DEV__) {
      console.warn('RTK Query Error:', {
        endpoint,
        error: action.payload,
        action: actionType,
      });
    }
  }

  return next(action);
};
