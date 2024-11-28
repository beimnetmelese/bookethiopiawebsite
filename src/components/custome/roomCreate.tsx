import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Stack,
  HStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { MdHotel } from "react-icons/md";
import apiClient from "../service/api-client";
import { useState } from "react";

interface FormData {
  id: number;
  title: string;
  descriptions: string | null;
  price: number;
  size: number;
  image: FileList | null;
}

const RoomCreate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const [sendData, setSendData] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const token = localStorage.getItem("accessToken");
  const sendForm = useMutation({
    mutationFn: (data: FormData) => {
      const formData = new FormData();
      formData.append("title", data.title);
      if (data.descriptions) formData.append("descriptions", data.descriptions);
      formData.append("price", data.price.toString());
      formData.append("size", data.size.toString());
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      return apiClient
        .post("/room/", formData, {
          headers: { Authorization: `JWT ${token}` },
        })
        .then((res) => res.data);
    },
    onMutate: () => {
      setSendData(true);
    },
    onSuccess: () => {
      onClose();
      reset();
      setSendData(false);
      onOpen2();
    },
  });
  return (
    <>
      <Text onClick={onOpen} color={"white"} fontSize={"16px"}>
        <HStack>
          <Text color={"white"} fontSize={"16px"}>
            Room Create
          </Text>
        </HStack>
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color={"black"} bg={"#F5F5F5"} borderRadius={"20px"}>
          <ModalHeader>Room Create</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit((data) => sendForm.mutate(data))}>
            <ModalBody>
              <Stack spacing={4}>
                <Input
                  {...register("title", { required: true })}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  _placeholder={{ color: "gray" }}
                  placeholder="Title"
                />
                {errors.title?.type === "required" && (
                  <Text color="red.500">this field is required</Text>
                )}
                <Input
                  {...register("descriptions")}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  _placeholder={{ color: "gray" }}
                  placeholder="Descriptions"
                />

                <Input
                  {...register("price", { required: true })}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  _placeholder={{ color: "gray" }}
                  placeholder="Price"
                  type="number"
                  step={"any"}
                />
                {errors.price?.type === "required" && (
                  <Text color="red.500">this field is required</Text>
                )}
                <Input
                  {...register("size", { required: true })}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  _placeholder={{ color: "gray" }}
                  placeholder="Size"
                  type="number"
                />
                {errors.size?.type === "required" && (
                  <Text color="red.500">this field is required</Text>
                )}
                <Input
                  {...register("image", { required: true })}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  _placeholder={{ color: "gray" }}
                  placeholder="Image"
                  type="file"
                  accept="image/*"
                  borderRadius="md"
                  padding="5px"
                  _hover={{ borderColor: "teal.500" }}
                  _focus={{
                    borderColor: "teal.500",
                    boxShadow: "0 0 0 1px teal",
                  }}
                />
                {errors.image?.type === "required" && (
                  <Text color="red.500">this field is required</Text>
                )}
              </Stack>
            </ModalBody>

            <ModalFooter>
              {!sendData ? (
                <Button
                  type="submit"
                  colorScheme="green"
                  bg={"#219B9D"}
                  color={"white"}
                  boxShadow="3px 3px 3px 3px #B0B0B0"
                  width={"100%"}
                  leftIcon={<MdHotel />}
                >
                  Room Create
                </Button>
              ) : (
                <Spinner />
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent
          width={"100%"}
          bg={"#F5F5F5"}
          color={"black"}
          borderRadius={"20px"}
        >
          <ModalHeader>Room Created Successfully !</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            Room created successfully! 🛏️ You can now view or update the room
            details
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RoomCreate;
