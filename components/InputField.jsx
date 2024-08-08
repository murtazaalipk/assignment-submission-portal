import React from "react";

function InputField({ onChange, type, value, ...props }) {
  return <input onChange={onChange} type={type} value={value} {...props} />;
}

export default InputField;
