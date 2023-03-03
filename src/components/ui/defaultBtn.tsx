import { Button } from "@chakra-ui/react";
import AppChildrensType from "types/app_props_type";
import { BtnType } from "types/ui_types";

const DefaultBtn: React.FC<AppChildrensType & BtnType> = ({
  children,
  title,
  type,
  customStyles,
  onClick,
  disabled,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <Button
      type={type && type}
      bg={"#89B0AE"}
      fontSize={"18px"}
      fontWeight={"400"}
      lineHeight={"25px"}
      color={"#ced4da"}
      borderRadius={"5px"}
      px={"48px"}
      h={"40px"}
      _hover={{ bg: "#ced4da", color: "#89B0AE" }}
      _disabled={{ color: "#C4C4C4", bg: "#E7E7E7" }}
      {...customStyles}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
    >
      {children ? children : title}
    </Button>
  );
};

export default DefaultBtn;
