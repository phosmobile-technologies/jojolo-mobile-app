import React from "react";
import { useController } from "react-hook-form";

import AppDatePickerInput from "./date-picker.component";

/**
 * A date picker input controlled by react-hook-form for validation.
 *
 * @param param0
 * @returns
 */
const ControlledAppDatePickerInput = ({
  name,
  control,
  defaultValue,
  label = "",
  error = {},
  ...otherProps
}: {
  name: string;
  control: any;
  defaultValue: any;
  label?: string;
  error?: object;
}) => {
  const { field } = useController({
    control,
    defaultValue,
    name,
  });
  return (
    <AppDatePickerInput
      date={field.value}
      setDate={field.onChange}
      label={label}
      error={error}
      {...otherProps}
    />
  );
};

export default ControlledAppDatePickerInput;
