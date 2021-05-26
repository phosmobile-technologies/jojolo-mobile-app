import "react-native-gesture-handler";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { ToastProvider } from "react-native-fast-toast";
import {
  useFonts,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";
import { QueryClientProvider } from "react-query";

import AppNavigator from "./src/navigation/app-navigator";
import { queryClient } from "./src/providers/query-client.context";
import { AuthenticationStack } from "./src/navigation/authentication-stack.navigator";
import { useAuthenticatedUser } from "./src/providers/user-context";

/**
 * The root jojolo app component
 * @returns
 */
export default function JojoloApp() {
  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_900Black,
  });
  const { authToken, restoreUser } = useAuthenticatedUser();

  React.useEffect(() => {
    restoreUser();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  let PagesToShow = <></>;

  if (authToken === null) {
    PagesToShow = <AuthenticationStack />;
  } else {
    PagesToShow = <AppNavigator />;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastProvider placement="top">
          <ActionSheetProvider>
            <SafeAreaProvider>
              <NavigationContainer>
                {PagesToShow}
                <StatusBar style="auto" />
              </NavigationContainer>
            </SafeAreaProvider>
          </ActionSheetProvider>
        </ToastProvider>
      </QueryClientProvider>
    </>
  );
}
