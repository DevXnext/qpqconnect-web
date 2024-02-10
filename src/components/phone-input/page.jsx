import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CustomPhoneInput = ({
    containerStyle,
    inputStyle,
    buttonStyle,
    dropdownStyle,
    country,
    value,
    onChange,
  }) => {
    return (
      <PhoneInput
        containerStyle={containerStyle}
        inputStyle={inputStyle}
        buttonStyle={buttonStyle}
        dropdownStyle={dropdownStyle}
        country={country}
        value={value}
        onChange={onChange}
      />
    );
  };
  
  export default CustomPhoneInput;