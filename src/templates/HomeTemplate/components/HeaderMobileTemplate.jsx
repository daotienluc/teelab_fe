import React, { useEffect, useMemo, useState } from "react";
import { MdMenu } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import { Icons } from "../../../components/icons/Icons";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCartContext } from "../../../hooks/userCartContext";
import { Badge, Dropdown, Input } from "antd";
import { ButtonSolid } from "../../../components/button/ButtonCustom";
import { productServices } from "../../../services/products.services";
import { GoDotFill } from "react-icons/go";
import useUser from "../../../hooks/useUser";
import { useDebounce } from "use-debounce";
const { Search } = Input;
const HeaderMobileTemplate = () => {
  const { productCart } = useCartContext();
  const { userInfo } = useUser();
  const [listProduct, setListProduct] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  // Hàm mở/đóng menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Hàm đóng menu khi bấm vào overlay
  const closeMenu = () => {
    setMenuOpen(false);
  };

  const onSearch = (value) => console.log(value);
  const handleChangeKeyWord = (e) => {
    setKeyword(e.target.value);
  };

  const [keyword, setKeyword] = useState("");
  const [value] = useDebounce(keyword, 1000);

  const items = [
    {
      key: "1",
      label: (
        <Search
          placeholder="Tìm kiếm sản phẩm..."
          onSearch={onSearch}
          value={keyword}
          onChange={handleChangeKeyWord}
          className="search_custom"
        />
      ),
    },
  ];
  return (
    <div className="flex justify-between items-center m-5">
      <div className="">
        <MdMenu className="text-2xl" onClick={toggleMenu} />
        {menuOpen && (
          <div
            onClick={closeMenu}
            className="bg-[#00000080] h-screen left-0 overflow-hidden fixed top-0 w-full z-40"
          ></div>
        )}
        <div
          className={`fixed z-50 w-[250px] h-screen top-0 left-0 bg-white duration-500 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-5">
            {userInfo ? null : (
              <ButtonSolid
                content="Đăng nhập"
                handleClick={() => {
                  navigate(pathDefault.login);
                }}
              />
            )}
            <h2 className="text-2xl font-bold my-1">Menu</h2>
            <ul>
              Tất cả sản phẩm
              <li className="space-y-1">
                {listProduct.map((item, index) => (
                  <>
                    <Link
                      key={index}
                      to={`/${item.product_name}`}
                      className="ml-5 flex items-center gap-1"
                    >
                      <GoDotFill className="text-xs" />
                      {item.product_name}
                    </Link>
                  </>
                ))}
              </li>
            </ul>
            <Link className="block">Bảng size</Link>
            <Link className="block">Kiểm tra đơn hàng</Link>
            <Link className="block">Hệ thống cửa hàng</Link>
          </div>
        </div>
      </div>
      <div>
        <Link to={pathDefault.homePage}>
          <Icons.Logo className="w-32 ml-5" />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Dropdown
          className="w-full"
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <FaSearch className="text-2xl" />
        </Dropdown>
        <Link to={pathDefault.cart}>
          <Badge count={productCart.length}>
            <ShoppingCartOutlined className="text-3xl" />
          </Badge>
        </Link>
      </div>
    </div>
  );
};

export default HeaderMobileTemplate;
