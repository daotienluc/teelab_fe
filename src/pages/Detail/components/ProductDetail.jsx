import React, { useEffect, useState } from "react";
import { Button, Rate, Tabs } from "antd";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaShippingFast } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { ButtonSolid } from "../../../components/button/ButtonCustom";
import { productServices } from "../../../services/products.services";
import useViewPort from "../../../hooks/useViewPort";
import { useCartContext } from "../../../hooks/userCartContext";

const ProductDetail = () => {
  const [count, setCount] = useState(1);
  const [size, setSize] = useState("S");
  const [product, setProduct] = useState("");
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");

  const { product_id } = useParams();
  const { width } = useViewPort();
  const { handleAddToCart } = useCartContext();

  useEffect(() => {
    productServices
      .productByproductId(product_id)
      .then((res) => {
        const data = {
          ...res.data.metaData,
          color: res.data.metaData.color.split(","),
        };
        setProduct(data);
        setColors(data.color);
      })
      .catch((err) => {
        console.log(err);
      });
    window.scrollTo(0, 0);
  }, [product_id]);

  const formattedAmount = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  return (
    <div className="container">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-8">
          <img
            src={product.image}
            alt=""
            className="h-[400px] md:h-[790px] w-full"
          />
          {width < 600 ? (
            <div className="space-y-4">
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
                  <span className="font-bold text-red-500 mb-[2px]">
                    Top bán chạy
                  </span>
                </p>
                <Link className="flex items-center gap-1">
                  <span className="text-red-500 mb-[1px]">
                    Sản phẩm bán chạy nhất
                  </span>
                  <MdKeyboardArrowRight />
                </Link>
              </div>
              <ul>
                Thông tin sản phẩm:
                <li>
                  - Chất liệu:{" "}
                  <span className="text-sm font-medium">
                    {product.material}
                  </span>
                </li>
                <li>
                  - Form:{" "}
                  <span className="text-sm font-medium">{product.form}</span>
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
                  Kích thước:{" "}
                  <span className="text-sm font-medium">{size}</span>
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
                  handleClick={() => {
                    handleAddToCart({
                      ...product,
                      color: product.color.toString(),
                    });
                  }}
                  className="py-5"
                  content="Thêm vào giỏ hàng"
                />
                <ButtonSolid className="py-5" content="Mua ngay" />
              </div>
            </div>
          ) : null}
          <div>
            <Tabs
              defaultActiveKey="1"
              centered
              items={[
                {
                  label: (
                    <ButtonSolid
                      content="Mô tả sản phẩm"
                      variant="outlined"
                      className="py-6 font-medium"
                    />
                  ),
                  key: "1",
                  children: (
                    <div className="space-y-3">
                      <p>{product.description}</p>
                      <img
                        src={product.image}
                        alt=""
                        className="h-[400px] md:h-[790px] w-full"
                      />
                      <div className="space-y-3 text-sm">
                        <p>Về TEELAB:</p>
                        <p>
                          You will never be younger than you are at this very
                          moment “Enjoy Your Youth!”
                        </p>
                        <p>
                          Không chỉ là thời trang, TEELAB còn là “phòng thí
                          nghiệm” của tuổi trẻ - nơi nghiên cứu và cho ra đời
                          năng lượng mang tên “Youth”. Chúng mình luôn muốn tạo
                          nên những trải nghiệm vui vẻ, năng động và trẻ trung.{" "}
                          <br /> Lấy cảm hứng từ giới trẻ, sáng tạo liên tục,
                          bắt kịp xu hướng và phát triển đa dạng các dòng sản
                          phẩm là cách mà chúng mình hoạt động để tạo nên phong
                          cách sống hằng ngày của bạn. Mục tiêu của TEELAB là
                          cung cấp các sản phẩm thời trang chất lượng cao với
                          giá thành hợp lý. <br /> Chẳng còn thời gian để loay
                          hoay nữa đâu youngers ơi! Hãy nhanh chân bắt lấy những
                          những khoảnh khắc tuyệt vời của tuổi trẻ. TEELAB đã
                          sẵn sàng trải nghiệm cùng bạn!
                        </p>
                        <p>“Enjoy Your Youth”, now!</p>
                      </div>
                    </div>
                  ),
                },

                {
                  label: (
                    <ButtonSolid
                      content="Đánh giá sản phẩm"
                      variant="outlined"
                      className="py-6 font-medium"
                    />
                  ),
                  key: "2",
                  children: (
                    <>
                      <Button>Đánh giá</Button>
                    </>
                  ),
                },
              ]}
            />
          </div>
        </div>
        {width < 600 ? null : (
          <div className="col-span-4 space-y-4">
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
                <span className="font-bold text-red-500 mb-[2px]">
                  Top bán chạy
                </span>
              </p>
              <Link className="flex items-center gap-1">
                <span className="text-red-500 mb-[1px]">
                  Sản phẩm bán chạy nhất
                </span>
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
                - Form:{" "}
                <span className="text-sm font-medium">{product.form}</span>
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

                <span className="border-x-[1px] border-black px-4 py-2">
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
                handleClick={() => {
                  handleAddToCart({
                    ...product,
                    color: product.color.toString(),
                  });
                }}
                className="py-5"
                content="Thêm vào giỏ hàng"
              />
              <ButtonSolid className="py-5" content="Mua ngay" />
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="mt-3 text-center font-normal">
          <h2 className="text-xl md:text-4xl border-b-2 border-black pb-3 px-5 inline uppercase">
            Sản phẩm tương tự
          </h2>
          <div className="grid grid-cols-4 gap-5 text-center my-5">
            <Link to={`/details`} className="space-y-3 card_item">
              <div className="relative ">
                <img src={product.image} alt="" />
                <button className="absolute top-4 -right-4 card_button bg-[#696969] hover:bg-[#333333] rounded-full p-2 flex items-center duration-500 opacity-0">
                  <ShoppingCartOutlined className="text-xl text-white" />
                </button>
              </div>
              <div>
                <h2 className="font-medium line-clamp-2 my-3 hover:text-red-500 duration-300">
                  product_name
                </h2>
                <div className="flex justify-center gap-3">
                  <p className="text-red-500 font-medium">price</p>
                  <p className="font-medium text-[#9e9e9e] line-through">
                    195.000đ
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
