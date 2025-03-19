import { Badge, Dropdown, Input } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import "./SearchTemplate.scss";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { productServices } from "../../../../services/products.services";
import { useDebounce } from "use-debounce";
import { Link } from "react-router-dom";
import { pathDefault } from "../../../../common/path";
import { useSelector } from "react-redux";

const { Search } = Input;

const SearchTemplate = () => {
  const cart = useSelector((state) => state.cartSlice.cart);
  const [keyword, setKeyword] = useState("");
  const [productList, setProductList] = useState([]);
  const [value] = useDebounce(keyword, 1000);
  const onSearch = (value) => console.log(value);
  const handleChangeKeyWord = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (value) {
      productServices
        .getProductByProductName(value)
        .then((res) => {
          setProductList(res.data.metaData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [value]);

  const itemListSearch = useMemo(() => {
    return productList.map((item, index) => {
      return {
        key: item.product_id,
        label: (
          <Link to={`/details/${item.product_id}/${item.product_name}`}>
            {item.product_name}
          </Link>
        ),
      };
    });
  }, [productList]);

  return (
    <div className="container flex justify-center md:justify-end items-center gap-5 bg-[#F5F5F5] py-3 fixed z-[1]">
      <div>
        <Dropdown
          menu={{
            items: itemListSearch,
          }}
          trigger={["click"]}
        >
          <Search
            placeholder="Tìm kiếm sản phẩm..."
            onSearch={onSearch}
            value={keyword}
            onChange={handleChangeKeyWord}
            className="search_custom"
          />
        </Dropdown>
      </div>
      <Link to={pathDefault.cart}>
        <Badge count={cart.length}>
          <ShoppingCartOutlined className="text-3xl" />
        </Badge>
      </Link>
    </div>
  );
};

export default SearchTemplate;
