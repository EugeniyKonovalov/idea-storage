import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";

const CustomModal = ({ children, isOpen, onClose }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        mb={"20px"}
        pos={"relative"}
        maxW={{ base: "370px", md: "680px", xl: "fit-content" }}
        bg={"#fff"}
        borderRadius={"20px"}
        mx={{ base: "10px" }}
      >
        <ModalCloseButton color={"#9FA8C4"} mt={"10px"} mr={"10px"} />

        <ModalBody p={"0"}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
