import React from "react";
import AppText from "../typography/text.component";

/**
 * Component used to style the header title
 *
 * @param param0
 * @returns
 */
const AppHeaderTitle = ({ text }: { text: string }) => {
  return (
    <AppText
      style={{
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "700",
      }}
    >
      Add Child
    </AppText>
  );
};

export default AppHeaderTitle;
