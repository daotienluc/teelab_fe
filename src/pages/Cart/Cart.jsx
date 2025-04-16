import React, { useState } from "react";
import SearchTemplate from "../../templates/HomeTemplate/components/SearchTemplate/SearchTemplate";
import HeaderTemplate from "../../templates/HomeTemplate/components/HeaderTemplate";
import FooterTemplate from "../../templates/HomeTemplate/components/FooterTemplate";
import Navigation from "../../templates/HomeTemplate/components/Navigation";
import { Button, Select, Table } from "antd";
import { formattedAmount } from "../../common/helpers";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaRegTrashCan } from "react-icons/fa6";
import "./Cart.scss";
import { ButtonSolid } from "../../components/button/ButtonCustom";
import useViewPort from "../../hooks/useViewPort";
import HeaderMobileTemplate from "../../templates/HomeTemplate/components/HeaderMobileTemplate";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteCart,
  updateCartQuantity,
} from "../../redux/slice/cart.slice";

const Cart = () => {
  const { width } = useViewPort();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cartSlice.cart);

  const dispatch = useDispatch();
  const handleDeleteProductCart = (productId) => {
    dispatch(handleDeleteCart(productId));
  };
  const handleIncreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity < 10) {
      dispatch(
        updateCartQuantity({ productId, quantity: currentQuantity + 1 })
      );
    }
  };

  const handleDecreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(
        updateCartQuantity({ productId, quantity: currentQuantity - 1 })
      );
    }
  };
  const columns = [
    {
      title: width < 600 ? null : "Thông tin sản phẩm",
      render: (text, record, index) => {
        return (
          <div
            className="flex gap-2
          "
          >
            <img src={text.image} alt="" className="w-20 h-20" />
            <div className="flex flex-col justify-between">
              <p className="font-medium line-clamp-2">{text.product_name}</p>
              <div className="flex items-center gap-2">
                <div>
                  <p>{text.color}</p>
                </div>
                / <div>{text.material}</div>
              </div>
              {width < 600 ? (
                <div className="flex justify-between items-center gap-10">
                  <p className="font-bold text-red-500">
                    {formattedAmount(text.price)}
                  </p>
                  <div className="border border-black inline-flex rounded-lg items-center ">
                    <button
                      onClick={() =>
                        handleDecreaseQuantity(text.product_id, text.quantity)
                      }
                    >
                      <AiOutlineMinus className="m-2 cursor-pointer" />
                    </button>

                    <span className=" border-x-[1px] border-black px-2.5 py-1">
                      {text.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleIncreaseQuantity(text.product_id, text.quantity)
                      }
                    >
                      <AiOutlinePlus className="m-2 cursor-pointer" />
                    </button>
                  </div>
                  <FaRegTrashCan
                    className="text-xl text-red-500 cursor-pointer"
                    onClick={() => {
                      handleDeleteProductCart(text.cart_id);
                    }}
                  />
                </div>
              ) : null}

              {width < 600 ? null : <p>{text.form}</p>}
            </div>
          </div>
        );
      },
    },
    {
      title: width < 600 ? null : "Đơn giá",
      responsive: ["md"],
      render: (text) => (
        <p className="font-bold text-red-500">{formattedAmount(text.price)}</p>
      ),
    },
    {
      title: width < 600 ? null : "Số lượng",
      responsive: ["md"],
      render: (text, record, index) => (
        <div className="border border-black inline-flex rounded-lg items-center ">
          <button
            onClick={() =>
              handleDecreaseQuantity(text.product_id, text.quantity)
            }
          >
            <AiOutlineMinus className="m-2 cursor-pointer" />
          </button>

          <span className=" border-x-[1px] border-black px-2.5 py-1">
            {text.quantity}
          </span>
          <button
            onClick={() =>
              handleIncreaseQuantity(text.product_id, text.quantity)
            }
          >
            <AiOutlinePlus className="m-2 cursor-pointer" />
          </button>
        </div>
      ),
    },
    {
      title: width < 600 ? null : "Thành tiền",
      responsive: ["md"],
      render: (text) => <p>{formattedAmount(text.price * text.quantity)}</p>,
    },
    {
      title: width < 600 ? null : "",
      responsive: ["md"],
      render: (text) => {
        return (
          <FaRegTrashCan
            className="text-xl text-red-500 cursor-pointer"
            onClick={() => {
              handleDeleteProductCart(text.product_id);
            }}
          />
        );
      },
    },
  ];

  const totalAmount = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <>
      {width > 600 ? (
        <>
          <SearchTemplate />
          <HeaderTemplate />
        </>
      ) : (
        <HeaderMobileTemplate />
      )}
      <Navigation />
      <div className="container">
        <h2 className="font-normal text-2xl">Giỏ hàng của bạn</h2>
        <Table
          dataSource={cart.map((item, index) => ({ ...item, key: index }))}
          columns={columns}
        />
        <div className="block md:grid grid-cols-12 py-5 space-y-3">
          <div className="col-start-9 col-end-13 flex justify-between">
            <p>Tổng tiền :</p>
            <p className="font-bold text-red-500">
              {formattedAmount(totalAmount)}
            </p>
          </div>
          <ButtonSolid
            handleClick={() => {
              return navigate(pathDefault.checkout);
            }}
            className="w-full md:col-start-9 col-end-13 py-5"
            content="Thanh toán"
          />
        </div>
      </div>
      <FooterTemplate />
    </>
  );
};

export default Cart;
