import React, { useEffect, useState } from "react";
import { InputForm } from "../../components/input/InputForm";
import { addressServices } from "../../services/address.services";
import { Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import * as yup from "yup";
import jwtDecode from "jwt-decode";
import { usersServices } from "../../services/users.services";

const FormCheckout = ({ onSubmitForm }) => {
  const [tinhThanh, setTinhThanh] = useState([]);
  const [huyen, setHuyen] = useState([]);
  const [xa, setXa] = useState([]);

  const [selectedTinh, setSelectedTinh] = useState(null);
  const [selectedHuyen, setSelectedHuyen] = useState(null);
  const [user, setUser] = useState("");

  const userData = JSON.parse(localStorage.getItem("userData"));
  const userInfo = jwtDecode(userData.accessToken);

  useEffect(() => {
    addressServices
      .getAllTinhThanh()
      .then((res) => {
        setTinhThanh(res.data.data);
      })
      .catch((err) => console.log(err));

    usersServices
      .getUserById(userInfo.userId)
      .then((res) => {
        console.log(res.data.metaData);
        setUser(res.data.metaData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const {
    handleBlur,
    handleSubmit,
    handleChange,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      hoTen: "",
      soDienThoai: "",
      diaChi: "",
      tinhThanh: null,
      quanHuyen: null,
      phuongXa: null,
      ghiChu: "",
    },
    onSubmit: (values) => {
      onSubmitForm(values);
    },
    validationSchema: yup.object({
      hoTen: yup.string().required("Vui lòng nhập họ tên"),
      soDienThoai: yup
        .string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
      diaChi: yup.string().required("Vui lòng nhập địa chỉ"),
      tinhThanh: yup.string().required("Vui lòng chọn tỉnh thành"),
      quanHuyen: yup.string().required("Vui lòng chọn quận huyện"),
      phuongXa: yup.string().required("Vui lòng chọn phường xã"),
    }),
  });

  return (
    <form className="col-span-6 space-y-3" onSubmit={handleSubmit}>
      <h2 className="font-medium text-lg">Thông tin nhận hàng</h2>
      <InputForm
        placeholder="Họ và tên"
        name="hoTen"
        handleBlur={handleBlur}
        handleChange={handleChange}
        value={user.userName}
        error={errors.hoTen}
        touched={touched.hoTen}
      />
      <InputForm
        placeholder="Số điện thoại"
        name="soDienThoai"
        handleBlur={handleBlur}
        handleChange={handleChange}
        value={user.phone}
        error={errors.soDienThoai}
        touched={touched.soDienThoai}
      />

      <InputForm
        placeholder="Địa chỉ"
        name="diaChi"
        handleBlur={handleBlur}
        handleChange={handleChange}
        value={values.diaChi}
        error={errors.diaChi}
        touched={touched.diaChi}
      />

      <Select
        className="w-full"
        showSearch
        name="tinhThanh"
        placeholder="Tỉnh thành"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        onChange={(value, option) => {
          setSelectedTinh(option.id);
          setHuyen([]);
          setXa([]);
          setSelectedHuyen(null);
          setFieldValue("tinhThanh", value);

          addressServices
            .getDataHuyen(option.id)
            .then((res) => setHuyen(res.data.data))
            .catch((err) => console.log(err));
        }}
        value={values.tinhThanh}
        options={tinhThanh.map((item) => ({
          value: item.name,
          label: item.full_name,
          id: item.id,
        }))}
      />
      {errors.tinhThanh && touched.tinhThanh && (
        <p className="text-red-500 text-sm mt-1">{errors.tinhThanh}</p>
      )}

      <Select
        className="w-full"
        showSearch
        name="quanHuyen"
        placeholder="Quận huyện"
        disabled={!selectedTinh}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        onChange={(value, option) => {
          setSelectedHuyen(option.id);
          setXa([]);
          setFieldValue("quanHuyen", value);

          addressServices
            .getdataPhuongXa(option.id)
            .then((res) => setXa(res.data.data))
            .catch((err) => console.log(err));
        }}
        value={values.quanHuyen}
        options={huyen.map((item) => ({
          value: item.name,
          label: item.full_name,
          id: item.id,
        }))}
      />
      {errors.phuongXa && touched.phuongXa && (
        <p className="text-red-500 text-sm mt-1">{errors.phuongXa}</p>
      )}

      <Select
        className="w-full"
        showSearch
        name="phuongXa"
        placeholder="Phường xã"
        disabled={!selectedHuyen}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        onChange={(value) => {
          setFieldValue("phuongXa", value);
        }}
        value={values.phuongXa}
        options={xa.map((item) => ({
          value: item.name,
          label: item.full_name,
        }))}
      />
      {errors.quanHuyen && touched.quanHuyen && (
        <p className="text-red-500 text-sm mt-1">{errors.quanHuyen}</p>
      )}

      <TextArea
        placeholder="Ghi chú..."
        rows={4}
        value={values.ghiChu}
        name="ghiChu"
        onChange={handleChange}
      />
    </form>
  );
};

export default FormCheckout;
