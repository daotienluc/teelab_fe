import React, { useEffect, useState } from "react";
import { checkoutService } from "../../../../services/checkout.service";
import { Table } from "antd";
import { formattedAmount } from "../../../../common/helpers";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchOrdersWithStatus = async () => {
      try {
        const res = await checkoutService.getAllOrder();
        const orders = res.data.metaData;

        // Gọi checkStatusTransaction cho từng order
        const updatedOrders = await Promise.all(
          orders.map(async (order) => {
            try {
              const statusRes = await checkoutService.checkStatusTransaction({
                orderId: order.order_id,
              });
              return {
                ...order,
                orderInfo: order.order_info,
                momoMessage: statusRes.data.message,
                momoStatusCode: statusRes.data.resultCode,
              };
            } catch (error) {
              return {
                ...order,
                momoMessage: "Lỗi khi kiểm tra trạng thái",
                momoStatusCode: -1,
              };
            }
          })
        );

        setOrders(updatedOrders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrdersWithStatus();
  }, []);

  const columns = [
    {
      title: "Order Id",
      render: (text) => <p>{text.order_id}</p>,
      key: "name",
    },
    {
      title: "Hình thức thanh toán",
      render: (text) => <p>{text.order_info}</p>,
      key: "age",
    },
    {
      title: "Trạng thái đơn hàng",
      render: (text) => {
        return (
          <div>
            <p
              className={
                text.momoStatusCode === 0 ? "text-blue-500" : "text-red-500"
              }
            >
              {text.orderInfo === "pay later" ? (
                <span className="text-blue-500">Thanh toán khi nhận hàng</span>
              ) : (
                text.momoMessage
              )}
            </p>
          </div>
        );
      },
      key: "address",
    },
    {
      title: "Đơn giá",
      render: (text) => <p>{formattedAmount(text.amount)}</p>,
      key: "dongia",
    },
  ];
  return (
    <div>
      <h2 className="py-5 text-xl font-medium text-red-500">
        Order Management
      </h2>
      <Table
        dataSource={orders.map((item, index) => ({ ...item, key: index }))}
        columns={columns}
      />
    </div>
  );
};

export default Order;
