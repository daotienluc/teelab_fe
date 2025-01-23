import React, { useEffect, useState } from "react";
import SearchTemplate from "../../templates/HomeTemplate/components/SearchTemplate/SearchTemplate";
import HeaderTemplate from "../../templates/HomeTemplate/components/HeaderTemplate";
import FooterTemplate from "../../templates/HomeTemplate/components/FooterTemplate";
import Navigation from "../../templates/HomeTemplate/components/Navigation";
import { Button, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { formattedAmount } from "../../common/helpers";
import { removeFromCard } from "../../redux/slice/cart.slice";
import { cartServices } from "../../services/cart.services";
import jwtDecode from "jwt-decode";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Cart = () => {
  const userData = localStorage.getItem("userData");
  const userDataObject = JSON.parse(userData);
  const userInfo = jwtDecode(userDataObject.accessToken);
  console.log(userInfo.userId);
  const [productCart, setProductCart] = useState([]);
  const [color, setColor] = useState([]);
  useEffect(() => {
    cartServices
      .getCartById(userInfo.userId)
      .then((res) => {
        const keydata = res.data.metaData.map((item) => ({
          ...item,
          key: item.cart_id,
          color: setColor(item.color.split(",")),
        }));
        setProductCart(keydata);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const columns = [
    {
      title: "Thông tin sản phẩm",
      render: (text) => {
        return (
          <div
            className="flex gap-2
          "
          >
            <img src={text.image} alt="" className="w-20 h-20" />
            <div className="flex flex-col justify-between">
              <p className="font-medium">{text.product_name}</p>
              <div className="flex items-center gap-2">
                <div>
                  <Select
                    placeholder="Select color"
                    className="max-w-full"
                    options={color.map((item) => {
                      return { value: item, label: item };
                    })}
                  />
                </div>
                / <div>{text.sizes}</div>
              </div>
              <p>{text.form}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Đơn giá",
      render: (text) => <p>{formattedAmount(text.price)}</p>,
    },
    {
      title: "Số lượng",
      render: (text, record, index) => (
        <div className="border border-black inline-flex rounded-lg items-center ">
          <button
            onClick={() => {
              if (text.quantity > 1) {
                const updatedCart = [...productCart];
                updatedCart[index].quantity -= 1;
                setProductCart(updatedCart);
              }
            }}
          >
            <AiOutlineMinus className="m-2 cursor-pointer" />
          </button>

          <span className=" border-x-[1px] border-black px-2.5 py-1">
            {text.quantity}
          </span>
          <button
            onClick={() => {
              if (text.quantity < 10) {
                const updatedCart = [...productCart];
                updatedCart[index].quantity += 1;
                setProductCart(updatedCart);
              }
            }}
          >
            <AiOutlinePlus className="m-2 cursor-pointer" />
          </button>
        </div>
      ),
    },
    {
      title: "Thành tiền",
      render: (text) => <p>{formattedAmount(text.price * text.quantity)}</p>,
    },
    {
      title: "",
      render: (text) => (
        <Button
          onClick={() => {
            handleDeleteProduct(text.product_id);
          }}
        >
          Xóa
        </Button>
      ),
    },
  ];
  return (
    <>
      <SearchTemplate />
      <HeaderTemplate />
      <Navigation />
      <div className="container">
        <h2 className="font-normal text-2xl">Giỏ hàng của bạn</h2>
        <Table dataSource={productCart} columns={columns} />
      </div>
      <FooterTemplate />
    </>
  );
};

export default Cart;
