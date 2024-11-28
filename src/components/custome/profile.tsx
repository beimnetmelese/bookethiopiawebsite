import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
} from "@chakra-ui/react";
import apiClient from "../service/api-client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MdPowerSettingsNew } from "react-icons/md";

interface User {
  id: number;
  profile: string;
  first_name: string;
  last_name: string;
  phone: null;
  username: string;
  email: string;
  sex: string;
  is_hotel_manager: boolean;
}

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const getUserFunction = () => {
    return apiClient
      .get("/auth/users/me/", { headers: { Authorization: `JWT ${token}` } })
      .then((res) => res.data);
  };
  const { data } = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: getUserFunction,
  });
  return (
    <>
      <Card
        boxShadow="3px 3px 3px 3px #B0B0B0"
        bg={"#F5F5F5"}
        marginLeft={"10%"}
        marginRight={"15%"}
        width={"80%"}
        marginTop={"100px"}
      >
        <Image
          marginTop={"10px"}
          borderRadius={"80%"}
          marginLeft={"30%"}
          boxSize={"40%"}
          src={data?.profile}
        />
        <CardBody>
          <Text color={"black"}>First Name: {data?.first_name} </Text>
          <hr />
          <Text color={"black"}>Last Name: {data?.last_name} </Text>
          <hr />
          <Text color={"black"}>Email: {data?.email} </Text>
          <hr />
          <Text color={"black"}>Username: {data?.username} </Text>
          <hr />
          <Text color={"black"}>Phone: +{data?.phone} </Text>
          <hr />
          <Text color={"black"}>Sex: {data?.sex} </Text>
          <hr />
        </CardBody>
        <CardFooter>
          <Button
            marginLeft={"5px"}
            colorScheme="red"
            bg={"#FF4D4D"}
            color={"white"}
            width={"100%"}
            boxShadow="3px 3px 3px 3px #B0B0B0"
            onClick={() => {
              localStorage.removeItem("accessToken");
              navigate("/");
              window.location.reload();
            }}
            leftIcon={<MdPowerSettingsNew />}
          >
            Log Out
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default Profile;
