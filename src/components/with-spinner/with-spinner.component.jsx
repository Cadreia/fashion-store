import React from "react";
import {
  SpinnerContainer,
  SpinnerOverlayContainer,
} from "./with-spinner.styles";

const WithSpinner =
  (WrappedComponent) =>
  ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlayContainer>
        <SpinnerContainer />
      </SpinnerOverlayContainer>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };

export default WithSpinner;
