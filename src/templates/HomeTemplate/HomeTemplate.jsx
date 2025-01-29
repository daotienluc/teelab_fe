import React from "react";
import HeaderTemplate from "./components/HeaderTemplate";
import FooterTemplate from "./components/FooterTemplate";
import Banner from "./components/Banner/Banner";
import SearchTemplate from "./components/SearchTemplate/SearchTemplate";
import Navigation from "./components/Navigation";
import AoThun from "./components/AoThun";
import AoPolo from "./components/AoPolo";
import AoHoodie from "./components/AoHoodie";
import useViewPort from "../../hooks/useViewPort";
import HeaderMobileTemplate from "./components/HeaderMobileTemplate";

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
        <AoThun />
        <AoPolo />
        <AoHoodie />
      </main>
      <FooterTemplate />
    </>
  );
};

export default HomeTemplate;
