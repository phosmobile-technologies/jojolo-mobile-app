import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useToast } from "react-native-fast-toast";
import StepIndicator from "react-native-step-indicator";

import {
  APP_CONSTANTS,
  COLORS,
  NAVIGATION_CONSTANTS,
} from "../../../constants";
import {
  CreateCareGiverInput,
  useSignUpCareGiverMutation,
} from "../../../generated/graphql";
import { AppGraphQLClient } from "../../common/api/graphql-client";
import AppHeaderGoBackButton from "../../common/components/header/app-header-go-back-button.component";
import AppHeaderTitle from "../../common/components/header/app-header-title.component";
import Loader from "../../common/components/loader.component";
import AppModal from "../../common/components/modal.component";
import { APP_STYLES } from "../../common/styles";
import AddChildInformationForm from "../components/child-registration/add-child-information.component";
import AddChildMedicalHistoryForm from "../components/child-registration/add-child-medical-history.component";
import AddChildDataToTrackForm from "../components/child-registration/add-what-to-track.component";

/**
 * Page for adding child information during registration of a care giver
 */
const AddChildScreen = () => {
  const navigation = useNavigation() as any;
  const route = useRoute() as any;
  const toast: any = useToast();

  /**
   * Customize the navigation header components for the screen
   */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AppHeaderGoBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => <AppHeaderTitle text={"Add Child"} />,
      headerRight: () => <></>,
      headerStyle: { ...APP_STYLES.base__header__styles },
    });
  }, [navigation]);

  /**
   * State data passed to the sub components in the various tabs
   */
  const [stepperPosition, setStepperPosition] = useState(0);
  const [childInformation, setChildInformation] = useState({
    first_name: "",
    date_of_birth: undefined,
    gender: "",
  });
  const [childMedicalHistory, setChildMedicalHistory] = useState({
    birth_term: "",
    blood_group: "",
    genotype: "",
    has_allergies: false,
    has_special_needs: false,
    has_medical_conditions: false,
    allergies: [],
  });
  const [childDataToTrack, setChildDataToTrack] = useState({
    milestones: false,
    growth: false,
    immunizations: false,
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  /**
   * Using the react-hook mutation for creating care giver accounts
   */
  const { mutate, isLoading } = useSignUpCareGiverMutation(AppGraphQLClient, {
    onSuccess: () => {
      toast.show("Your account has been successfully created", {
        type: "success",
      });
      navigation.navigate(NAVIGATION_CONSTANTS.SCREENS.AUTH.SIGN_IN_SCREEN);
    },

    onError: () => {
      toast.show(
        "An error occured while creating your account. Please try again later",
        {
          type: "error",
        }
      );
    },

    onMutate: () => {
      setShowConfirmationModal(false);
    },
  });

  /**
   * Called when completing the child registration
   */
  const completeChildRegistration = () => {
    const { careGiverInfo } = route.params;
    const {
      full_name,
      role,
      email,
      password,
      phone_number,
      state,
      city,
      address,
    } = careGiverInfo;
    const { first_name, date_of_birth, gender } = childInformation;
    const {
      birth_term,
      blood_group,
      genotype,
      has_allergies,
      has_special_needs,
      has_medical_conditions,
      allergies,
    } = childMedicalHistory;
    const { milestones, growth, immunizations } = childDataToTrack;

    const careGiverRegistrationData: CreateCareGiverInput = {
      full_name,
      email,
      role,
      phone_number,
      state,
      city,
      address,
      password,
      country: "Nigeria", // @TODO update this when country dropdown is added
      child: {
        allergies,
        birth_term,
        blood_group,
        date_of_birth,
        first_name,
        gender,
        genotype,
        has_allergies,
        has_medical_conditions,
        has_special_needs,
        track_growth: growth,
        track_milestones: milestones,
        track_immunizations: immunizations,
      },
    };

    mutate({ input: careGiverRegistrationData });
  };

  return (
    <View style={styles.container}>
      <Loader loading={isLoading} />
      <AppModal
        visible={showConfirmationModal}
        setVisibility={setShowConfirmationModal}
        title={"Confirm Child Addition"}
        message={
          "You are about to add a child, please check again to make sure you put in the right information."
        }
        onPressConfirm={completeChildRegistration}
      ></AppModal>
      <StepIndicator
        customStyles={StepperStyles}
        currentPosition={stepperPosition}
        labels={stepperLabels}
        stepCount={3}
        onPress={(position) => {}}
      />

      {stepperPosition === 0 && (
        <AddChildInformationForm
          childInformation={childInformation}
          saveChildInformation={setChildInformation}
          setStepperPosition={setStepperPosition}
        />
      )}

      {stepperPosition === 1 && (
        <AddChildMedicalHistoryForm
          saveChildMedicalInformation={setChildMedicalHistory}
          setStepperPosition={setStepperPosition}
          childMedicalHistory={childMedicalHistory}
        />
      )}

      {stepperPosition === 2 && (
        <AddChildDataToTrackForm
          saveChildDataToTrack={setChildDataToTrack}
          setStepperPosition={setStepperPosition}
          childDataToTrack={childDataToTrack}
          completeChildRegistration={() => setShowConfirmationModal(true)}
        />
      )}
    </View>
  );
};

const stepperLabels = [
  "Child Information",
  "Past Medical History",
  "Select What To Track",
];

const StepperStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: COLORS.WHITE,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: COLORS.WHITE,
  stepStrokeUnFinishedColor: COLORS.WHITE,
  separatorFinishedColor: COLORS.APP_GREEN,
  separatorUnFinishedColor: COLORS.APP_GRAY_BACKGROUND,
  stepIndicatorFinishedColor: COLORS.APP_GREEN,
  stepIndicatorUnFinishedColor: COLORS.WHITE,
  stepIndicatorCurrentColor: COLORS.APP_ORANGE_TEXT,
  stepIndicatorLabelFontSize: 12,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: COLORS.WHITE,
  stepIndicatorLabelFinishedColor: COLORS.WHITE,
  stepIndicatorLabelUnFinishedColor: COLORS.APP_GRAY_TEXT,
  labelColor: COLORS.APP_GRAY_TEXT,
  labelSize: 12,
  currentStepLabelColor: COLORS.APP_ORANGE_TEXT,
};

const styles = StyleSheet.create({
  container: {
    ...APP_STYLES.base__container__styles,
    paddingTop: 30,
  },
});

export default AddChildScreen;
