import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import axios from "axios";
import { authService } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { useDispatch } from "react-redux";
import { handleUpdateUser } from "../../redux/slice/user.slice";
import { FcGoogle } from "react-icons/fc";

const ButtonGoogleLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveToBackend = async (userData) => {
    authService
      .loginGoogle(userData)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        dispatch(handleUpdateUser(res.data.metaData));
        localStorage.setItem("userData", JSON.stringify(res.data.metaData));
        navigate(pathDefault.homePage);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data.message);
      });
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const { name, email, picture } = res.data;
        const userData = {
          name,
          email,
          avata: picture,
        };
        saveToBackend(userData);
      } catch (err) {
        console.error("Failed to fetch user info", err);
        toast.error("Lấy thông tin người dùng thất bại.");
      }
    },
    onError: () => {
      toast.error("Login with Google failed.");
    },
  });

  return (
    <>
      <button
        onClick={() => {
          login();
        }}
        className="border-2 flex justify-center items-center gap-2 px-5 py-1 rounded-full"
      >
        <FcGoogle />
        <span className="text-sm font-medium">Google</span>
      </button>
    </>
  );
};

export default ButtonGoogleLogin;
