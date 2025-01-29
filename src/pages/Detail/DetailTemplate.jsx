import React from "react";
import HeaderTemplate from "../../templates/HomeTemplate/components/HeaderTemplate";
import SearchTemplate from "../../templates/HomeTemplate/components/SearchTemplate/SearchTemplate";
import Navigation from "../../templates/HomeTemplate/components/Navigation";
import { Outlet } from "react-router-dom";
import FooterTemplate from "../../templates/HomeTemplate/components/FooterTemplate";
import useViewPort from "../../hooks/useViewPort";
import HeaderMobileTemplate from "../../templates/HomeTemplate/components/HeaderMobileTemplate";

const DetailTemplate = () => {
  const { width } = useViewPort();
  return (
    <>
      {width > 600 ? (
        <>
          <SearchTemplate />
          <HeaderTemplate />
        </>
      ) : (
        <HeaderMobileTemplate />
      )}
      <Navigation />
      <Outlet />
      <FooterTemplate />
    </>
  );
};

export default DetailTemplate;
