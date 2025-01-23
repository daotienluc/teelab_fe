import React from "react";
import HeaderTemplate from "../../templates/HomeTemplate/components/HeaderTemplate";
import SearchTemplate from "../../templates/HomeTemplate/components/SearchTemplate/SearchTemplate";
import Navigation from "../../templates/HomeTemplate/components/Navigation";
import { Outlet } from "react-router-dom";
import FooterTemplate from "../../templates/HomeTemplate/components/FooterTemplate";

const DetailTemplate = () => {
  return (
    <>
      <SearchTemplate />
      <HeaderTemplate />
      <Navigation />
      <Outlet />
      <FooterTemplate />
    </>
  );
};

export default DetailTemplate;
