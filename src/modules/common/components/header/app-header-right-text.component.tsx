import React from "react";
import { COLORS } from "../../../../constants";
import AppTextLink from "../typography/text-link.component";

/**
 * Component for the right side text in screen headers
 *
 * @param param0
 * @returns
 */
const AppHeaderRightText = ({
  text,
  onPress = () => {},
}: {
  text: string;
  onPress: Function;
}) => {
  return (
    <AppTextLink
      style={{
        fontSize: 20,
        color: COLORS.APP_ORANGE_TEXT,
        marginRight: 20,
      }}
      onPress={onPress}
    >
      {text}
    </AppTextLink>
  );
};

export default AppHeaderRightText;
