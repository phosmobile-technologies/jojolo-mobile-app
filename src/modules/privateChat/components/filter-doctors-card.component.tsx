import React from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";

import AppText from "../../common/components/typography/text.component";
import { COLORS, DOCTOR_TYPES } from "../../../constants";

const FilterDoctors = () => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <TouchableOpacity style={Styles.all}>
        <AppText style={Styles.text__all}>All</AppText>
      </TouchableOpacity>
      {DOCTOR_TYPES.map((doctor) => {
        return (
          <TouchableOpacity style={Styles.role}>
            <AppText style={Styles.text}>{doctor}</AppText>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  role: {
    padding: 10,
    marginVertical: 10,
    borderColor: COLORS.APP_PRIMARY_COLOR,
    borderWidth: 1,
    marginHorizontal: 6,
    borderRadius: 10,
  },
  all: {
    padding: 10,
    marginVertical: 10,
    borderColor: COLORS.APP_PRIMARY_COLOR,
    borderWidth: 1,
    marginHorizontal: 6,
    borderRadius: 10,
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
  },
  text: {
    color: COLORS.APP_PRIMARY_COLOR,
  },
  text__all: {
    color: COLORS.WHITE,
  },
});

export default FilterDoctors;
