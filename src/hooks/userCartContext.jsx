import { createContext, useContext, useEffect, useState } from "react";
import { cartServices } from "../services/cart.services";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { pathDefault } from "../common/path";
import { useNavigate } from "react-router-dom";
export const CartContext = createContext();

export const UseCartProvider = ({ children }) => {
  const [productCart, setProductCart] = useState([]);
  const userlocalStorage = JSON.parse(localStorage.getItem("userData") || "{}");
  const userId = userlocalStorage.accessToken
    ? jwtDecode(userlocalStorage.accessToken)?.userId
    : null;
  useEffect(() => {
    handleGetProductCart();
  }, []);

  const navigate = useNavigate();

  const handleGetProductCart = () => {
    cartServices
      .getCartById(userId)
      .then((res) => {
        const keyData = res.data.metaData.map((item, index) => ({
          ...item,
          key: index,
        }));
        setProductCart(keyData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToCart = (product) => {
    if (!userId) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm !");
      setTimeout(() => {
        navigate(pathDefault.login);
      }, 2000);
      return;
    }
    if (product.sizes === null) {
      product.sizes = "M";
    }
    const payload = {
      ...product,
      quantity: 1,
      id: userId,
    };
    cartServices
      .addToCart(payload)
      .then((res) => {
        handleGetProductCart();
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const handleDeleteProductCart = (id) => {
    cartServices
      .deleteProductCart(id)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        handleGetProductCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CartContext.Provider
      value={{
        productCart,
        handleAddToCart,
        handleDeleteProductCart,
        setProductCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCartContext = () => {
  return useContext(CartContext);
};
