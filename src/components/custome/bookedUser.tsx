import {
  Card,
  SimpleGrid,
  Text,
  Skeleton,
  Image,
  HStack,
  VStack,
} from "@chakra-ui/react";
import apiClient from "../service/api-client";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "./errorMessage";

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

function BookedUser() {
  const array = [1, 2, 3, 4, 5, 6];
  const token = localStorage.getItem("accessToken");
  const getBookFunction = async (): Promise<Book[]> => {
    const hotelResponse = await apiClient.get<Hotel[]>("/hoteluser/", {
      headers: { Authorization: `JWT ${token}` },
    });
    const fetchedHotelId = hotelResponse.data[0].id;

    const bookingsResponse = await apiClient.get<Book[]>(
      `/bookuser/${fetchedHotelId}`,
      {
        headers: { Authorization: `JWT ${token}` },
      }
    );

    return bookingsResponse.data;
  };
  const { data, isLoading, error } = useQuery<Book[], Error>({
    queryKey: ["bookuser"],
    queryFn: getBookFunction,
  });

  return (
    <>
      {error && <ErrorMessage description={error.message} />}
      {data?.length === 0 && (
        <Text color={"black"} margin={"20px"}>
          No Booked User
        </Text>
      )}
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
            padding={"30px"}
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
                  First Name
                </Text>
                <Text color={"black"}>{item.user.first_name}</Text>
              </VStack>
              <VStack>
                <Text
                  fontWeight={"bold"}
                  margin={"10px"}
                  color={"black"}
                  fontSize={"16px"}
                >
                  Last Name
                </Text>
                <Text color={"black"}>{item.user.last_name}</Text>
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
                  Room
                </Text>
                <Text color={"black"}>{item.room.title}</Text>
              </VStack>
              <VStack>
                <Text
                  fontWeight={"bold"}
                  margin={"10px"}
                  color={"black"}
                  fontSize={"16px"}
                >
                  Date Booked
                </Text>
                <Text color={"black"}>{item.date_booked}</Text>
              </VStack>
            </HStack>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}

export default BookedUser;
