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
  Text,
  Spinner,
} from "@chakra-ui/react";
import apiClient from "../service/api-client";
import { FaSignInAlt } from "react-icons/fa";
import { useForm as useReactHookForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "./errorMessage";

interface FormData {
  username: string;
  password: string;
}

interface FetchResponse {
  access: string;
  refresh: string;
}

const LogIn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [logInError, setLogInError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useReactHookForm<FormData>();
  const [sendData, setSendData] = useState(false);
  const navigate = useNavigate();
  const sendForm = useMutation({
    mutationFn: (data: FormData) => {
      return apiClient
        .post<FetchResponse>("/auth/jwt/create", data)
        .then((res) => res.data);
    },
    onMutate: () => {
      setSendData(true);
    },
    onSuccess: (jwt) => {
      localStorage.setItem("accessToken", jwt.access);
      onClose();
      setLogInError(false);
      setSendData(false);
      navigate("/");
      window.location.reload();
    },
    onError: () => {
      setSendData(false);
      setLogInError(true);
    },
  });
  return (
    <>
      <Button
        className="button"
        boxShadow="3px 3px 3px 3px #B0B0B0"
        borderRadius={"10px"}
        bg={"white"}
        fontSize={"14px"}
        color={"black"}
        onClick={onOpen}
        leftIcon={<FaSignInAlt size={14} />}
      >
        Log In
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#F5F5F5"} color={"black"} borderRadius={"20px"}>
          <ModalHeader>Log In</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit((data) => sendForm.mutate(data))}>
            <ModalBody>
              <Stack spacing={4}>
                <Input
                  {...register("username", { required: true })}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  placeholder="Username"
                  _placeholder={{ color: "gray" }}
                  type="username"
                />
                {errors.username?.type === "required" && (
                  <Text color="red.500">this field is required</Text>
                )}
                <Input
                  {...register("password", { required: true })}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  placeholder="Password"
                  _placeholder={{ color: "gray" }}
                  type="password"
                />
                {errors.password?.type === "required" && (
                  <Text color="red.500">this field is required</Text>
                )}
              </Stack>
              {logInError && (
                <ErrorMessage description="Incorrect username or password. Please Try Again" />
              )}
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
                >
                  Log In
                </Button>
              ) : (
                <Spinner />
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogIn;
