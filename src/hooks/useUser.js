import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";

const useUser = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const userlocalStorage = JSON.parse(
      localStorage.getItem("userData") || "{}"
    );
    setUserInfo(
      userlocalStorage.accessToken
        ? jwtDecode(userlocalStorage.accessToken)?.userId
        : null
    );
  }, []);
  return { userInfo };
};

export default useUser;
