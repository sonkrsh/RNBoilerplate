import { useState, useEffect } from 'react';
import { Keyboard, KeyboardEventListener, Platform } from 'react-native';

export function useKeyboard() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardWillShow: KeyboardEventListener = event => {
      setKeyboardHeight(event.endCoordinates.height);
      setIsKeyboardVisible(true);
    };

    const keyboardWillHide: KeyboardEventListener = () => {
      setKeyboardHeight(0);
      setIsKeyboardVisible(false);
    };

    // Use different events for iOS and Android
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(showEvent, keyboardWillShow);
    const hideSubscription = Keyboard.addListener(hideEvent, keyboardWillHide);

    return () => {
      showSubscription?.remove();
      hideSubscription?.remove();
    };
  }, []);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return {
    keyboardHeight,
    isKeyboardVisible,
    isKeyboardHidden: !isKeyboardVisible,
    dismissKeyboard,
  };
}
