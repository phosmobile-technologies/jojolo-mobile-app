import React from "react";
import * as SecureStore from "expo-secure-store";

import { useAuthenticatedUser, UserProviderState } from "./user-context";

type AuthProviderProps = { children: React.ReactNode };

/**
 * Definition of the functions that call the user provider to signin/signout/restore a user
 */
const authContext = (userContext: any) => {
  const signIn = async (data: UserProviderState) => {
    // In a production app, we need to send some data (usually username, password) to server and get a token
    // We will also need to handle errors if sign in failed
    // After getting token, we need to persist the token using `SecureStore`
    // In the example, we'll use a dummy token
    userContext.dispatch({
      type: "SET_AUTH_TOKEN",
      payload: data.auth_token,
    });
    userContext.dispatch({ type: "SET_USER", payload: data.user });
  };

  const signOut = () => {
    userContext.dispatch({
      type: "SET_AUTH_TOKEN",
      payload: null,
    });
    userContext.dispatch({ type: "SET_USER", payload: null });
  };

  const restoreUser = async () => {
    try {
      const { auth_token, user }: UserProviderState =
        await SecureStore.getItemAsync("@jojolo_user_context_state");
      signIn({ auth_token, user });
    } catch (e) {
      signOut();
    }
  };

  return {
    signIn,
    signOut,
    restoreUser,
  };
};

const AuthenticationContext = React.createContext(authContext);

/**
 * The authentication provider which provides functions to sign-in, sign-out and restore a user.
 * These functions interact with the user provider to set / remove the authenticated user's info from secure storage
 *
 * @param param0
 * @returns
 */
export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userContext = useAuthenticatedUser();

  return (
    <AuthenticationContext.Provider value={() => authContext(userContext)}>
      {children}
    </AuthenticationContext.Provider>
  );
};

/**
 * Custom hook which can be used to get the authentication context functions in any screen / component
 * @returns
 */
export const useAuthenticationContext = () => {
  const context = React.useContext(AuthenticationContext);

  if (context === undefined) {
    throw new Error(
      "useAuthenticationContext must be used within an AuthenticationProvider"
    );
  }

  return context;
};
