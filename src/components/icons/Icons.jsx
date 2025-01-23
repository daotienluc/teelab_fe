import React from "react";
import Logo from "./../../assets/img/logo.jpg";
import logofooter from "./../../assets/img/logofooter.jpg";

export const Icons = {
  Logo: () => {
    return <img src={Logo} alt="" />;
  },
  LogoFooter: () => {
    return <img src={logofooter} alt="" />;
  },
};
