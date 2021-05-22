import "react-native-gesture-handler";
import React from "react";

import { UserProvider } from "./src/providers/user-context";
import JojoloApp from "./jojolo-app";

/**
 * The root app component
 * @returns
 */
export default function App() {
  return (
    <>
      <UserProvider>
        <JojoloApp />
      </UserProvider>
    </>
  );
}
