import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";

export type UserProviderState = {
  authToken: string | null;
  authenticatedUser: object | null;
  signIn: Function;
  signOut: Function;
  restoreUser: Function;
};

const UserContext =
  React.createContext<UserProviderState | undefined>(undefined);
/**
 * The user provider which provides data about the authenticated user
 *
 * @param param0
 * @returns
 */
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authenticatedUser, setAuthenticatedUser] =
    useState<object | null>(null);

  // Signin the user by setting the global user and auth_token. Also save the user and auth_token in secure storage
  const signIn = async (authToken: string, user: object) => {
    setAuthToken(authToken);
    setAuthenticatedUser(user);
    await SecureStore.setItemAsync(
      "jojolo_user_context_state",
      JSON.stringify({ authToken, user })
    );
  };

  const signOut = async () => {
    setAuthToken(null);
    setAuthenticatedUser(null);
    await SecureStore.setItemAsync(
      "jojolo_user_context_state",
      JSON.stringify({ authToken: null, user: null })
    );
  };

  // Check secure storage to see if a user and auth_token are already saved, if so set the APP to use them
  const restoreUser = async () => {
    try {
      const userInfo = await SecureStore.getItemAsync(
        "jojolo_user_context_state"
      );

      if (userInfo) {
        const { authToken, user } = JSON.parse(userInfo);
        signIn(authToken, user);
      } else {
        signOut();
      }
    } catch (e) {
      signOut();
    }
  };

  const value = {
    authToken,
    setAuthToken,
    authenticatedUser,
    setAuthenticatedUser,
    restoreUser,
    signIn,
    signOut,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/**
 * Custom hook which can be used to get the authenticated user in any screen / component
 * @returns
 */
export const useAuthenticatedUser = () => {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error("useAuthenticatedUser must be used within a UserProvider");
  }

  return context;
};
