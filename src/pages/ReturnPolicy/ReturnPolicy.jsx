import React from "react";
import HeaderTemplate from "../../templates/HomeTemplate/components/HeaderTemplate";
import FooterTemplate from "../../templates/HomeTemplate/components/FooterTemplate";
import SearchTemplate from "../../templates/HomeTemplate/components/SearchTemplate/SearchTemplate";

const ReturnPolicy = () => {
  return (
    <>
      <SearchTemplate />
      <HeaderTemplate />
      <main className="pt-40 container space-y-3">
        <h1 className="text-4xl">Chính sách Đổi trả</h1>
        <h2 className="text-xl font-bold">1. CHÍNH SÁCH ĐỔI SẢN PHẨM</h2>
        <h3 className="font-bold">a. Đổi size</h3>
        <p>
          – Áp dụng 01 lần đổi /1 đơn hàng với các đơn hàng mua online và các
          đơn hàng mua tại cửa hàng.
        </p>
        <p>
          – Sản phẩm đổi trong thời gian 3 ngày kể từ ngày mua hàng trên hoá đơn
          (đối với khách mua hàng trực tiếp tại cửa hàng), 3 ngày kể từ ngày
          nhận hàng (Đối với khách mua online)
        </p>
        <p>
          – Sản phẩm còn mới nguyên tem, tags và mang theo hoá đơn mua hàng, sản
          phẩm chưa giặt và không dơ bẩn, hư hỏng bởi những tác nhân bên ngoài
          cửa hàng sau khi mua hàng.
        </p>
        <p>– Không áp dụng đối với các sản phẩm là phụ kiện</p>
        <h3 className="font-bold">b. Đổi sản phẩm lỗi</h3>
        <p>Điều kiện áp dụng</p>
        <p>– Sản phẩm lỗi kỹ thuật: Sản phẩm rách, bung keo, …</p>
        <p>Trường hợp không được giải quyết</p>
        <p>– Sản phầm đã qua sử dụng</p>
        <p>
          Đối với sản phẩm lỗi kỹ thuật cần phản hồi đến TEELAB trong vòng 3
          ngày, kể từ ngày mua hàng trên hoá đơn đối với khách mua trực tiếp tại
          cửa hàng, 3 ngày kể từ ngày nhận hàng đối với khách mua online.
        </p>
        <h2 className="text-xl font-bold">2. PHƯƠNG THỨC ĐỔI SẢN PHẨM</h2>
        <p>
          – Hàng mua trực tiếp tại cửa hàng: Đổi trả trực tiếp tại cửa hàng mua
          hàng
        </p>
        <p>
          – Hàng mua online (thông qua webiste, Shopee, Lazada): liên hệ fanpage
          Teelab để được hướng dẫn đổi trả
        </p>
        <h2 className="text-xl font-bold">3. CHI PHÍ ĐỔI HÀNG</h2>
        <p>
          – Miễn phí đổi hàng cho khách mua ở TEELAB trong trường hợp bị lỗi từ
          nhà sản xuất, giao nhầm hàng, bị hư hỏng trong quá trình vận chuyển
          hàng.
        </p>
        <p>
          – Trong trường hợp không vừa size hay khách hàng không ưng sản phẩm
          không muốn nhận hàng phiền khách hàng trả ship hoàn đơn hàng về
        </p>
        <h2 className="text-xl font-bold">TEELAB</h2>
        <h2 className="font-bold pb-10">Experiment on Your Style</h2>
      </main>
      <FooterTemplate />
    </>
  );
};

export default ReturnPolicy;
