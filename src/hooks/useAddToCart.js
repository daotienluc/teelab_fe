import { useNavigate } from "react-router-dom";
import { useMessage } from "../hooks/messageContext";
import useUser from "../hooks/useUser";
import useViewPort from "../hooks/useViewPort";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../redux/slice/cart.slice";
import { pathDefault } from "../common/path";

const useAddToCart = () => {
  const { userInfo } = useUser();
  const { width } = useViewPort();
  const showMessage = useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    if (!userInfo) {
      width > 600
        ? toast.error("Vui lòng đăng nhập để thêm sản phẩm !")
        : showMessage("error", "Vui lòng đăng nhập để thêm sản phẩm !");

      setTimeout(() => {
        navigate(pathDefault.login);
      }, 1500);
      return;
    }
    width > 600
      ? toast.success("Thêm sản phẩm vào giỏ hàng thành công !")
      : showMessage("success", "Thêm sản phẩm vào giỏ hàng thành công !");
    dispatch(addToCart(product));
  };

  return { handleAddToCart };
};

export default useAddToCart;
