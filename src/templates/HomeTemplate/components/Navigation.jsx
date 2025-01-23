import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productServices } from "../../../services/products.services";

const Navigation = () => {
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    productServices
      .productByCategory()
      .then((res) => {
        setListProduct(res.data.metaData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const styleLinkNavbar = " text-[#333333] text-base hover:text-[#999999]";
  return (
    <div className="max-w-6xl m-auto flex justify-between py-3">
      {listProduct.map((item, index) => (
        <Link
          key={index}
          to={`/${item.product_name}`}
          className={styleLinkNavbar}
        >
          {item.product_name}
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
