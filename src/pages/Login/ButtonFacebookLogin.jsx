import React, { useState } from "react";
import FacebookLogin, {
  FacebookLoginClient,
} from "@greatsumini/react-facebook-login";
import { toast } from "react-toastify";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
import { authService } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { useDispatch } from "react-redux";
import { handleUpdateUser } from "../../redux/slice/user.slice";

const ButtonFacebookLogin = () => {
  const appId = "461607103663018";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveToBackend = async (userData) => {
    console.log(userData);
    authService
      .loginFacebook(userData)
      .then((res) => {
        toast.success(res.data.message);
        dispatch(handleUpdateUser(res.data.metaData));
        localStorage.setItem("userData", JSON.stringify(res.data.metaData));
        navigate(pathDefault.homePage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFacebookLogin = () => {
    FacebookLoginClient.getProfile(
      async (profile) => {
        const { name, email, picture, id } = profile;
        const avata = picture.data.url;
        const userData = {
          name,
          email,
          avata,
          id,
        };
        await saveToBackend(userData);
      },
      { fields: "name,email,picture" }
    );
  };

  return (
    <>
      <FacebookLogin
        appId={appId}
        initParams={{ version: "v16.0" }}
        onSuccess={() => {
          handleFacebookLogin();
        }}
        onFail={(error) => {
          console.error("Login Failed!", error);
          toast.error("Login with Facebook failed.");
        }}
        render={({ onClick }) => {
          return (
            <button
              onClick={() => {
                FacebookLoginClient.getLoginStatus((loginStatus) => {
                  if (loginStatus.status === "connected") {
                    handleFacebookLogin();
                  } else {
                    if (onClick) {
                      onClick();
                    }
                  }
                });
              }}
              className="border-2 flex items-center gap-2 px-5 py-1 rounded-full"
            >
              <FaFacebook fill="#1877F2" />
              <span className="text-sm font-medium">FaceBook</span>
            </button>
          );
        }}
      />
    </>
  );
};

export default ButtonFacebookLogin;
