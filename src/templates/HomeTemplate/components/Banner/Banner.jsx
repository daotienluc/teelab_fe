import React from "react";
import Slider from "react-slick";
import "./Banner.scss";
import slide1 from "./../../../../assets/img/slider1.jpg";
import slide2 from "./../../../../assets/img/slider2.jpg";
import slide3 from "./../../../../assets/img/slider3.jpg";
import slide4 from "./../../../../assets/img/slider4.jpg";
import slide5 from "./../../../../assets/img/slider5.jpg";

const Banner = () => {
  const settings = {
    dots: true, // Hiển thị các dấu chấm dưới carousel
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: false, // Cho phép cuộn vô hạn
    speed: 500, // Thời gian chuyển slide (milisecond)
    slidesToShow: 1, // Hiển thị một slide mỗi lần
    slidesToScroll: 1, // Cuộn 1 slide mỗi lần
  };
  return (
    <div className="container">
      <Slider {...settings} className="carousel_custom w-full">
        <div>
          <img src={slide1} alt="" className="w-full" />
        </div>
        <div>
          <img src={slide2} alt="" className="w-full" />
        </div>
        <div>
          <img src={slide3} alt="" className="w-full" />
        </div>
        <div>
          <img src={slide4} alt="" className="w-full" />
        </div>
        <div>
          <img src={slide5} alt="" className="w-full" />
        </div>
      </Slider>
      <div className="text-center py-10 space-y-5">
        <h2 className="text-4xl">Enjoy Your Youth!</h2>
        <p className="max-w-2xl m-auto">
          Không chỉ là thời trang, TEELAB còn là “phòng thí nghiệm” của tuổi trẻ
          - nơi nghiên cứu và cho ra đời nguồn năng lượng mang tên “Youth”.
          Chúng mình luôn muốn tạo nên những trải nghiệm vui vẻ, năng động và
          trẻ trung.
        </p>
      </div>
    </div>
  );
};

export default Banner;
