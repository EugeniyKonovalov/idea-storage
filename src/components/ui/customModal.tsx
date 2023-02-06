import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
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
        {/* <Button
          pos={"absolute"}
          variant={"unstyled"}
          cursor={"pointer"}
          right={"0"}
          // mt={"5px"}
          // mr={"5px"}
          zIndex={1}
          onClick={onClose}
        >
          <Image src={CloseIcon.src} w={"24px"} alt="Close icon" />
        </Button> */}

        <Flex
          pos={"absolute"}
          right={"0"}
          alignItems={"center"}
          justifyContent={"center"}
          _hover={{ bg: "#c6e6e011", border: "1px solid #89b0ae" }}
          // border={"1px solid #89b0ae"}
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
