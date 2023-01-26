import { Flex, Grid, Image, Text } from "@chakra-ui/react";
import HomeImg from "assets/image/online-e.png";

import DefaultBtn from "components/ui/defaultBtn";
import useAppRouter from "hooks/useAppRouter";

const Home = () => {
  const { router } = useAppRouter();

  const getStartHandle = () => {
    router.push("/login");
  };

  return (
    <Grid templateColumns={"1.5fr 1fr"} alignContent={"center"}>
      <Flex>
        <Image src={HomeImg.src} w={"100%"} alt="landing image" />
      </Flex>
      <Flex
        justifyContent={"center"}
        flexDir={"column"}
        ps={"36px"}
        rowGap={"24px"}
      >
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eos
          blanditiis adipisci odit sunt temporibus, ducimus quaerat hic eligendi
          laboriosam! Ut esse recusandae sint culpa quidem, nostrum soluta nam
          fuga.
        </Text>
        <DefaultBtn
          title="Get Start"
          customStyles={{ w: "30%" }}
          onClick={getStartHandle}
        />
      </Flex>
    </Grid>
  );
};

export default Home;
