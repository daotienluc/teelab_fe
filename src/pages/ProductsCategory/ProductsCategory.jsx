import React, { useEffect, useState } from "react";
import useViewPort from "../../hooks/useViewPort";
import SearchTemplate from "../../templates/HomeTemplate/components/SearchTemplate/SearchTemplate";
import HeaderTemplate from "../../templates/HomeTemplate/components/HeaderTemplate";
import HeaderMobileTemplate from "../../templates/HomeTemplate/components/HeaderMobileTemplate";
import Navigation from "../../templates/HomeTemplate/components/Navigation";
import FooterTemplate from "../../templates/HomeTemplate/components/FooterTemplate";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { productServices } from "../../services/products.services";
import { formattedAmount } from "../../common/helpers";
import { Pagination, Spin } from "antd";
import useAddToCart from "../../hooks/useAddToCart";

const ProductsCategory = () => {
  const { width } = useViewPort();
  const { product_type_id, product_name } = useParams();
  const { handleAddToCart } = useAddToCart();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    productServices
      .productByProductTypeId(product_type_id)
      .then((res) => {
        setProducts(res.data.metaData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [product_type_id]);
  return (
    <div>
      <>
        {width > 600 ? (
          <>
            <SearchTemplate />
            <HeaderTemplate />
          </>
        ) : (
          <HeaderMobileTemplate />
        )}
        <main className="overflow-hidden">
          <Navigation />
          <div className="container">
            <h2 className="text-4xl">{product_name}</h2>
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center my-5">
                  {products.map((item, index) => (
                    <Link
                      key={index}
                      to={`/details/${item.product_id}/${item.product_name}`}
                      className="space-y-3 group"
                    >
                      <div className="relative">
                        <img src={item.image} alt="" />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(item);
                          }}
                          className="absolute top-4 -right-4 bg-[#696969] hover:bg-[#333333] rounded-full p-2 flex items-center duration-500 opacity-0 translate-x-[40%] group-hover:opacity-100 group-hover:translate-x-[-30px]"
                        >
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
                </div>
                <div className="pagination_custom py-5">
                  <Pagination align="center" defaultCurrent={1} total={50} />
                </div>
              </>
            ) : (
              <div class="flex-col gap-4 w-full h-[40vh] flex items-center justify-center">
                <div class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                  <div class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        </main>
        <FooterTemplate />
      </>
    </div>
  );
};

export default ProductsCategory;
