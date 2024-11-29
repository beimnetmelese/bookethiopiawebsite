import { ChevronDownIcon } from "@chakra-ui/icons";
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
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm as useReactHookForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa6";
import apiClient from "../service/api-client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessageArray from "./errorMessage2";

interface FormData {
  first_name: string;
  last_name: string | null;
  email: string;
  sex: string | null;
  profile: FileList | null;
  phone: number | null;
  username: string;
  password: string;
}

interface FetchResponse {
  access: string;
  refresh: string;
}

const Register = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [sendData, setSendData] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorDetail, setPasswordErrorDetail] = useState([]);
  const [EmailErrorDetail, setEmailErrorDetail] = useState([]);
  const [phoneErrorDetail, setPhoneErrorDetail] = useState([]);
  const [usernameErrorDetail, setUsernameErrorDetail] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useReactHookForm<FormData>();

  const sendForm = useMutation({
    mutationFn: (data: FormData) => {
      setEmailError(false);
      setPhoneError(false);
      setUsernameError(false);
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      if (data.last_name) formData.append("last_name", data.last_name);
      formData.append("email", data.email);
      if (data.sex) formData.append("sex", data.sex);
      if (data.profile && data.profile[0]) {
        formData.append("profile", data.profile[0]);
      }
      if (data.phone) formData.append("phone", data.phone.toString());
      formData.append("username", data.username);
      formData.append("password", data.password);
      return apiClient
        .post<FetchResponse>("/auth/users/", formData)
        .then((res) => res.data);
    },
    onMutate: () => {
      setSendData(true);
    },
    onSuccess: (_, sendData) => {
      setEmailError(false);
      setPhoneError(false);
      setUsernameError(false);
      setPasswordError(false);
      setSendData(false);
      const formData = new FormData();
      formData.append("username", sendData.username);
      formData.append("password", sendData.password);
      apiClient
        .post<FetchResponse>("/auth/jwt/create", formData)
        .then((res) => {
          localStorage.setItem("accessToken", res.data.access);
          onClose();
          navigate("/");
          window.location.reload();
        });
    },
    onError: (error: any) => {
      const errorData = error.response?.data;
      setSendData(false);
      if (errorData?.username) {
        setUsernameError(true);
        setUsernameErrorDetail(errorData?.username);
      }
      if (errorData?.email) {
        setEmailError(true);
        setEmailErrorDetail(errorData?.email);
      }
      if (errorData?.phone) {
        setPhoneError(true);
        setPhoneErrorDetail(errorData?.phone);
      }
      if (errorData?.password) {
        setPasswordError(true);
        setPasswordErrorDetail(errorData?.password);
      }
    },
  });
  return (
    <>
      <Button
        className="button"
        boxShadow="3px 3px 3px 3px #B0B0B0"
        borderRadius={"10px"}
        bg={"white"}
        color={"black"}
        fontSize={"14px"}
        onClick={onOpen}
        leftIcon={<FaUserPlus size={14} />}
      >
        Register
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color={"black"} bg={"#F5F5F5"} borderRadius={"20px"}>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={handleSubmit((data) => {
              sendForm.mutate({ ...data, sex: value });
            })}
          >
            <ModalBody>
              <Stack spacing={4}>
                <Input
                  {...register("first_name", { required: true })}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  _placeholder={{ color: "gray" }}
                  placeholder="First Name"
                />
                {errors.first_name?.type === "required" && (
                  <Text color="red.500">this field is required</Text>
                )}
                <Input
                  {...register("last_name")}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  _placeholder={{ color: "gray" }}
                  placeholder="Last Name"
                />
                <Input
                  {...register("email", { required: true })}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  _placeholder={{ color: "gray" }}
                  placeholder="Email"
                  type="email"
                />
                {errors.email?.type === "required" && (
                  <Text color="red.500">this field is required</Text>
                )}
                {emailError && (
                  <ErrorMessageArray description={EmailErrorDetail} />
                )}
                <Input
                  {...register("username", { required: true })}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  _placeholder={{ color: "gray" }}
                  placeholder="Username"
                />
                {errors.username?.type === "required" && (
                  <Text color="red.500">this field is required</Text>
                )}
                {usernameError && (
                  <ErrorMessageArray description={usernameErrorDetail} />
                )}
                <Input
                  {...register("phone")}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  _placeholder={{ color: "gray" }}
                  placeholder="Phone Number"
                  type="number"
                />
                {phoneError && (
                  <ErrorMessageArray description={phoneErrorDetail} />
                )}
                <Menu>
                  <MenuButton
                    bg={"white"}
                    borderColor={"black"}
                    color={"black"}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    {value === "M" && "Male"}
                    {value === "F" && "Female"}
                    {!value && "Sex"}
                  </MenuButton>
                  <MenuList bg={"#F5F5F5"}>
                    <MenuItem bg={"#F5F5F5"} key={"man"}>
                      <Box onClick={() => setValue("M")}>Man</Box>
                    </MenuItem>
                    <MenuItem bg={"#F5F5F5"} key={"man"}>
                      <Box onClick={() => setValue("F")}>Female</Box>
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Input
                  {...register("profile")}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  _placeholder={{ color: "gray" }}
                  placeholder="Profile"
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

                <Input
                  {...register("password", { required: true })}
                  bg={"white"}
                  borderColor={"black"}
                  color={"black"}
                  _placeholder={{ color: "gray" }}
                  placeholder="Password"
                  type="password"
                />
                {passwordError && (
                  <ErrorMessageArray description={passwordErrorDetail} />
                )}
              </Stack>
              {errors.username?.type === "required" && (
                <Text color="red.500">this field is required</Text>
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
                  Register
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

export default Register;
