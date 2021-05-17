import React from "react";
import { useController } from "react-hook-form";

import AppRadioButtonInput from "./radio-button-input.component";

/**
 * A radio button input controlled by react-hook-form for validation.
 *
 * @param param0
 * @returns
 */
const ControlledAppRadioButtonInput = ({
  name,
  control,
  defaultValue,
  options,
  label = "",
  error = {},
  ...otherProps
}: {
  name: string;
  control: any;
  defaultValue: any;
  options: Array<{ label: string; value: string }>;
  label?: string;
  error?: object;
}) => {
  const { field } = useController({
    control,
    defaultValue,
    name,
  });
  return (
    <AppRadioButtonInput
      value={field.value}
      setValue={field.onChange}
      options={options}
      label={label}
      error={error}
      {...otherProps}
    />
  );
};

export default ControlledAppRadioButtonInput;
