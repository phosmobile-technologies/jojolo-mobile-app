import React, { useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";

import AppText from "../../common/components/typography/text.component";
import { COLORS, DOCTOR_TYPES } from "../../../constants";
import { HealthCareProfessionalRole } from "../../../generated/graphql";

/**
 * Component for filtering the list of doctors by role when getting doctors for a private chat
 *
 * @param param0
 * @returns
 */
const FilterDoctors = ({ filterDoctors }: { filterDoctors: Function }) => {
  const DOCTOR_ROLES = ["All", ...DOCTOR_TYPES];
  const [activeRole, setActiveRole] = useState("All");

  /**
   * Handle when the user clicks on a new role from the list of doctor roles to filter the doctor list by
   * @param role
   */
  const handleRoleChange = (role: HealthCareProfessionalRole) => {
    setActiveRole(role);
    filterDoctors(role);
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {DOCTOR_ROLES.map((role) => {
        return (
          <TouchableOpacity
            style={[Styles.role, role === activeRole ? Styles.activeRole : {}]}
            onPress={() => handleRoleChange(role as HealthCareProfessionalRole)}
          >
            <AppText
              style={[
                Styles.text,
                role === activeRole ? Styles.activeRoleText : {},
              ]}
            >
              {role}
            </AppText>
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
  activeRole: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    color: COLORS.WHITE,
  },
  activeRoleText: {
    color: COLORS.WHITE,
  },
  text: {
    color: COLORS.APP_PRIMARY_COLOR,
  },
});

export default FilterDoctors;
