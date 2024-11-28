import {
  Grid,
  GridItem,
  HStack,
  Text,
  Image,
  SimpleGrid,
  VStack,
  Button,
  Textarea,
  Card,
  CardBody,
  Show,
  Spinner,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import apiClient from "../service/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorMessage from "./errorMessage";
import IsLoading from "./isLoading";
import UseAuth from "../service/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

interface isAllowed {
  id: number;
  isallowed1: boolean;
  isallowed2: boolean;
}

interface FormData {
  id: number;
  rate: number;
  comment: string | null;
}

function HotelDetail() {
  const array = [1, 2, 3, 4];
  const params = useParams();
  const hotel_id = params.id;
  const [sendData, setSendData] = useState(false);
  const [star, setStar] = useState(0);
  const { user } = UseAuth();
  const token = localStorage.getItem("accessToken");
  const getUserFunction = () => {
    return apiClient
      .get("/auth/users/me/", { headers: { Authorization: `JWT ${token}` } })
      .then((res) => res.data);
  };
  const { data: userData } = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: getUserFunction,
  });
  const hotelQueryFunction = () => {
    return apiClient.get("/hotel/" + hotel_id).then((res) => res.data);
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

  const { register, handleSubmit, reset } = useForm<FormData>();

  const sendForm = useMutation({
    mutationFn: (data: FormData) => {
      return apiClient
        .post("/hotel/" + hotel_id + "/rate/", data, {
          headers: { Authorization: `JWT ${token}` },
        })
        .then((res) => res.data);
    },
    onMutate: () => {
      setSendData(true);
    },
    onSuccess: () => {
      reset();
      setStar(0);
      setSendData(false);
      window.location.reload();
    },
  });

  const {
    data: comment,
    error: errorComment,
    isLoading: isCommentLoading,
  } = useQuery<ReviewAndRate[], Error>({
    queryKey: ["hotel", hotel_id, "rate"],
    queryFn: hotelCommentQueryFunction,
  });

  const isHotelRateAllowed = () => {
    return apiClient
      .get("/is_hotel_rate_allowed/" + hotel_id + "/", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((res) => res.data);
  };

  const { data: isAllowed } = useQuery<isAllowed[], Error>({
    queryKey: ["isallow"],
    queryFn: isHotelRateAllowed,
  });
  return (
    <>
      <Grid
        templateAreas={{
          base: `"left" "main"`,
          lg: `"left right" "main main"`,
        }}
      >
        <GridItem margin={"30px"} marginLeft={"10px"} area={"left"}>
          {isLoading && <Spinner margin={"30%"} boxSize={"100px"} />}
          {error && <ErrorMessage description={error.message} />}
          <Text
            marginBottom={"30px"}
            margin={"10px"}
            color={"black"}
            fontSize={"25px"}
            fontWeight={"bold"}
          >
            {data?.name}
          </Text>

          <Text
            margin={"10px"}
            color={"black"}
            textAlign="justify"
            marginRight={"30px"}
            fontSize={"18px"}
          >
            {data?.hotel_detail}
          </Text>
          <HStack
            marginTop={"30px"}
            justifyContent={"space-between"}
            margin={"10px"}
          >
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
                marginTop={"30px"}
                margin={"10px"}
              >
                {data?.rating}
              </Text>
            </HStack>
          </HStack>
        </GridItem>
        <Show above={"lg"}>
          <GridItem margin={"30px"} marginLeft={"10px"} area={"right"}>
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
                boxSize={"600px"}
              />
            </HStack>
          </GridItem>
        </Show>

        <GridItem margin={"30px"} marginLeft={"10px"} area={"main"}>
          <Show below={"lg"}>
            <Image
              boxShadow={"lg"}
              src={
                "https://bookethiopiabackend.pythonanywhere.com/" + data?.image
              }
              marginLeft={"10px"}
              marginBottom={"15px"}
              marginRight={"40px"}
              borderBottomLeftRadius={"60px"}
              borderBottomRightRadius={"60px"}
              borderTopRadius={"20px"}
              boxSize={"270px"}
            />
          </Show>
          <Text
            margin={"10px"}
            color={"black"}
            fontSize={"24px"}
            fontWeight={"bold"}
          >
            Rooms
          </Text>
          {error && <ErrorMessage description={error.message} />}
          {data?.room.length === 0 && (
            <Text color={"black"} margin={"20px"}>
              No Room in this Hotel
            </Text>
          )}

          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} padding="10px">
            {isLoading && array.map((i) => <IsLoading key={i} />)}
            {data?.room.map((item) => (
              <Link to={`room/${item.id}`}>
                <Card
                  bg={"#F5F5F5"}
                  className="card"
                  maxW="sm"
                  borderRadius="20px"
                  overflow="hidden"
                  boxShadow="3px 3px 3px 3px #B0B0B0"
                  borderColor={"white"}
                  margin={"10px"}
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
          {user && (
            <>
              {isAllowed?.[0].isallowed1 && (
                <>
                  {isAllowed?.[0].isallowed2 && (
                    <>
                      {!userData?.is_hotel_manager && (
                        <>
                          <form
                            onSubmit={handleSubmit((data) => {
                              sendForm.mutate({ ...data, rate: 2 * star });
                            })}
                          >
                            <HStack margin={"10px"}>
                              <Textarea
                                {...register("comment")}
                                color={"#4C1F7A"}
                                borderColor={"#4C1F7A"}
                                size={"md"}
                                bg={"#F5F5F5"}
                                borderRadius={"3px"}
                                placeholder="Review"
                                _placeholder={{ color: "grey" }}
                                width={"100%"}
                              />
                              <VStack>
                                <HStack margin={"10px"}>
                                  <FaStar
                                    size={"20px"}
                                    color={star >= 1 ? "yellow" : "black"}
                                    onClick={() => setStar(1)}
                                  />
                                  <FaStar
                                    size={"20px"}
                                    color={star >= 2 ? "yellow" : "black"}
                                    onClick={() => setStar(2)}
                                  />
                                  <FaStar
                                    size={"20px"}
                                    color={star >= 3 ? "yellow" : "black"}
                                    onClick={() => setStar(3)}
                                  />
                                  <FaStar
                                    size={"20px"}
                                    color={star >= 4 ? "yellow" : "black"}
                                    onClick={() => setStar(4)}
                                  />
                                  <FaStar
                                    size={"20px"}
                                    color={star >= 5 ? "yellow" : "black"}
                                    onClick={() => setStar(5)}
                                  />
                                </HStack>
                                {!sendData ? (
                                  <Button
                                    type="submit"
                                    color={"white"}
                                    borderRadius={"20px"}
                                    boxShadow="3px 3px 3px 3px #B0B0B0"
                                    bg={"#219B9D"}
                                    sx={{
                                      _hover: {
                                        bg: "#219B9D",
                                      },
                                    }}
                                  >
                                    Rate and Review
                                  </Button>
                                ) : (
                                  <Spinner />
                                )}
                              </VStack>
                            </HStack>
                          </form>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
          <Text
            margin={"10px"}
            color={"black"}
            fontSize={"24px"}
            fontWeight={"bold"}
          >
            Rate And Review
          </Text>
          {errorComment && <ErrorMessage description={errorComment.message} />}
          {comment?.length === 0 && (
            <Text color={"black"} margin={"10px"}>
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
                margin={"10px"}
                className="card"
              >
                <HStack>
                  <Image
                    marginLeft={"10px"}
                    borderRadius={"30px"}
                    boxSize={"60px"}
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
                          size={"18px"}
                          color={item.rate / 2 > 1 ? "yellow" : "black"}
                        />
                        <FaStar
                          size={"18px"}
                          color={item.rate / 2 > 2 ? "yellow" : "black"}
                        />
                        <FaStar
                          size={"18px"}
                          color={item.rate / 2 > 3 ? "yellow" : "black"}
                        />
                        <FaStar
                          size={"18px"}
                          color={item.rate / 2 > 4 ? "yellow" : "black"}
                        />
                        <FaStar
                          size={"18px"}
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

export default HotelDetail;
