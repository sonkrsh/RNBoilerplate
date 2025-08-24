import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorage<T>(key: string, defaultValue: T) {
  const [storedValue, setStoredValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load value from storage on mount
  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        setLoading(true);
        setError(null);
        const item = await AsyncStorage.getItem(key);
        if (item !== null) {
          setStoredValue(JSON.parse(item));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load from storage');
        console.error(`Error loading ${key} from AsyncStorage:`, err);
      } finally {
        setLoading(false);
      }
    };

    loadStoredValue();
  }, [key]);

  // Save value to storage
  const setValue = useCallback(async (value: T) => {
    try {
      setError(null);
      setStoredValue(value);
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save to storage');
      console.error(`Error saving ${key} to AsyncStorage:`, err);
    }
  }, [key]);

  // Remove value from storage
  const removeValue = useCallback(async () => {
    try {
      setError(null);
      setStoredValue(defaultValue);
      await AsyncStorage.removeItem(key);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove from storage');
      console.error(`Error removing ${key} from AsyncStorage:`, err);
    }
  }, [key, defaultValue]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    loading,
    error,
  };
}