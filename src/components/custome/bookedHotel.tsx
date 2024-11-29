import {
  Card,
  HStack,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
  Image,
  Button,
  Spinner,
} from "@chakra-ui/react";
import apiClient from "../service/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorMessage from "./errorMessage";
import { useState } from "react";

interface User {
  id: number;
  profile: string;
  first_name: string;
  last_name: string;
  phone: null;
  email: string;
}

interface Room {
  id: number;
  hotel: Hotel;
  title: string;
  size: number;
  price: number;
}

interface Hotel {
  id: number;
  name: string;
  city: string;
}

interface Book {
  id: number;
  user: User;
  room: Room;
  hotel: Hotel;
  date_booked: string;
}

function BookedHotel() {
  const array = [1, 2, 3, 4, 5, 6];
  const [sendData, setSendData] = useState(false);
  const token = localStorage.getItem("accessToken");
  const getBookFunction = () => {
    return apiClient
      .get("/book/", { headers: { Authorization: `JWT ${token}` } })
      .then((res) => res.data);
  };
  const { data, isLoading, error } = useQuery<Book[], Error>({
    queryKey: ["book"],
    queryFn: getBookFunction,
  });

  const sendForm = useMutation({
    mutationFn: (data: number) => {
      return apiClient
        .delete("/unbook/" + data + "/", {
          headers: { Authorization: `JWT ${token}` },
        })
        .then((res) => res.data);
    },
    onMutate: () => {
      setSendData(true);
    },
    onSuccess: () => {
      setSendData(false);
      window.location.reload();
    },
    onError: () => {
      setSendData(false);
    },
  });
  return (
    <>
      {error && <ErrorMessage description={error.message} />}
      {data?.length === 0 && <Text margin={"20px"}>No Booked Hotel</Text>}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 3 }} padding="10px">
        {isLoading &&
          array.map((i) => (
            <>
              <Card
                bg={"#F5F5F5"}
                key={i}
                maxW={"md"}
                borderRadius="20px"
                overflow="hidden"
                boxShadow="lg"
                margin={"20px"}
                padding={"10px"}
                className="card"
              >
                <Skeleton height={200}></Skeleton>
              </Card>
            </>
          ))}
        {data?.map((item) => (
          <Card
            boxShadow="3px 3px 3px 3px #B0B0B0"
            bg={"#F5F5F5"}
            maxW={"md"}
            borderRadius="20px"
            overflow="hidden"
            margin={"20px"}
            padding={"40px"}
            className="card"
          >
            <Image
              marginX={"40%"}
              boxSize={"80px"}
              borderRadius={"40px"}
              src={item.user.profile}
            />
            <HStack justifyContent={"space-between"}>
              <VStack>
                <Text
                  fontWeight={"bold"}
                  margin={"10px"}
                  color={"black"}
                  fontSize={"16px"}
                >
                  Hotel
                </Text>
                <Text color={"black"}>{item.room.hotel.name}</Text>
              </VStack>
              <VStack>
                <Text
                  fontWeight={"bold"}
                  margin={"10px"}
                  color={"black"}
                  fontSize={"16px"}
                >
                  Room
                </Text>
                <Text color={"black"}>{item.room.title}</Text>
              </VStack>
            </HStack>

            <HStack justifyContent={"space-between"}>
              <VStack>
                <Text
                  fontWeight={"bold"}
                  margin={"10px"}
                  color={"black"}
                  fontSize={"16px"}
                >
                  Price
                </Text>
                <Text color={"black"}>{item.room.price}$</Text>
              </VStack>
              <VStack>
                <Text
                  fontWeight={"bold"}
                  margin={"10px"}
                  color={"black"}
                  fontSize={"16px"}
                >
                  Date
                </Text>
                <Text color={"black"}>{item.date_booked}</Text>
              </VStack>
            </HStack>
            {!sendData ? (
              <Button
                type="submit"
                colorScheme="green"
                bg={"#219B9D"}
                marginTop={"20px"}
                color={"white"}
                width={"100%"}
                boxShadow="3px 3px 3px 3px #B0B0B0"
                onClick={() => sendForm.mutate(item.id)}
              >
                Unbook
              </Button>
            ) : (
              <Spinner />
            )}
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}

export default BookedHotel;
