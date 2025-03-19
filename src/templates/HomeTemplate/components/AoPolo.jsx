import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import { formattedAmount } from "../../../common/helpers";
import useFetchProducts from "../../../hooks/useFetchProducts";

const AoPolo = () => {
  const dataAopolo = 2;
  const { products } = useFetchProducts(dataAopolo);

  return (
    <div className="container">
      <Link to={pathDefault.aothun} className="hover:text-[#999999] text-4xl">
        Áo polo
      </Link>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center my-5">
        {products.slice(0, 7).map((item, index) => (
          <Link
            key={index}
            to={`/details/${item.product_id}/${item.product_name}`}
            className="space-y-3 group"
          >
            <div className="relative">
              <img src={item.image} alt="" />
              <button className="absolute top-4 -right-4 bg-[#696969] hover:bg-[#333333] rounded-full p-2 flex items-center duration-500 opacity-0 translate-x-[40%] group-hover:opacity-100 group-hover:translate-x-[-30px]">
                <ShoppingCartOutlined className="text-xl text-white" />
              </button>
            </div>
            <div>
              <h2 className="font-medium line-clamp-2 my-3 hover:text-red-500 duration-300">
                {item.product_name}
              </h2>
              <div className="flex justify-center gap-3">
                <p className="text-red-500 font-medium">
                  {formattedAmount(item.price)}
                </p>
                <p className="font-medium text-[#9e9e9e] line-through">
                  195.000đ
                </p>
              </div>
            </div>
          </Link>
        ))}
        <div className="flex items-center justify-center font-medium text-lg underline">
          <Link to={pathDefault.aothun}>Xem thêm</Link>
        </div>
      </div>
    </div>
  );
};

export default AoPolo;
