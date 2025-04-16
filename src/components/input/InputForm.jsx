import { Input } from "antd";
import React from "react";

export const InputForm = ({
  type = "text",
  placeholder,
  name,
  touched,
  handleBlur,
  error,
  handleChange,
  value,
}) => {
  return (
    <>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        onBlur={handleBlur}
        onChange={handleChange}
        className="py-[10px]"
        value={value}
      />
      {touched && error ? (
        <p className="text-red-500 mt-1 text-sm">{error}</p>
      ) : null}
    </>
  );
};
