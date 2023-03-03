import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AppChildrensType from "types/app_props_type";
import Footer from "./footer";
import Header from "./header";

const Layout: React.FC<AppChildrensType> = ({ children }) => {
  const router = useRouter();

  return (
    <Flex flexDir={"column"} m={"0 auto"} maxWidth={"1440px"}>
      <Header />
      <Flex
        id={"layout"}
        pos={"relative"}
        flexDir={"column"}
        mt={"70px"}
        minH={"calc(100vh - 70px - 70px)"}
        px={{ base: "16px", lg: "32px" }}
        justifyContent={router.pathname === "/" ? "center" : "start"}
      >
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
