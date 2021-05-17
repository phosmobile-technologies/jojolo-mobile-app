import React from "react";
// import { Modal, ModalContent } from "react-native-modals";
import { ConfirmDialog } from "react-native-simple-dialogs";
import { View, StyleSheet } from "react-native";
import AppText from "./typography/text.component";

interface AppModalProps {
  visible: boolean;
  setVisibility: Function;
  confirmText?: string;
  cancelText?: string;
  onPressConfirm: Function;
  title?: string;
  message?: string;
  children?: any;
}

/**
 * Modal used in the app
 * @param param0
 * @returns
 */
const AppModal = ({
  visible,
  setVisibility,
  confirmText = "CONFIRM",
  cancelText = "CANCEL",
  onPressConfirm,
  title = "",
  message = "",
  children = "",
}: AppModalProps) => {
  return (
    <ConfirmDialog
      title={title}
      message={message}
      visible={visible}
      onTouchOutside={() => setVisibility(false)}
      positiveButton={{
        title: confirmText,
        onPress: () => onPressConfirm(),
      }}
      negativeButton={{
        title: "CANCEL",
        onPress: () => setVisibility(false),
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppModal;
