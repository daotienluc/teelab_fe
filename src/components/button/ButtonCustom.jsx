import { Link } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { Button } from "antd";

export const ButtonCustom = ({ content, className }) => {
  return (
    <Link
      to={`${pathDefault}.homePage`}
      className={`text-[#333333] hover:text-[#999999] ${className}`}
    >
      {content}
    </Link>
  );
};

export const ButtonSolid = ({ content, className, variant = "solid" }) => {
  return (
    <Button
      color="default"
      variant={variant}
      className={`uppercase ${className}`}
    >
      {content}
    </Button>
  );
};
