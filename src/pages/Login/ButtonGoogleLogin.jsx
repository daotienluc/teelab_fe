import React from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { toast } from "react-toastify";
import axios from "axios";
import { authService } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { useDispatch } from "react-redux";
import { handleUpdateUser } from "../../redux/slice/user.slice";
import { FcGoogle } from "react-icons/fc";
import jwt_decode from "jwt-decode";

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

  const handleSuccess = (res) => {
    try {
      const decodedToken = jwt_decode(res.credential);
      const { name, email, picture } = decodedToken;
      const userData = {
        name,
        email,
        avata: picture,
      };
      saveToBackend(userData);
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  };

  const handleError = () => {
    toast.error("Login with Google failed.");
  };

  return (
    <>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        className="btn_google"
      />
      {/* <button
        className="border-2 flex items-center gap-2 px-5 py-1 rounded-full"
      >
        <FcGoogle />
        <span className="text-sm font-medium">Google</span>
      </button> */}
    </>
  );
};

export default ButtonGoogleLogin;
