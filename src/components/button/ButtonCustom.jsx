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

export const ButtonSolid = ({
  content,
  type,
  className,
  variant = "solid",
  handleClick,
}) => {
  return (
    <Button
      type={type}
      color="default"
      variant={variant}
      onClick={handleClick}
      className={`uppercase ${className}`}
    >
      {content}
    </Button>
  );
};
