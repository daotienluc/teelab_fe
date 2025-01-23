import React from "react";
import { Icons } from "../../../components/icons/Icons";

const FooterTemplate = () => {
  return (
    <footer className="bg-black text-white container">
      <div className="grid grid-cols-12 py-10">
        <div className="col-span-3">
          <Icons.LogoFooter />
        </div>
        <div className="col-span-5"></div>
        <div className="col-span-5"></div>
        <div className="col-span-2"></div>
      </div>
    </footer>
  );
};

export default FooterTemplate;
