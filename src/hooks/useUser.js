import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";

const useUser = () => {
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    const userlocalStorage = JSON.parse(localStorage.getItem("userData"));
    setUserInfo(jwtDecode(userlocalStorage.accessToken));
  }, []);
  return { userInfo };
};

export default useUser;
