import React from "react";
import { CustomButtonContainer } from "./custom-button.styles";

const CustomButton = ({ children, ...otherButtonProps }) => {
  return (
    <CustomButtonContainer {...otherButtonProps}>
      {children}
    </CustomButtonContainer>
  );
};

export default CustomButton;
