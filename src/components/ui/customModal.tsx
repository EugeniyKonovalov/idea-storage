import {
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import CloseIcon from "assets/image/close-green.png";

const CustomModal = ({ children, isOpen, onClose }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        mb={"20px"}
        pos={"relative"}
        bg={"#62677f"}
        border={"none"}
        borderRadius={"5px"}
        mx={{ base: "10px" }}
      >
        <Flex
          pos={"absolute"}
          right={"0"}
          alignItems={"center"}
          justifyContent={"center"}
          _hover={{ bg: "#c6e6e011", border: "1px solid #89b0ae" }}
          borderRadius={"5px"}
          maxW={"24px"}
          mt={"12px"}
          mr={"24px"}
          h={"24px"}
          cursor={"pointer"}
          onClick={onClose}
        >
          <Image src={CloseIcon.src} w={"24px"} alt={"Close icon"} />
        </Flex>

        <ModalBody p={"0"}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
