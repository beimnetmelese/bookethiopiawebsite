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
  name: string;
  descriptions: string | null;
  city: string;
  longtitude: number | null;
  latitude: number | null;
  image: FileList | null;
}

const HotelCreate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [sendData, setSendData] = useState(false);
  const token = localStorage.getItem("accessToken");
  const sendForm = useMutation({
    mutationFn: (data: FormData) => {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.descriptions) formData.append("hotel_detail", data.descriptions);
      formData.append("city", data.city);
      if (data.latitude) formData.append("latitude", data.latitude.toString());
      if (data.longtitude)
        formData.append("longitude", data.longtitude.toString());
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      return apiClient
        .post("/hotel/", formData, {
          headers: { Authorization: `JWT ${token}` },
        })
        .then((res) => res.data);
    },
    onMutate: () => {
      setSendData(true);
    },
    onSuccess: () => {
      onClose();
      setSendData(false);
      reset();
      onOpen2();
    },
    onError: () => {
      setSendData(false);
    },
  });
  return (
    <>
      <Text onClick={onOpen} color={"white"} fontSize={"16px"}>
        <HStack>
          <Text color={"white"} fontSize={"16px"}>
            Hotel Create
          </Text>
        </HStack>
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color={"black"} bg={"#F5F5F5"} borderRadius={"20px"}>
          <ModalHeader>Hotel Create</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit((data) => sendForm.mutate(data))}>
            <ModalBody>
              <Stack spacing={4}>
                <Input
                  {...register("name", { required: true })}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  _placeholder={{ color: "gray" }}
                  placeholder="Name"
                />
                {errors.name?.type === "required" && (
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
                  {...register("city", { required: true })}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  _placeholder={{ color: "gray" }}
                  placeholder="City"
                />
                {errors.city?.type === "required" && (
                  <Text color="red.500">this field is required</Text>
                )}
                <Input
                  {...register("longtitude")}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  _placeholder={{ color: "gray" }}
                  placeholder="Longtitude"
                  type="number"
                  step="any"
                />
                <Input
                  {...register("latitude")}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  _placeholder={{ color: "gray" }}
                  placeholder="Latitude"
                  type="number"
                  step="any"
                />
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
      <Modal
        isOpen={isOpen2}
        onClose={() => {
          onClose2();
          window.location.reload();
        }}
      >
        <ModalOverlay />
        <ModalContent
          width={"100%"}
          bg={"#F5F5F5"}
          color={"black"}
          borderRadius={"20px"}
        >
          <ModalHeader>Hotel Created Successfully !</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            Hotel created successfully! 🎉 You can now manage your hotel details
            and add rooms.
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HotelCreate;
