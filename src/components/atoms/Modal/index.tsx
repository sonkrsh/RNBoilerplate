import React from 'react';
import {
  Modal as RNModal,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ModalProps as RNModalProps,
  ViewStyle,
} from 'react-native';
import { Text } from '../';
import { SECONDARY_BG, BLACK, STROKE_SEPARATOR } from '../../../constants';

interface ModalProps extends Omit<RNModalProps, 'children'> {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  containerStyle?: ViewStyle;
  dismissOnOverlayPress?: boolean;
}

export function Modal({
  children,
  title,
  subtitle,
  showCloseButton = true,
  onClose,
  size = 'medium',
  containerStyle,
  dismissOnOverlayPress = true,
  visible,
  ...props
}: ModalProps) {
  const handleOverlayPress = () => {
    if (dismissOnOverlayPress && onClose) {
      onClose();
    }
  };

  const getModalStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallModal;
      case 'medium':
        return styles.mediumModal;
      case 'large':
        return styles.largeModal;
      case 'fullscreen':
        return styles.fullscreenModal;
      default:
        return styles.mediumModal;
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent={size !== 'fullscreen'}
      animationType="slide"
      {...props}
    >
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.modal, getModalStyle(), containerStyle]}>
              {/* Header */}
              {(title || showCloseButton) && (
                <View style={styles.header}>
                  <View style={styles.headerContent}>
                    {title && (
                      <Text variant="h4" weight="semibold" color="primary">
                        {title}
                      </Text>
                    )}
                    {subtitle && (
                      <Text
                        variant="body"
                        color="secondary"
                        style={styles.subtitle}
                      >
                        {subtitle}
                      </Text>
                    )}
                  </View>
                  {showCloseButton && onClose && (
                    <TouchableOpacity
                      onPress={onClose}
                      style={styles.closeButton}
                    >
                      <Text variant="h3" color="secondary">
                        ×
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* Content */}
              <View style={styles.content}>{children}</View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: SECONDARY_BG,
    borderRadius: 12,
    maxHeight: '90%',
    maxWidth: '100%',
    shadowColor: BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  smallModal: {
    width: '80%',
    minHeight: 200,
  },
  mediumModal: {
    width: '90%',
    minHeight: 300,
  },
  largeModal: {
    width: '95%',
    minHeight: 400,
  },
  fullscreenModal: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    margin: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: STROKE_SEPARATOR,
  },
  headerContent: {
    flex: 1,
    marginRight: 12,
  },
  subtitle: {
    marginTop: 4,
  },
  closeButton: {
    padding: 4,
    marginTop: -4,
  },
  content: {
    padding: 20,
  },
});
