import { Flex, Heading, Text } from "@chakra-ui/react";
import DefaultBtn from "components/ui/defaultBtn";
import {
  inter_400_16_22,
  inter_400_18_25,
  inter_600_24_32,
} from "../../../styles/fontStyles";

const Notes = () => {
  return (
    <Flex p={"32px 64px"}>
      <Flex
        w={"100%"}
        minW={"320px"}
        p={"12px"}
        h={"calc(100vh - 141px - 64px)"}
        border={"1px solid #89b0ae"}
        borderRadius={"5px"}
        flexDir={"column"}
        rowGap={"12px"}
      >
        <Flex
          flexDir={"column"}
          pt={"32px"}
          pb={"24px"}
          ps={"32px"}
          pe={"12px"}
          bg={"#faf9f9"}
          color={"#2c2f3a"}
          h={"100%"}
          borderRadius={"5px"}
          boxShadow={"0px 0px 10px #000000"}
          w={"100%"}
          rowGap={"24px"}
          justifyContent={"space-between"}
        >
          <Heading
            as={"h4"}
            {...inter_600_24_32}
            textAlign={"center"}
            me={"20px"}
          >
            Lorem ipsum dolor sit, amet officia!
          </Heading>
          <Flex
            flexDir={"column"}
            rowGap={"24px"}
            overflowY={"auto"}
            pe={"20px"}
          >
            <Text {...inter_400_18_25}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              corporis ad est earum. Nihil, ad iure! Velit et quam, aliquam cum
              molestiae esse dolor ipsam ipsa excepturi tempora possimus
              provident animi corporis eum expedita? Velit nihil tempore
              cupiditate ducimus assumenda fugit beatae soluta voluptatibus
              culpa, dolorum nesciunt, molestias quaerat maiores, quibusdam
              laborum! Consectetur atque vel nisi voluptatem. Ullam eum suscipit
              asperiores quam deleniti, tempore incidunt, praesentium, tempora
              sit qui eos adipisci ratione cumque alias porro voluptates
              excepturi. Soluta facere illo neque nemo voluptas, quasi est
              similique eos, iste eum doloremque. Facere modi, corporis ut
              nostrum praesentium dolore sequi possimus necessitatibus? Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Quas corporis
              ad est earum. Nihil, ad iure! Velit et quam, aliquam cum molestiae
              esse dolor ipsam ipsa excepturi tempora possimus provident animi
              corporis eum expedita? Velit nihil tempore cupiditate ducimus
              assumenda fugit beatae soluta voluptatibus culpa, dolorum
              nesciunt, molestias quaerat maiores, quibusdam laborum!
              Consectetur atque vel nisi voluptatem. Ullam eum suscipit
              asperiores quam deleniti, tempore incidunt, praesentium, tempora
              sit qui eos adipisci ratione cumque alias porro voluptates
              excepturi. Soluta facere illo neque nemo voluptas, quasi est
              similique eos, iste eum doloremque. Facere modi, corporis ut
              nostrum praesentium dolore sequi possimus necessitatibus? Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Quas corporis
              ad est earum. Nihil, ad iure! Velit et quam, aliquam cum molestiae
              esse dolor ipsam ipsa excepturi tempora possimus provident animi
              corporis eum expedita? Velit nihil tempore cupiditate ducimus
              assumenda fugit beatae soluta voluptatibus culpa, dolorum
              nesciunt, molestias quaerat maiores, quibusdam laborum!
              Consectetur atque vel nisi voluptatem. Ullam eum suscipit
              asperiores quam deleniti, tempore incidunt, praesentium, tempora
              sit qui eos adipisci ratione cumque alias porro voluptates
              excepturi. Soluta facere illo neque nemo voluptas, quasi est
              similique eos, iste eum doloremque. Facere modi, corporis ut
              nostrum praesentium dolore sequi possimus necessitatibus?
            </Text>
          </Flex>
          <Flex alignItems={"center"} justifyContent={"end"}>
            <Text {...inter_400_16_22} color={"#62677f77"}>
              Note by {"user"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Notes;
