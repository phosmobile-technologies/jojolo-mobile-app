import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import DoctorsListCardItem from "../components/doctors-list-card.component";
import FilterDoctors from "../components/filter-doctors.component";
import { HealthCareProfessionalRole } from "../../../generated/graphql";

/**
 * The Main Private Chat screen which shows all the various private chat related functionality
 *
 * @returns
 */
const GetDoctorsForChatScreen = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      profile_image: "https://i.pravatar.cc/200",
      full_name: "Doctor Raji Mike",
      role: HealthCareProfessionalRole.Dermatologist,
      rating: 4,
      points: 5,
    },
    {
      id: 2,
      profile_image: "https://i.pravatar.cc/200",
      full_name: "Doctor Raji Mike",
      role: HealthCareProfessionalRole.Dentist,
      rating: 4,
      points: 5,
    },
    {
      id: 3,
      profile_image: "https://i.pravatar.cc/200",
      full_name: "Doctor Raji Mike",
      role: HealthCareProfessionalRole.Dentist,
      rating: 4,
      points: 5,
    },
    {
      id: 4,
      profile_image: "https://i.pravatar.cc/200",
      full_name: "Doctor Raji Mike",
      role: HealthCareProfessionalRole.GeneralPractitioner,
      rating: 4,
      points: 5,
    },
    {
      id: 5,
      profile_image: "https://i.pravatar.cc/200",
      full_name: "Doctor Raji Mike",
      role: HealthCareProfessionalRole.GeneralPractitioner,
      rating: 4,
      points: 5,
    },
    {
      id: 6,
      profile_image: "https://i.pravatar.cc/200",
      full_name: "Doctor Raji Mike",
      role: HealthCareProfessionalRole.Pedeatrician,
      rating: 4,
      points: 5,
    },
    {
      id: 7,
      profile_image: "https://i.pravatar.cc/200",
      full_name: "Doctor Raji Mike",
      role: HealthCareProfessionalRole.Pedeatrician,
      rating: 4,
      points: 5,
    },
    {
      id: 8,
      profile_image: "https://i.pravatar.cc/200",
      full_name: "Doctor Raji Mike",
      role: HealthCareProfessionalRole.Pedeatrician,
      rating: 4,
      points: 5,
    },
    {
      id: 9,
      profile_image: "https://i.pravatar.cc/200",
      full_name: "Doctor Raji Mike",
      role: HealthCareProfessionalRole.Dentist,
      rating: 4,
      points: 5,
    },
    {
      id: 10,
      profile_image: "https://i.pravatar.cc/200",
      full_name: "Doctor Raji Mike",
      role: HealthCareProfessionalRole.GeneralPractitioner,
      rating: 4,
      points: 5,
    },
  ]);

  const filterDoctors = (role: any) => {
    console.log(role);
  };

  return (
    <ScrollView>
      <View>
        <FilterDoctors filterDoctors={filterDoctors} />
      </View>
      <View style={styles.container}>
        {doctors.map((doctor) => {
          return (
            <View>
              <DoctorsListCardItem doctor={doctor} />
            </View>
          );
        })}
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

export default GetDoctorsForChatScreen;
