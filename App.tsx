import "react-native-gesture-handler";
import React from "react";

import { UserProvider } from "./src/providers/user-context";
import JojoloApp from "./jojolo-app";
import { LogBox } from "react-native";

/**
 * The root app component
 * @returns
 */
export default function App() {
  LogBox.ignoreAllLogs(true);
  return (
    <>
      <UserProvider>
        <JojoloApp />
      </UserProvider>
    </>
  );
}
