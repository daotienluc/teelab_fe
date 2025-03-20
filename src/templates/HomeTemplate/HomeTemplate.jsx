import React from "react";
import HeaderTemplate from "./components/HeaderTemplate";
import FooterTemplate from "./components/FooterTemplate";
import Banner from "./components/Banner/Banner";
import SearchTemplate from "./components/SearchTemplate/SearchTemplate";
import Navigation from "./components/Navigation";
import useViewPort from "../../hooks/useViewPort";
import HeaderMobileTemplate from "./components/HeaderMobileTemplate";
import AllProducts from "./components/AllProducts";

const HomeTemplate = () => {
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
      <main className="overflow-hidden">
        <Navigation />
        <Banner />
        <AllProducts />
      </main>
      <FooterTemplate />
    </>
  );
};

export default HomeTemplate;
