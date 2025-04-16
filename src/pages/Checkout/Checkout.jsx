import React, { useEffect, useState } from "react";
import { Icons } from "../../components/icons/Icons";
import FormCheckout from "./FormCheckout";
import { Radio, Select } from "antd";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import "./checkout.scss";
import { InputForm } from "../../components/input/InputForm";
import { ButtonSolid } from "../../components/button/ButtonCustom";
import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { pathDefault } from "../../common/path";
import { formattedAmount } from "../../common/helpers";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { checkoutService } from "../../services/checkout.service";
import jwtDecode from "jwt-decode";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import * as yup from "yup";
import { addressServices } from "../../services/address.services";
import { usersServices } from "../../services/users.services";

const Checkout = () => {
  const [valueVanChuyen, setValueVanChuyen] = useState(1);
  const [valueThanhToan, setValueThanhToan] = useState(1);
  const [valueMaGiamGia, setValueMaGiamGia] = useState("");
  const [valueTienVanChuyen, setValueTienVanChuyen] = useState(25000);
  const [valueInfo, setValueInfo] = useState("");
  const cart = useSelector((state) => state.cartSlice.cart);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const userInfo = jwtDecode(userData.accessToken);

  const [tinhThanh, setTinhThanh] = useState([]);
  const [huyen, setHuyen] = useState([]);
  const [xa, setXa] = useState([]);

  const [selectedTinh, setSelectedTinh] = useState(null);
  const [selectedHuyen, setSelectedHuyen] = useState(null);
  const [user, setUser] = useState("");

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
        setUser(res.data.metaData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  const onChangeVanChuyen = (e) => {
    setValueVanChuyen(e.target.value);
  };

  const onChangeThanhToan = (e) => {
    setValueThanhToan(e.target.value);
  };
  const onChangeMaGiamGia = (e) => {
    setValueMaGiamGia(e.target.value);
  };
  const removeCart = () => {
    localStorage.removeItem("cart");
  };
  const totalAmount = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  const tong = () => {
    const giaoHangThuong = valueTienVanChuyen + totalAmount;
    const giaoHangSieuToc = valueTienVanChuyen * 2 + totalAmount;
    return valueVanChuyen === 1 ? giaoHangThuong : giaoHangSieuToc;
  };
  console.log(typeof valueInfo);
  const handleCheckout = async () => {
    if (!valueInfo) {
      toast.warning("Vui lòng nhập đầy đủ thông tin nhận hàng !");
      return;
    }
    const totalPrice = tong();
    if (valueThanhToan === 2) {
      checkoutService
        .payment({
          addressForm: valueInfo,
          user_id: userInfo.userId,
          amounts: totalPrice,
          products: cart,
        })
        .then((res) => {
          window.location.href = res.data.payUrl;
          removeCart();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      checkoutService
        .payLater({
          addressForm: valueInfo,
          user_id: userInfo.userId,
          amounts: totalPrice,
          products: cart,
        })
        .then((res) => {
          removeCart();
          toast.success("Thanh toán thành công !");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
      setValueInfo(values);
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
    <div className="container">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-7">
          <div className="flex justify-center py-5">
            <Icons.Logo />
          </div>
          <div className="grid grid-cols-12 gap-5 pb-10">
            {/* <FormCheckout onSubmitForm={handleCheckoutSubmit} /> */}
            <form className="col-span-6 space-y-3" onSubmit={handleSubmit}>
              <h2 className="font-medium text-lg">Thông tin nhận hàng</h2>
              <InputForm
                placeholder="Họ và tên"
                name="hoTen"
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.hoTen}
                error={errors.hoTen}
                touched={touched.hoTen}
              />
              <InputForm
                placeholder="Số điện thoại"
                name="soDienThoai"
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.soDienThoai}
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
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
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
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
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
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
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
              <button
                type="submit"
                className="uppercase w-full py-2 rounded-lg bg-black text-white hover:bg-[#3F3F3F]"
              >
                Xác nhận thông tim
              </button>
            </form>
            <div className="col-span-6 space-y-3">
              <h2 className="font-medium text-lg">Vận chuyển</h2>
              <Radio.Group
                onChange={onChangeVanChuyen}
                className="flex flex-col gap-3 radio_custom"
                value={valueVanChuyen}
                options={[
                  {
                    value: 1,
                    label: (
                      <>
                        <div className="relative">
                          <span>Giao hàng thông thường</span>
                          <span className="absolute -right-36">
                            {formattedAmount(valueTienVanChuyen)}
                          </span>
                        </div>
                      </>
                    ),
                  },
                  {
                    value: 2,
                    label: (
                      <div className="relative">
                        <span>Giao hàng siêu tốc</span>
                        <span className="absolute -right-[181px]">
                          {formattedAmount(valueTienVanChuyen * 2)}
                        </span>
                      </div>
                    ),
                  },
                ]}
              />
              <h2 className="font-medium text-lg">Thanh toán</h2>
              <Radio.Group
                onChange={onChangeThanhToan}
                className="flex flex-col gap-3 radio_custom"
                value={valueThanhToan}
                options={[
                  {
                    value: 1,
                    label: (
                      <>
                        <div className="relative">
                          <span>Thanh toán khi nhận hàng</span>
                          <FaRegMoneyBillAlt className="text-xl absolute top-[1px] -right-[134px]" />
                        </div>
                      </>
                    ),
                  },
                  {
                    value: 2,
                    label: (
                      <div className="relative">
                        <span>Thanh toán qua ví điện tử</span>
                        <FaRegMoneyBillAlt className="text-xl absolute top-[1px] -right-[138px]" />
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
          <div className="text-end border-t-2 pt-5 text-gray-500">
            TEELAB Official | Copyright CELESTEE LLC
          </div>
        </div>
        <div className="col-span-5 bg-[#FAFAFA] min-h-screen">
          <h2 className="font-medium text-lg border-b-2 p-5">
            Đơn hàng (<span>{cart.length}</span> sản phẩm)
          </h2>
          <div className="p-5 space-y-5">
            {cart.map((item, index) => (
              <div className="flex items-center" key={index}>
                <div className="flex gap-3 w-4/5 relative">
                  <img
                    src={item.image}
                    alt=""
                    className="w-14 h-14 rounded-lg object-cover "
                  />
                  <span className="bg-black absolute text-white rounded-full px-[5px] py-[1px] left-11 -top-1 text-xs">
                    {item.quantity}
                  </span>
                  <div>
                    <p className="text-sm">{item.product_name}</p>
                    <p className="text-xs text-gray-500">Trắng / L</p>
                  </div>
                </div>
                <div className="w-1/5">{formattedAmount(item.price)}</div>
              </div>
            ))}
            <div className="flex gap-2 border-y-2 py-5">
              <InputForm
                handleChange={onChangeMaGiamGia}
                placeholder="Nhập mã giảm giá"
              />
              <ButtonSolid
                content="Áp dụng"
                className={
                  valueMaGiamGia === ""
                    ? "py-5 !bg-[#3F3F3F]"
                    : "py-5 !bg-black"
                }
              />
            </div>
            <div className="flex justify-between text-gray-500 text-sm">
              <p>Tạm tính</p>
              <p>{formattedAmount(totalAmount)}</p>
            </div>
            <div className="flex justify-between text-gray-500 text-sm">
              <p>Phí vận chuyển</p>
              <p>
                {valueVanChuyen === 1
                  ? formattedAmount(valueTienVanChuyen)
                  : formattedAmount(valueTienVanChuyen * 2)}
              </p>
            </div>
            <div className="flex justify-between items-center text-gray-500 text-sm border-t-2 pt-5">
              <p className="text-lg">Tổng cộng</p>
              <p>{tong()} đ</p>
            </div>
            <div className="flex justify-between items-center">
              <Link to={pathDefault.cart}>
                <LeftOutlined className="text-xs" /> Quay lại giỏ hàng
              </Link>
              <ButtonSolid
                handleClick={() => {
                  handleCheckout();
                }}
                content="Đặt hàng"
                className="py-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
