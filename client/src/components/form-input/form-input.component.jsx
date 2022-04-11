import React from "react";
import { FormInputContainer, FormInputLabelContainer, GroupContainer } from "./form-input.styles";

const FormInput = ({ handleChange, label, ...otherInputProps }) => {
  return (
    <GroupContainer>
      <FormInputContainer onChange={handleChange} {...otherInputProps} />
      <FormInputLabelContainer className={`${otherInputProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</FormInputLabelContainer>
    </GroupContainer>
  );
};

export default FormInput;
