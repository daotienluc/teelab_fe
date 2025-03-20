import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productServices } from "../../../services/products.services";
import useViewPort from "../../../hooks/useViewPort";

const Navigation = () => {
  const [listProduct, setListProduct] = useState([]);

  const { width } = useViewPort();
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
    <div
      className={
        width > 600
          ? "max-w-6xl mx-auto flex pt-40 justify-between py-3"
          : "hidden"
      }
    >
      {listProduct.map((item, index) => (
        <Link
          key={index}
          to={`/productCategory/${item.product_name}/${item.product_type_id}`}
          className={styleLinkNavbar}
        >
          {item.product_name}
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
