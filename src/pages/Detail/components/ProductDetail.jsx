import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productServices } from "../../../services/products.services";
import useViewPort from "../../../hooks/useViewPort";
import ProductDetailReponsive from "./ProductDetailReponsive";
import ProductDescription from "./ProductDescription";
import SimilarProduct from "./SimilarProduct";

const ProductDetail = () => {
  const [product, setProduct] = useState("");
  const [colors, setColors] = useState([]);
  console.log(colors);
  const { product_id } = useParams();
  const { width } = useViewPort();

  useEffect(() => {
    productServices
      .productByproductId(product_id)
      .then((res) => {
        const data = {
          ...res.data.metaData,
          color: res.data.metaData.color.split(","),
        };
        console.log(res.data.metaData);
        setProduct(data);
        setColors(data.color);
      })
      .catch((err) => {
        console.log(err);
      });
    window.scrollTo(0, 0);
  }, [product_id]);

  return (
    <div className="container">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-8">
          <img
            src={product.image}
            alt=""
            className="h-[350px] md:h-[790px] w-full"
          />
          {width < 600 ? (
            <ProductDetailReponsive product={product} colors={colors} />
          ) : null}
          <ProductDescription product={product} />
        </div>
        {width < 600 ? null : (
          <ProductDetailReponsive product={product} colors={colors} />
        )}
      </div>
      <SimilarProduct product={product} />
    </div>
  );
};

export default ProductDetail;
