import {
  Grid,
  GridItem,
  HStack,
  Text,
  Image,
  SimpleGrid,
  Card,
  CardBody,
  Show,
  Spinner,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import apiClient from "../service/api-client";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "./errorMessage";
import IsLoading from "./isLoading";
import { useState } from "react";

interface User {
  id: number;
  profile: string;
  first_name: string;
  last_name: string;
  phone: null;
  email: string;
  is_hotel_manager: boolean;
}

interface Room {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;
}

interface Hotel {
  id: number;
  user: User;
  name: string;
  image: string;
  hotel_detail: string;
  city: string;
  rating: number;
  longtide: number;
  latitude: number;
  room: Room[];
}

interface ReviewAndRate {
  id: number;
  user: User;
  rate: number;
  comment: string;
}

function HotelCreateDetail() {
  const array = [1, 2, 3, 4];
  const [hotel_id, setHotelId] = useState(0);
  const token = localStorage.getItem("accessToken");

  const hotelQueryFunction = () => {
    apiClient
      .get<Hotel[]>("/hoteluser/", {
        headers: { Authorization: `JWT ${token}` },
      })
      .then((res) => setHotelId(res.data[0].id));
    return apiClient
      .get("/hotel/" + hotel_id, {
        headers: { Authorization: `JWT ${token}` },
      })
      .then((res) => res.data);
  };

  const hotelCommentQueryFunction = () => {
    return apiClient
      .get("/hotel/" + hotel_id + "/rate")
      .then((res) => res.data);
  };

  const { data, error, isLoading } = useQuery<Hotel, Error>({
    queryKey: ["hotel", hotel_id],
    queryFn: hotelQueryFunction,
  });

  const {
    data: comment,
    error: errorComment,
    isLoading: isCommentLoading,
  } = useQuery<ReviewAndRate[], Error>({
    queryKey: ["hotel", hotel_id, "rate"],
    queryFn: hotelCommentQueryFunction,
  });

  return (
    <>
      <Grid
        templateAreas={{
          base: `"left" "main"`,
          lg: `"left right" "main main"`,
        }}
      >
        <GridItem margin={"30px"} area={"left"}>
          {isLoading && <Spinner margin={"30%"} boxSize={"100px"} />}
          {error && <ErrorMessage description={error.message} />}
          <Text
            margin={"10px"}
            marginBottom={"10px"}
            color={"black"}
            fontSize={"20px"}
            fontWeight={"bold"}
          >
            {data?.name}
          </Text>

          <Text
            margin={"10px"}
            color={"black"}
            textAlign="justify"
            fontSize={"18px"}
          >
            {data?.hotel_detail}
          </Text>
          <HStack justifyContent={"space-between"} margin={"10px"}>
            <HStack>
              <Text fontSize={"25px"} fontWeight={"bold"} color={"black"}>
                Rate:{" "}
              </Text>
              {data && (
                <>
                  <FaStar
                    size={"24px"}
                    color={data.rating > 1 ? "yellow" : "black"}
                  />
                  <FaStar
                    size={"24px"}
                    color={data.rating > 3 ? "yellow" : "black"}
                  />
                  <FaStar
                    size={"24px"}
                    color={data.rating > 5 ? "yellow" : "black"}
                  />
                  <FaStar
                    size={"24px"}
                    color={data.rating > 7 ? "yellow" : "black"}
                  />
                  <FaStar
                    size={"24px"}
                    color={data.rating > 9 ? "yellow" : "black"}
                  />
                </>
              )}

              <Text
                fontSize={"25px"}
                fontWeight={"bold"}
                color={"black"}
                margin={"10px"}
              >
                {data?.rating}
              </Text>
            </HStack>
          </HStack>
        </GridItem>
        <Show above={"lg"}>
          <GridItem margin={"30px"} area={"right"}>
            <HStack>
              <Image
                boxShadow={"lg"}
                src={
                  "https://bookethiopiabackend.pythonanywhere.com/" +
                  data?.image
                }
                borderBottomLeftRadius={"200px"}
                borderBottomRightRadius={"200px"}
                borderTopRadius={"20px"}
                boxSize={"250px"}
              />
            </HStack>
          </GridItem>
        </Show>

        <GridItem margin={"30px"} area={"main"}>
          <Show below={"lg"}>
            <Image
              boxShadow={"lg"}
              src={
                "https://bookethiopiabackend.pythonanywhere.com/" + data?.image
              }
              marginLeft={"10px"}
              marginBottom={"15px"}
              borderBottomLeftRadius={"60px"}
              borderBottomRightRadius={"60px"}
              borderTopRadius={"20px"}
              boxSize={"400px"}
            />
          </Show>
          <Text color={"#4C1F7A"} fontSize={"24px"} fontWeight={"bold"}>
            Rooms
          </Text>
          {error && <ErrorMessage description={error.message} />}
          {data?.room.length === 0 && (
            <Text margin={"20px"}>No Room in this Hotel</Text>
          )}

          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} padding="10px">
            {isLoading && array.map((i) => <IsLoading key={i} />)}
            {data?.room.map((item) => (
              <Link to={`/hotel/${hotel_id}/room/${item.id}`}>
                <Card
                  bg={"#F5F5F5"}
                  className="card"
                  maxW="sm"
                  borderRadius="20px"
                  overflow="hidden"
                  boxShadow="3px 3px 3px 3px #B0B0B0"
                  borderColor={"white"}
                  margin={"20px"}
                >
                  <Image
                    src={
                      "https://bookethiopiabackend.pythonanywhere.com/" +
                      item.image
                    }
                  />{" "}
                  <CardBody>
                    <Text marginBottom={"10px"} color={"black"}>
                      {item.title}
                    </Text>{" "}
                    <HStack
                      marginBottom={"10px"}
                      justifyContent={"space-between"}
                    >
                      <HStack>
                        <FaStar
                          size={"24px"}
                          color={item?.rating > 1 ? "yellow" : "black"}
                        />
                        <FaStar
                          size={"24px"}
                          color={item.rating > 3 ? "yellow" : "black"}
                        />
                        <FaStar
                          size={"24px"}
                          color={item.rating > 5 ? "yellow" : "black"}
                        />
                        <FaStar
                          size={"24px"}
                          color={item.rating > 7 ? "yellow" : "black"}
                        />
                        <FaStar
                          size={"24px"}
                          color={item.rating > 9 ? "yellow" : "black"}
                        />
                      </HStack>

                      <Text color={"black"}>{item.rating}</Text>
                    </HStack>
                    <Text color={"black"}>Price: ${item.price}</Text>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </SimpleGrid>

          <Text color={"black"} fontSize={"24px"} fontWeight={"bold"}>
            Rate And Review
          </Text>
          {errorComment && <ErrorMessage description={errorComment.message} />}
          {comment?.length === 0 && (
            <Text color={"black"} margin={"20px"}>
              No Review for this Hotel
            </Text>
          )}
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 3 }} padding="10px">
            {isCommentLoading && array.map((i) => <IsLoading key={i} />)}
            {comment?.map((item) => (
              <Card
                bg={"#F5F5F5"}
                maxW="sm"
                borderRadius="20px"
                overflow="hidden"
                boxShadow="3px 3px 3px 3px #B0B0B0"
                borderColor={"white"}
                margin={"20px"}
                className="card"
              >
                <HStack>
                  <Image
                    marginLeft={"10px"}
                    borderRadius={"50px"}
                    boxSize={"80px"}
                    src={
                      "https://bookethiopiabackend.pythonanywhere.com/" +
                      item.user.profile
                    }
                  />
                  <CardBody>
                    <Text marginBottom={"10px"} color={"black"}>
                      {item.user.first_name} {item.user.last_name}
                    </Text>
                    <HStack
                      marginTop={"10px"}
                      marginBottom={"10px"}
                      justifyContent={"space-between"}
                    >
                      <HStack>
                        <FaStar
                          size={"24px"}
                          color={item.rate / 2 > 1 ? "yellow" : "black"}
                        />
                        <FaStar
                          size={"24px"}
                          color={item.rate / 2 > 2 ? "yellow" : "black"}
                        />
                        <FaStar
                          size={"24px"}
                          color={item.rate / 2 > 3 ? "yellow" : "black"}
                        />
                        <FaStar
                          size={"24px"}
                          color={item.rate / 2 > 4 ? "yellow" : "black"}
                        />
                        <FaStar
                          size={"24px"}
                          color={item.rate / 2 >= 5 ? "yellow" : "black"}
                        />
                      </HStack>
                    </HStack>
                    <Text marginBottom={"5px"} color={"black"}>
                      {item.comment}
                    </Text>
                  </CardBody>
                </HStack>
              </Card>
            ))}
          </SimpleGrid>
        </GridItem>
      </Grid>
    </>
  );
}

export default HotelCreateDetail;
