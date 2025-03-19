import { Input } from "antd";
import React from "react";

export const InputForm = ({
  type = "text",
  placeholder,
  touched,
  error,
  handleChange,
}) => {
  return (
    <>
      <Input
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        className="py-[10px]"
      />
      {touched && error ? (
        <p className="text-red-500 mt-1 text-sm">{error}</p>
      ) : null}
    </>
  );
};
