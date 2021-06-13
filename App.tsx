import "react-native-gesture-handler";
import React from "react";
import { LogBox } from "react-native";

import { UserProvider } from "./src/providers/user-context";
import JojoloApp from "./jojolo-app";

/**
 * The root app component
 *
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
