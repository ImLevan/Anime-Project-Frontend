import { useState } from "react";
import "../pages/Register/register.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  // eslint-disable-next-line react/prop-types
  const { label, errorMessage, onChange, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="input-contain">
      <label className="placeholder-text">
        <div className="text">{label}</div>
      </label>
      <input className="inputs-register"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        // eslint-disable-next-line react/no-unknown-property
        focused={focused.toString()}
      />
      <span className="spans">{errorMessage}</span>
    </div>
  );
};

export default FormInput;