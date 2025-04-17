import React from "react";
import { Icons } from "../../../components/icons/Icons";
import chungnhanImg from "./../../../assets/img/chungnhan.jpg";
import {
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaInstagramSquare,
  FaTiktok,
} from "react-icons/fa";
import { TbBrandShopee } from "react-icons/tb";
import { Link } from "react-router-dom";

const FooterTemplate = () => {
  return (
    <footer className="bg-black text-[#999999] container">
      <div className="grid grid-cols-12 py-10">
        <div className="col-span-3 space-y-3">
          <Icons.LogoFooter />
          <div>
            <h2>Đào Tiến Lực</h2>
            <p className="text-xs">
              Giấy chứng nhận đăng ký HKD số 0000000000000 do Phòng Tài chính -
              Kế hoạch, Uỷ ban nhân dân thành phố abc cấp ngày 26/11/2004 Địa
              chỉ: Số 235, Đường abc, Tổ 7, Phường abc, Thành phố abc, Tỉnh abc,
              Việt Nam Email: lucd1177@gmail.com Điện thoại: 0342873623
            </p>
          </div>
          <img src={chungnhanImg} alt="" className="w-40" />
        </div>
        <div className="col-span-5 text-center space-y-3">
          <h2 className="text-2xl font-bold uppercase">Follow</h2>
          <p>Theo dõi Teelab từ các nền tảng khác nhau nhé!</p>
          <div className="flex items-center justify-center gap-10">
            <p className="border border-gray-500 rounded-full p-2 bg-blue-500 cursor-pointer">
              <FaFacebookF fill="#fff" className="text-xl" />
            </p>
            <p className="border border-gray-500 rounded-full p-2 bg-[#D16B46] cursor-pointer">
              <FaInstagram fill="#fff" className="text-xl" />
            </p>
            <p className="border border-gray-500 rounded-full p-2 cursor-pointer">
              <FaTiktok fill="#fff" className="text-xl" />
            </p>
            <p className="border border-gray-500 rounded-full p-2 bg-[#EB511F] cursor-pointer">
              <TbBrandShopee fill="#fff" className="text-xl" />
            </p>
          </div>
        </div>
        <div className="col-span-2 space-y-3">
          <h2 className="text-2xl font-bold uppercase">about us</h2>
          <ul className="space-y-5">
            <li>
              <Link className="hover:text-orange-500 duration-300">
                Trang chủ
              </Link>
            </li>

            <li>
              <Link className="hover:text-orange-500 duration-300">
                Tất cả sản phẩm
              </Link>
            </li>

            <li>
              <Link className="hover:text-orange-500 duration-300">
                Bảng Size
              </Link>
            </li>

            <li>
              <Link className="hover:text-orange-500 duration-300">
                Kiểm tra đơn hàng
              </Link>
            </li>

            <li className="hover:text-orange-500 duration-300">
              <Link>Hệ Thống Cửa Hàng</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 space-y-3">
          <h2 className="text-2xl font-bold uppercase">Policy</h2>
          <ul className="space-y-5">
            <li>
              <Link className="hover:text-orange-500 duration-300">
                Chính sách mua hàng
              </Link>
            </li>

            <li>
              <Link className="hover:text-orange-500 duration-300">
                Chính sách bảo mật
              </Link>
            </li>

            <li>
              <Link className="hover:text-orange-500 duration-300">
                Phương thức thanh toán
              </Link>
            </li>

            <li>
              <Link className="hover:text-orange-500 duration-300">
                Chính sách giao nhận, vận chuyển, kiểm hàng
              </Link>
            </li>

            <li className="hover:text-orange-500 duration-300">
              <Link>Chính sách đổi trả</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterTemplate;
