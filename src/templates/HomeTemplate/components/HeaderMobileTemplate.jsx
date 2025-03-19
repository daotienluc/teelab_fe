import React, { useEffect, useMemo, useState } from "react";
import { MdMenu } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import { Icons } from "../../../components/icons/Icons";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { RxCross2 } from "react-icons/rx";
import { Badge, Dropdown, Input } from "antd";
import { ButtonSolid } from "../../../components/button/ButtonCustom";
import { productServices } from "../../../services/products.services";
import { GoDotFill } from "react-icons/go";
import useUser from "../../../hooks/useUser";
import { useDebounce } from "use-debounce";
import "./HeaderMobileTemplate.scss";
const { Search } = Input;
const HeaderMobileTemplate = () => {
  const { userInfo } = useUser();
  const [listProduct, setListProduct] = useState([]);
  const [productList, setProductList] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
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

  const handleChangeKeyWord = (e) => {
    setKeyword(e.target.value);
  };

  const [keyword, setKeyword] = useState("");
  const [value] = useDebounce(keyword, 1000);

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

  const items = [
    {
      key: "1",
      label: (
        <>
          <Search
            placeholder="Tìm kiếm sản phẩm..."
            value={keyword}
            onChange={handleChangeKeyWord}
          />
          {productList.length > 0 && (
            <p className="bg-white w-full space-y-3">
              <p>Gợi ý sản phẩm: </p>
              {productList.slice(0, 3).map((item) => {
                return (
                  <Link
                    onClick={() => {
                      setOpen(!open);
                    }}
                    to={`/details/${item.product_id}/${item.product_name}`}
                    className="block"
                  >
                    {item.product_name}
                  </Link>
                );
              })}
            </p>
          )}
        </>
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
              {listProduct.map((item, index) => (
                <li className="space-y-1" key={index}>
                  <Link
                    to={`/${item.product_name}`}
                    className="ml-5 flex items-center gap-1"
                  >
                    <GoDotFill className="text-xs" />
                    {item.product_name}
                  </Link>
                </li>
              ))}
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
          menu={{
            items,
          }}
          trigger={["click"]}
          open={open}
        >
          {!open ? (
            <FaSearch
              className="text-2xl"
              onClick={() => {
                setOpen(!open);
              }}
            />
          ) : (
            <RxCross2
              className="text-2xl"
              onClick={() => {
                setOpen(!open);
              }}
            />
          )}
        </Dropdown>

        <Link to={pathDefault.cart}>
          <Badge count={0}>
            <ShoppingCartOutlined className="text-3xl" />
          </Badge>
        </Link>
      </div>
    </div>
  );
};

export default HeaderMobileTemplate;
