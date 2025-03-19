import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { productServices } from "../../../services/products.services";

const SimilarProduct = (props) => {
  const { product } = props;
  const [similarProduct, setSimilarProduct] = useState([]);
  useEffect(() => {
    productServices
      .productByProductTypeId(product.product_type_id)
      .then((res) => {
        setSimilarProduct(res.data.metaData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [product]);
  return (
    <div>
      <div className="mt-3 text-center font-normal">
        <h2 className="text-xl md:text-4xl border-b-2 border-black pb-3 px-5 inline uppercase">
          Sản phẩm tương tự
        </h2>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-5 text-center pb-5 pt-10">
          {similarProduct.slice(0, 4).map((item, index) => (
            <Link
              key={index}
              to={`/details/${item.product_id}/${item.product_name}`}
              className="space-y-3 card_item"
            >
              <div className="relative">
                <img src={item.image} alt="" />
                <button className="absolute top-4 -right-4 card_button bg-[#696969] hover:bg-[#333333] rounded-full p-2 flex items-center duration-500 opacity-0">
                  <ShoppingCartOutlined className="text-xl text-white" />
                </button>
              </div>
              <div>
                <h2 className="font-medium line-clamp-2 my-3 hover:text-red-500 duration-300">
                  {item.product_name}
                </h2>
                <div className="flex justify-center gap-3">
                  <p className="text-red-500 font-medium">{item.price}</p>
                  <p className="font-medium text-[#9e9e9e] line-through">
                    195.000đ
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarProduct;
