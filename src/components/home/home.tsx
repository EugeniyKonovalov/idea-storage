import { Flex, Grid, Image, Text } from "@chakra-ui/react";
import HomeImg from "assets/image/online-e.png";

import DefaultBtn from "components/ui/defaultBtn";
import useAppRouter from "hooks/useAppRouter";

const Home = () => {
  const { router } = useAppRouter();

  const getStartHandle = () => {
    router.push("/sign_up");
  };

  return (
    <Grid templateColumns={"1.2fr 1fr"} alignContent={"center"}>
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
          Here you can add your idea and notes about anything or anyone.
        </Text>
        <Text> Just add to folders and nest them inside each other.</Text>
        <Text>
          And you will always be able to find them organized and easily
          accessible!
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
