import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DoctorsListCardItem from "../components/doctors-list-card.component";

/**
 * The Main Private Chat screen which shows all the various private chat related functionality
 *
 * @returns
 */
const GetDoctorForChatScreen = () => {
  const doctorsList = Array(20).fill(0);

  return (
    <ScrollView>
      <View style={styles.container}>
        {doctorsList.map((doctor) => (
          <DoctorsListCardItem />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30,
  },
});

export default GetDoctorForChatScreen;
