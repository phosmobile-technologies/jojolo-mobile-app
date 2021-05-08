import React from "react";
import { useController } from "react-hook-form";
import AppNumericInput from "./numeric-input.component";

/**
 * A numeric input controlled by react-hook-form for validation.
 *
 * @param param0
 * @returns
 */
const ControlledAppNumericInput = ({
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
    <AppNumericInput
      value={field.value}
      onChangeValue={field.onChange}
      label={label}
      error={error}
      otherProps={otherProps}
    />
  );
};

export default ControlledAppNumericInput;
