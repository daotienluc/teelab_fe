import { useState, useEffect } from "react";
import { productServices } from "../services/products.services";

const useFetchProducts = (productTypeId) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productTypeId) return;

    productServices
      .productByProductTypeId(productTypeId)
      .then((res) => {
        setProducts(res.data.metaData);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, [productTypeId]);

  return { products, error };
};

export default useFetchProducts;
