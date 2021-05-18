import React from "react";
import { useController } from "react-hook-form";
import { Platform } from "react-native";

import AppDropdown, { AppPickerItem } from "./dropdown-input.component";

/**
 * A dropdown input controlled by react-hook-form for validation.
 *
 * @param param0
 * @returns
 */
const ControlledAppDropdownInput = ({
  name,
  control,
  defaultValue,
  options,
  label = "",
  secureTextEntry = false,
  error = {},
  ...otherProps
}: {
  name: string;
  control: any;
  defaultValue: any;
  options: AppPickerItem[];
  label?: string;
  type?: string;
  error?: object;
  secureTextEntry?: boolean;
}) => {
  const { field } = useController({
    control,
    defaultValue,
    name,
  });
  if (Platform.OS === "android") {
    return (
      <AppDropdown
        selectedValue={field.value}
        updateSelectedValue={field.onChange}
        label={label}
        error={error}
        options={options}
        {...otherProps}
      />
    );
  } else {
    return (
      <AppDropdown
        selectedValue={field.value}
        updateSelectedValue={field.onChange}
        label={label}
        error={error}
        options={options}
        {...otherProps}
      />
    );
  }
};

export default ControlledAppDropdownInput;
