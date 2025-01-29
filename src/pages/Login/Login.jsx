import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as animationData from "./../../assets/animation/loginAnimation.json";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Icons } from "../../components/icons/Icons";
import { pathDefault } from "../../common/path";
import { Button, Input } from "antd";
import Lottie from "react-lottie";
import { LeftOutlined } from "@ant-design/icons";
import { authService } from "../../services/auth.services";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import ButtonFacebookLogin from "./ButtonFacebookLogin";
import { useDispatch } from "react-redux";
import { handleUpdateUser } from "../../redux/slice/user.slice";
import ButtonGoogleLogin from "./ButtonGoogleLogin";
import { useMessage } from "../../hooks/messageContext";
import useViewPort from "../../hooks/useViewPort";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showMessage = useMessage();
  const { width } = useViewPort();

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        authService
          .login(values)
          .then((res) => {
            width < 600
              ? showMessage("success", res.data.message)
              : toast.success(res.data.message);
            // thay đổi dữ liệu cho redux
            dispatch(handleUpdateUser(res.data.metaData));
            localStorage.setItem("userData", JSON.stringify(res.data.metaData));
            navigate(pathDefault.homePage);
          })
          .catch((err) => {
            console.log(err);
            width < 600
              ? showMessage("error", err.response.data.message)
              : toast.error(err.response.data.message);
          });
      },
      // validationSchema
      validationSchema: yup.object({
        email: yup
          .string()
          .email("Vui lòng nhập đúng định dạng Email")
          .required("Vui lòng không bỏ trống"),
        password: yup.string().required("Vui lòng không bỏ trống"),
      }),
    });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: JSON.parse(JSON.stringify(animationData)),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 lg:h-screen py-10">
      <div className="hidden lg:block col-span-2 h-full">
        {/* Animation */}
        <Lottie options={defaultOptions} height={600} width={990} />
      </div>
      <div className="signIn_form h-full px-10 flex flex-col justify-between mx-auto lg:mx-0 w-full lg:w-auto">
        {/* Logo and back to homePage */}
        <div className="flex justify-between items-center">
          <Icons.Logo />
          <Link to={pathDefault.homePage}>
            <LeftOutlined /> Go back
          </Link>
        </div>

        {/* Form */}
        <div className="mt-10 lg:mt-0">
          <h1 className="text-4xl font-semibold">Trang đăng nhập</h1>
          <p className="text-sm font-semibold text-gray-400 pb-6 pt-2">
            Nhập Email để bắt đầu truy cập
          </p>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">Email</label>
              <Input
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Vui lòng nhập Email"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="">Mật khẩu</label>
              <Input
                type="password"
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Vui lòng nhập Mật khẩu"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="pt-5">
              <button
                type="submit"
                className="w-full bg-black text-white rounded-lg py-2"
              >
                Đăng nhập
              </button>
            </div>
          </form>
          <p className="text-center text-lg font-medium my-5">or</p>
          <div className="flex justify-center gap-2 text-lg">
            <ButtonFacebookLogin />
            <ButtonGoogleLogin />
            {/* <button className="border-2 flex items-center gap-2 px-5 py-1 rounded-full">
              <FaGithub />
              <span className="text-sm font-medium">Github</span>
            </button> */}
          </div>
        </div>
        {/* đăng ký */}
        <div className="text-center">
          <span>
            Chưa có tài khoản?{" "}
            <Link
              to={pathDefault.register}
              className="font-semibold hover:underline duration-200"
            >
              Đăng ký tại đây
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
