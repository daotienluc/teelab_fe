import React from "react";
import { Icons } from "../../../components/icons/Icons";
import { Link } from "react-router-dom";
import { pathDefault } from "../../../common/path";

const HeaderTemplate = () => {
  const styleLinkNavbar =
    "uppercase text-[#333333] text-lg hover:text-[#999999]";

  return (
    <header>
      <div className="container py-6 border-b-2">
        <div className="flex justify-between">
          <div>
            <Link to={pathDefault.homePage} className={styleLinkNavbar}>
              Trang chủ
            </Link>
          </div>
          <div>
            <Link className={styleLinkNavbar}>Chính sách đổi trả</Link>
          </div>
          <div>
            <Link to={pathDefault.homePage}>
              <Icons.Logo />
            </Link>
          </div>
          <div>
            <Link className={styleLinkNavbar}>Bảng size</Link>
          </div>
          <div>
            <Link className={styleLinkNavbar}>Hệ Thống Cửa Hàng</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTemplate;
