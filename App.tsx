import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { ToastProvider, useToast } from "react-native-fast-toast";
import * as SecureStore from "expo-secure-store";
import {
  useFonts,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import AppNavigator from "./src/navigation/app-navigator";
import { AuthenticationContext } from "./src/contexts/authentication.context";
import { queryClient } from "./src/contexts/query-client.context";
import { LoginInput, useLoginMutation } from "./src/generated/graphql";
import { AppGraphQLClient } from "./src/modules/common/api/graphql-client";
import { AuthenticationStack } from "./src/navigation/authentication-stack.navigator";

/**
 * The root app component
 * @returns
 */
export default function App({ navigation }: { navigation: any }) {
  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_900Black,
  });
  const toast: any = useToast();

  // Reducer for auth state
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (access_token: string) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        authContext.dispatch({ type: "SIGN_IN", token: access_token });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      dispatch,
    }),
    []
  );

  // @TODO this was commented out because it was causing the "Rendered different number of hooks error".
  // See https://stackoverflow.com/questions/55622768/uncaught-invariant-violation-rendered-more-hooks-than-during-the-previous-rende
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  let PagesToShow = <></>;

  if (state.userToken === null) {
    PagesToShow = <AuthenticationStack />;
  } else {
    PagesToShow = <AppNavigator />;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthenticationContext.Provider value={authContext}>
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
        </AuthenticationContext.Provider>
      </QueryClientProvider>
    </>
  );
}
