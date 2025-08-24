import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
  PRIMARY_BG,
  ERROR_RED,
  SECONDARY_TEXT,
  SUCCESS_GREEN,
  WHITE,
} from '../constants';

interface ApiErrorBoundaryProps {
  error: FetchBaseQueryError | SerializedError | undefined;
  refetch?: () => void;
  children?: React.ReactNode;
}

const ApiErrorBoundary: React.FC<ApiErrorBoundaryProps> = ({
  error,
  refetch,
  children,
}) => {
  if (!error) {
    return <>{children}</>;
  }

  const getErrorMessage = () => {
    if ('status' in error) {
      switch (error.status) {
        case 401:
          return 'Please sign in again to continue.';
        case 403:
          return "You don't have access to this content.";
        case 404:
          return "The content you're looking for isn't available right now.";
        case 500:
          return "We're experiencing some technical difficulties. Please try again in a moment.";
        case 502:
        case 503:
        case 504:
          return 'Our service is temporarily unavailable. Please try again shortly.';
        default:
          return 'Something went wrong. Please try again.';
      }
    }

    if ('message' in error) {
      return error.message || 'Something went wrong. Please try again.';
    }

    return 'Something went wrong. Please try again.';
  };

  const getErrorTitle = () => {
    if ('status' in error) {
      switch (error.status) {
        case 401:
          return 'Sign In Required';
        case 403:
          return 'Access Restricted';
        case 404:
          return 'Content Not Available';
        case 500:
        case 502:
        case 503:
        case 504:
          return 'Service Unavailable';
        default:
          return 'Oops!';
      }
    }
    return 'Connection Problem';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getErrorTitle()}</Text>
      <Text style={styles.message}>{getErrorMessage()}</Text>
      {__DEV__ && (
        <Text style={styles.errorDetails}>
          {JSON.stringify(error, null, 2)}
        </Text>
      )}
      {refetch && (
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: PRIMARY_BG,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ERROR_RED,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: SECONDARY_TEXT,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  errorDetails: {
    fontSize: 10,
    color: ERROR_RED,
    fontFamily: 'monospace',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: PRIMARY_BG,
    padding: 8,
    borderRadius: 6,
    maxHeight: 100,
  },
  retryButton: {
    backgroundColor: SUCCESS_GREEN,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryButtonText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ApiErrorBoundary;
