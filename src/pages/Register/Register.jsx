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

const Register = () => {
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: JSON.parse(JSON.stringify(animationData)),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        userName: "",
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        authService
          .register(values)
          .then((res) => {
            toast.success("Đăng ký thành công");
            navigate(pathDefault.login);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response.data.message);
          });
      },
      validationSchema: yup.object({
        userName: yup.string().required("Vui lòng không bỏ trống"),
        email: yup
          .string()
          .email("Vui lòng nhập đúng định dạng Email")
          .required("Vui lòng không bỏ trống"),
        password: yup.string().required("Vui lòng không bỏ trống"),
      }),
    });
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
          <h1 className="text-4xl font-semibold">Trang đăng ký</h1>
          <p className="text-sm font-semibold text-gray-400 pb-6 pt-2">
            Nhập Email để bắt đầu đăng ký
          </p>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">Tên</label>
              <Input
                name="userName"
                value={values.userName}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Vui lòng nhập tên"
              />
              {errors.userName && touched.userName && (
                <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
              )}
            </div>

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
                placeholder="Vui lòng nhập mật khẩu"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-black text-white"
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>

        {/* đăng ký */}
        <div className="text-center">
          <span>
            Bạn đã có tài khoản?{" "}
            <Link
              to={pathDefault.login}
              className="font-semibold hover:underline duration-200"
            >
              Đăng nhập tại đây
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
