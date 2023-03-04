import { Flex, Grid, Image, Text, useMediaQuery } from "@chakra-ui/react";
import HomeImg from "assets/image/online-e.png";
import DefaultBtn from "components/ui/defaultBtn";
import useAppRouter from "hooks/useAppRouter";

const Home = () => {
  const [isTablet] = useMediaQuery("(max-width: 767px)");
  const { router } = useAppRouter();

  const getStartHandle = () => {
    router.push("/sign_up");
  };

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1.2fr 1fr" }}
      pt={{ base: "24px", md: "12px" }}
      alignContent={{ base: "start", md: "center" }}
      h={{ base: "calc(100vh - 140px)", md: "100%" }}
      bgImage={{ base: `url('${HomeImg.src}')`, md: "" }}
      bgSize={{ base: "contain", md: "" }}
      bgRepeat={{ base: "no-repeat", md: "" }}
      bgPos={{ base: "bottom right", md: "" }}
    >
      {!isTablet && (
        <Flex>
          <Image src={HomeImg.src} w={"100%"} alt="landing image" />
        </Flex>
      )}
      <Flex
        justifyContent={"center"}
        flexDir={"column"}
        ps={{ base: "0", md: "36px" }}
        rowGap={"24px"}
        fontSize={{ base: "14px", sm: "18px" }}
      >
        <Text>Hello, whoever you are.</Text>
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
          customStyles={{
            w: "40%",
            alignSelf: { base: "end", sm: "start" },
          }}
          onClick={getStartHandle}
        />
      </Flex>
    </Grid>
  );
};

export default Home;
