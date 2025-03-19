import { Select } from "antd";
import React from "react";

const SelectCustom = ({ handleChange, placeholder }) => {
  return (
    <>
      <Select
        className="w-full"
        showSearch
        placeholder={placeholder}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "Yiminghe",
            label: "yiminghe",
          },
        ]}
      />
    </>
  );
};

export default SelectCustom;
