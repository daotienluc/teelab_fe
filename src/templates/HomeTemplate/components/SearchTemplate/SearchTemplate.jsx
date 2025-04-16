import { Badge, Dropdown, Input, Space } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import {
  DownOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { productServices } from "../../../../services/products.services";
import { useDebounce } from "use-debounce";
import { Link } from "react-router-dom";
import { pathDefault } from "../../../../common/path";
import { useSelector } from "react-redux";

const SearchTemplate = () => {
  const cart = useSelector((state) => state.cartSlice.cart);
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [productList, setProductList] = useState([]);
  const [value] = useDebounce(keyword, 1000);
  const handleChangeKeyWord = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (value) {
      productServices
        .getProductByProductName(value)
        .then((res) => {
          setProductList(res.data.metaData);
          setOpen(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [value]);

  const handleClickInputSearch = () => {
    setOpen(true);
  };

  const itemListSearch = useMemo(() => {
    return productList.slice(0, 4).map((item) => {
      return {
        key: item.product_id,
        label: (
          <Link to={`/details/${item.product_id}/${item.product_name}`}>
            <div className="flex">
              <img src={item.image} alt="" className="w-20 h-20" />
              <p className="text-red-500">{item.product_name}</p>
            </div>
          </Link>
        ),
      };
    });
  }, [productList]);

  return (
    <>
      <div className="container flex justify-center md:justify-end items-center gap-5 bg-[#F5F5F5] py-3 fixed z-[1]">
        <div>
          <Dropdown
            menu={{
              items: itemListSearch,
              onMouseLeave: () => {
                setOpen(false);
              },
            }}
            open={open}
            trigger={["click"]}
          >
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={keyword}
              onClick={handleClickInputSearch}
              prefix={<SearchOutlined className="text-xl" />}
              className="search_custom !py-2 mr-32"
              onChange={handleChangeKeyWord}
            />
          </Dropdown>
        </div>
        <Link to={pathDefault.cart}>
          <Badge count={cart.length}>
            <ShoppingCartOutlined className="text-3xl" />
          </Badge>
        </Link>
      </div>
    </>
  );
};

export default SearchTemplate;
