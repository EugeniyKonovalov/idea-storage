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
        bg={"#62677f"}
        border={"none"}
        borderRadius={"0px"}
        mx={{ base: "10px" }}
      >
        <ModalCloseButton color={"#629390"} />

        <ModalBody p={"0"}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
