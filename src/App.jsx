import { useRoutes } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import { pathDefault } from "./common/path";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from "./templates/AdminTemplate/components/Dashboard";
import Product from "./templates/AdminTemplate/components/Product/Product";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import User from "./templates/AdminTemplate/components/User/User";
import { GoogleOAuthProvider } from "@react-oauth/google";
import DetailTemplate from "./pages/Detail/DetailTemplate";
import ProductDetail from "./pages/Detail/components/ProductDetail";
import Cart from "./pages/Cart/Cart";
import { UseCartProvider } from "./hooks/userCartContext";
const clientId =
  "222005952578-s02iegnp9pg1vs9ecftf8f660rv2b7hf.apps.googleusercontent.com";
const arrRouter = [
  {
    path: pathDefault.homePage,
    element: <HomeTemplate />,
  },
  {
    path: pathDefault.cart,
    element: <Cart />,
  },
  {
    path: pathDefault.details,
    element: <DetailTemplate />,
    children: [
      {
        path: "",
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: pathDefault.login,
    element: <Login />,
  },
  {
    path: pathDefault.register,
    element: <Register />,
  },
  {
    path: pathDefault.adminPage,
    element: <AdminTemplate />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: pathDefault.dashboard,
        element: <Dashboard />,
      },
      {
        path: pathDefault.product,
        element: <Product />,
      },
      {
        path: pathDefault.user,
        element: <User />,
      },
    ],
  },
];

function App() {
  const router = useRoutes(arrRouter);
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <UseCartProvider>{router}</UseCartProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
