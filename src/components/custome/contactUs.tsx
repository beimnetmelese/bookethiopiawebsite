import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Stack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const ContactUs = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text onClick={onOpen} color={"white"} fontSize={"16px"}>
        <HStack>
          <Text color={"white"} fontSize={"16px"}>
            Contact Us
          </Text>
        </HStack>
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color={"black"} bg={"#F5F5F5"} borderRadius={"20px"}>
          <ModalHeader>Contact Us</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <HStack>
                <MdLocationOn size={24} color="red" />
                <Text margin={"5px"}>Addis Abeba Science and Technology</Text>
              </HStack>
              <hr />
              <HStack>
                <MdPhone size={24} color="red" />
                <Text margin={"5px"}>+251963653950</Text>
              </HStack>
              <hr />
              <HStack marginBottom={"5px"}>
                <MdEmail size={24} color="red" />
                <Text margin={"5px"}>beimnetmelese@gmail.com</Text>
              </HStack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContactUs;
