import React, { useState } from "react";
import { Icons } from "../../components/icons/Icons";
import FormCheckout from "./FormCheckout";
import { Radio } from "antd";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import "./checkout.scss";
import aothun from "./../../assets/img/aothun.jpg";
import { InputForm } from "../../components/input/InputForm";
import { ButtonSolid } from "../../components/button/ButtonCustom";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { pathDefault } from "../../common/path";
import { formattedAmount } from "../../common/helpers";
import { useSelector } from "react-redux";

const Checkout = () => {
  const [valueVanChuyen, setValueVanChuyen] = useState(1);
  const [valueThanhToan, setValueThanhToan] = useState(1);
  const [valueMaGiamGia, setValueMaGiamGia] = useState("");
  const [valueTienVanChuyen, setValueTienVanChuyen] = useState(25000);
  const cart = useSelector((state) => state.cartSlice.cart);
  console.log(cart);

  const onChangeVanChuyen = (e) => {
    setValueVanChuyen(e.target.value);
  };
  const onChangeThanhToan = (e) => {
    setValueThanhToan(e.target.value);
  };
  const onChangeMaGiamGia = (e) => {
    setValueMaGiamGia(e.target.value);
  };
  const totalAmount = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  const tong = () => {
    const mot = formattedAmount(valueTienVanChuyen + totalAmount);
    const hai = formattedAmount(valueTienVanChuyen * 2 + totalAmount);
    return valueVanChuyen === 1 ? mot : hai;
  };
  return (
    <div className="container">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-7">
          <div className="flex justify-center py-5">
            <Icons.Logo />
          </div>
          <div className="grid grid-cols-12 gap-5 pb-10">
            <FormCheckout />
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
              <p>
                {/* {valueVanChuyen === 1
                  ? formattedAmount(valueTienVanChuyen + totalAmount)
                  : formattedAmount(valueTienVanChuyen * 2 + totalAmount)} */}
                {tong()}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <Link to={pathDefault.cart}>
                <LeftOutlined className="text-xs" /> Quay lại giỏ hàng
              </Link>
              <ButtonSolid content="Đặt hàng" className="py-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
