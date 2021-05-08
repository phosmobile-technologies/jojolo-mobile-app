import React from "react";
import { useController } from "react-hook-form";

import AppTextInput from "./text-input.component";

/**
 * A text input controlled by react-hook-form for validation.
 *
 * @param param0
 * @returns
 */
const ControlledAppTextInput = ({
  name,
  control,
  defaultValue,
  label = "",
  type = "text",
  secureTextEntry = false,
  error = {},
  ...otherProps
}: {
  name: string;
  control: any;
  defaultValue: any;
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
  return (
    <AppTextInput
      value={field.value}
      onChangeText={field.onChange}
      label={label}
      type={type}
      secureTextEntry={secureTextEntry}
      error={error}
      {...otherProps}
    />
  );
};

export default ControlledAppTextInput;
