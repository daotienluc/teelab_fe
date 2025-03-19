import React, { useEffect, useState } from "react";
import { InputForm } from "../../components/input/InputForm";
import { addressServices } from "../../services/address.services";
import { Select } from "antd";
import TextArea from "antd/es/input/TextArea";

const FormCheckout = () => {
  const [tinhThanh, setTinhThanh] = useState([]);
  const [huyen, setHuyen] = useState([]);
  const [xa, setXa] = useState([]);

  const [selectedTinh, setSelectedTinh] = useState(null);
  const [selectedHuyen, setSelectedHuyen] = useState(null);

  // Lấy danh sách tỉnh
  useEffect(() => {
    addressServices
      .getAllTinhThanh()
      .then((res) => {
        setTinhThanh(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Khi chọn tỉnh, gọi API lấy danh sách huyện
  const handleSelectTinh = (value, option) => {
    setSelectedTinh(option.id); // Lưu id tỉnh đã chọn
    setHuyen([]); // Reset huyện khi đổi tỉnh
    setXa([]); // Reset xã khi đổi tỉnh
    setSelectedHuyen(null); // Reset huyện đã chọn

    addressServices
      .getDataHuyen(option.id)
      .then((res) => setHuyen(res.data.data))
      .catch((err) => console.log(err));
  };

  // Khi chọn huyện, gọi API lấy danh sách xã
  const handleSelectHuyen = (value, option) => {
    setSelectedHuyen(option.id); // Lưu id huyện đã chọn
    setXa([]); // Reset xã khi đổi huyện

    addressServices
      .getdataPhuongXa(option.id)
      .then((res) => setXa(res.data.data))
      .catch((err) => console.log(err));
  };
  return (
    <form className="col-span-6 space-y-3">
      <h2 className="font-medium text-lg">Thông tin nhận hàng</h2>
      <InputForm placeholder="Họ và tên" />
      <InputForm placeholder="Số điện thoại" />
      <InputForm placeholder="Địa chỉ" />

      {/* Chọn tỉnh */}
      <Select
        className="w-full"
        showSearch
        placeholder="Tỉnh thành"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        onChange={handleSelectTinh}
        options={tinhThanh.map((item) => ({
          value: item.name,
          label: item.full_name,
          id: item.id,
        }))}
      />

      {/* Chọn huyện */}
      <Select
        className="w-full"
        showSearch
        placeholder="Quận huyện"
        disabled={!selectedTinh}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        onChange={handleSelectHuyen}
        options={huyen.map((item) => ({
          value: item.name,
          label: item.full_name,
          id: item.id,
        }))}
      />

      {/* Chọn xã */}
      <Select
        className="w-full"
        showSearch
        placeholder="Phường xã"
        disabled={!selectedHuyen}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={xa.map((item) => ({
          value: item.name,
          label: item.full_name,
        }))}
      />
      <TextArea placeholder="Ghi chú..." rows={4} />
    </form>
  );
};

export default FormCheckout;
