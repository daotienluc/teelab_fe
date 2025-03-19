import React, { useState } from "react";
import { Rate } from "antd";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaShippingFast } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ButtonSolid } from "../../../components/button/ButtonCustom";
import { formattedAmount } from "../../../common/helpers";
import useViewPort from "../../../hooks/useViewPort";
import useUser from "../../../hooks/useUser";
import { useMessage } from "../../../hooks/messageContext";
import { toast } from "react-toastify";
import { pathDefault } from "../../../common/path";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slice/cart.slice";

const ProductDetailReponsive = (props) => {
  const { product, colors } = props;
  const [selectedColor, setSelectedColor] = useState("");

  const [size, setSize] = useState("S");
  const [count, setCount] = useState(1);
  const { width } = useViewPort();
  const { userInfo } = useUser();
  const showMessage = useMessage();
  const navigate = useNavigate();
  const dispath = useDispatch();
  const handleAddToCart = (product) => {
    if (!userInfo) {
      width > 600
        ? toast.error("Vui lòng đăng nhập để thêm sản phẩm !")
        : showMessage("error", "Vui lòng đăng nhập để thêm sản phẩm !");
      setTimeout(() => {
        navigate(pathDefault.login);
      }, 1500);
      return;
    }
    dispath(addToCart(product));
  };
  return (
    <div className={width > 600 ? "space-y-4 col-span-4" : "space-y-4"}>
      <h2 className="font-bold text-2xl border-b-2 border-black pb-3">
        {product.product_name}
      </h2>
      <div className="flex items-center gap-2">
        <Rate className="text-[#D0011B] hover:text-[#D0011B]" />
        <p className="text-[#D0011B] font-medium">
          (Xem <span>1</span> đánh giá)
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="font-medium text-3xl text-red-500">
          {formattedAmount(product.price)}
        </p>
        <p className="font-normal text-2xl text-[#9e9e9e] line-through">
          350.000đ
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex items-center gap-1">
          <IoArrowBackCircle fill="#D0011B" />
          <span className="text-xs">Đổi trả dễ dàng</span>
        </div>
        <div className="flex items-center gap-1">
          <IoArrowBackCircle fill="#D0011B" />
          <span className="text-xs"> Chính hãng 100%</span>
        </div>
        <div className="flex items-center gap-1">
          <FaShippingFast fill="#D0011B" />
          <span className="text-xs">Giao toàn quốc</span>
        </div>
      </div>
      <div className="flex items-center justify-between bg-[#FBE8E8] px-3 py-2">
        <p className="flex items-center gap-1">
          <TfiCup fill="#D0011B" />
          <span className="font-bold text-red-500 mb-[2px]">Top bán chạy</span>
        </p>
        <Link className="flex items-center gap-1">
          <span className="text-red-500 mb-[1px]">Sản phẩm bán chạy nhất</span>
          <MdKeyboardArrowRight />
        </Link>
      </div>
      <ul>
        Thông tin sản phẩm:
        <li>
          - Chất liệu:{" "}
          <span className="text-sm font-medium">{product.material}</span>
        </li>
        <li>
          - Form: <span className="text-sm font-medium">{product.form}</span>
        </li>
        <li>
          - Màu sắc:{" "}
          <span className="text-sm font-medium">
            {product && product.color[0]}
          </span>
        </li>
        <li>
          - Thiết kế:{" "}
          <span className="text-sm font-medium">{product.design}</span>
        </li>
      </ul>
      <div>
        <div>
          <p>
            Màu sắc:{" "}
            <span className="text-sm font-medium">
              {selectedColor || colors[0]}
            </span>
          </p>
          <div className="flex gap-2">
            {product.color?.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedColor(item);
                }}
                className="border border-black rounded-full px-2"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p>
          Kích thước: <span className="text-sm font-medium">{size}</span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSize("S");
            }}
            className="w-8 h-8 border border-black rounded-full font-bold"
          >
            S
          </button>
          <button
            onClick={() => {
              setSize("M");
            }}
            className="w-8 h-8 border border-black rounded-full font-bold"
          >
            M
          </button>
          <button
            onClick={() => {
              setSize("L");
            }}
            className="w-8 h-8 border border-black rounded-full font-bold"
          >
            L
          </button>
          <button
            onClick={() => {
              setSize(" XL");
            }}
            className="w-8 h-8 border border-black rounded-full font-bold"
          >
            XL
          </button>
          <button
            onClick={() => {
              setSize(" 2XL");
            }}
            className="w-8 h-8 border border-black rounded-full font-bold"
          >
            2XL
          </button>
        </div>
      </div>

      <div>
        <p>Số lượng</p>
        <div className="border border-black inline-flex rounded-lg items-center ">
          <button
            onClick={() => {
              setCount(count - 1);
            }}
            disabled={count === 1}
          >
            <AiOutlineMinus className="m-3 cursor-pointer" />
          </button>

          <span className=" border-x-[1px] border-black px-4 py-2">
            {count}
          </span>
          <button
            onClick={() => {
              setCount(count + 1);
            }}
            disabled={count === 10}
          >
            <AiOutlinePlus className="m-3 cursor-pointer" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <ButtonSolid
          className="py-5"
          content="Thêm vào giỏ hàng"
          handleClick={() => handleAddToCart(product)}
        />
        <ButtonSolid className="py-5" content="Mua ngay" />
      </div>
    </div>
  );
};

export default ProductDetailReponsive;
