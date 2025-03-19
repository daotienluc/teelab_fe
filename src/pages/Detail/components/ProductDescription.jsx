import { Button, Tabs } from "antd";
import React from "react";
import { ButtonSolid } from "../../../components/button/ButtonCustom";

const ProductDescription = (props) => {
  const { product } = props;

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          {
            label: (
              <ButtonSolid
                content="Mô tả sản phẩm"
                variant="outlined"
                className="py-6 font-medium"
              />
            ),
            key: "1",
            children: (
              <div className="space-y-3">
                <p>{product.description}</p>
                <img
                  src={product.image}
                  alt=""
                  className="h-[400px] md:h-[790px] w-full"
                />
                <div className="space-y-3 text-sm">
                  <p>Về TEELAB:</p>
                  <p>
                    You will never be younger than you are at this very moment
                    “Enjoy Your Youth!”
                  </p>
                  <p>
                    Không chỉ là thời trang, TEELAB còn là “phòng thí nghiệm”
                    của tuổi trẻ - nơi nghiên cứu và cho ra đời năng lượng mang
                    tên “Youth”. Chúng mình luôn muốn tạo nên những trải nghiệm
                    vui vẻ, năng động và trẻ trung. <br /> Lấy cảm hứng từ giới
                    trẻ, sáng tạo liên tục, bắt kịp xu hướng và phát triển đa
                    dạng các dòng sản phẩm là cách mà chúng mình hoạt động để
                    tạo nên phong cách sống hằng ngày của bạn. Mục tiêu của
                    TEELAB là cung cấp các sản phẩm thời trang chất lượng cao
                    với giá thành hợp lý. <br /> Chẳng còn thời gian để loay
                    hoay nữa đâu youngers ơi! Hãy nhanh chân bắt lấy những những
                    khoảnh khắc tuyệt vời của tuổi trẻ. TEELAB đã sẵn sàng trải
                    nghiệm cùng bạn!
                  </p>
                  <p>“Enjoy Your Youth”, now!</p>
                </div>
              </div>
            ),
          },

          {
            label: (
              <ButtonSolid
                content="Đánh giá sản phẩm"
                variant="outlined"
                className="py-6 font-medium"
              />
            ),
            key: "2",
            children: (
              <>
                <Button>Đánh giá</Button>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default ProductDescription;
