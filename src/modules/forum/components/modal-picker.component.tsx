import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
import AppText from "../../common/components/typography/text.component";

const OPTIONS = [
  "General",
  "BreastFeeding",
  "Teething",
  "Feeding",
  "Stooling",
  "Illness",
];

const ModalPicker = (props: any) => {
  <>
    <TouchableOpacity
      style={styles.dropDown}
      onPress={() => {
        changeModalVisibility(true);
      }}
    >
      <AppText>Select Tag</AppText>
    </TouchableOpacity>
    <Modal
      transparent={true}
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={() => {
        changeModalVisibility(false);
      }}
    ></Modal>
  </>;
};
