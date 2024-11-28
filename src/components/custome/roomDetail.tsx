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
  useDisclosure,
  ModalBody,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import apiClient from "../service/api-client";
import IsLoading from "./isLoading";
import ErrorMessage from "./errorMessage";
import UseAuth from "../service/useAuth";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

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
  user: User;
  title: string;
  image: string;
  descriptions: string;
  size: number;
  rating: number;
  price: number;
}
interface isAllowed {
  id: number;
  isallowed1: boolean;
  isallowed2: boolean;
}
interface RoomSize {
  id: number;
  room_size: number;
}

interface ReviewAndRate {
  id: number;
  user: User;
  rate: number;
  comment: string;
}

interface FormData {
  id: number;
  rate: number;
  comment: string | null;
}

interface Form2Data {
  date_booked: string;
}

function RoomDetail() {
  const array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const [roomDate, setRoomDate] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const [bookError, setBookError] = useState(false);
  const params = useParams();
  const [sendData, setSendData] = useState(false);
  const [sendData2, setSendData2] = useState(false);
  const room_id = params.roomid;
  const ref = useRef<HTMLInputElement>(null);
  const { user } = UseAuth();
  const [star, setStar] = useState(0);
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
  const roomQueryFunction = () => {
    return apiClient.get("/room/" + room_id).then((res) => res.data);
  };

  const roomCommentQueryFunction = () => {
    return apiClient.get("/room/" + room_id + "/rate").then((res) => res.data);
  };

  const { data, error, isLoading } = useQuery<Room, Error>({
    queryKey: ["room", room_id],
    queryFn: roomQueryFunction,
  });

  const {
    data: comment,
    error: errorComment,
    isLoading: isCommentLoading,
  } = useQuery<ReviewAndRate[], Error>({
    queryKey: ["room", room_id, "rate"],
    queryFn: roomCommentQueryFunction,
  });

  const { register, handleSubmit, reset } = useForm<FormData>();

  const sendForm = useMutation({
    mutationFn: (data: FormData) => {
      return apiClient
        .post("/room/" + room_id + "/rate/", data, {
          headers: { Authorization: `JWT ${token}` },
        })
        .then((res) => res.data);
    },
    onMutate: () => {
      setSendData(true);
    },
    onSuccess: () => {
      reset();
      setSendData(false);
      setStar(0);
      window.location.reload();
    },
  });

  const sendForm2 = useMutation({
    mutationFn: (data: Form2Data) => {
      return apiClient
        .post("/room/" + room_id + "/book/", data, {
          headers: { Authorization: `JWT ${token}` },
        })
        .then((res) => res.data);
    },
    onMutate: () => {
      setSendData2(true);
    },
    onSuccess: () => {
      setBookError(false);
      setSendData2(false);
      onClose();
      reset();
      onOpen2();
    },
  });
  const isRoomRateAllowed = () => {
    return apiClient
      .get("/is_room_rate_allowed/" + room_id + "/", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((res) => res.data);
  };

  const { data: isAllowed } = useQuery<isAllowed[], Error>({
    queryKey: ["isallowed"],
    queryFn: isRoomRateAllowed,
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
            color={"black"}
            fontSize={"20px"}
            fontWeight={"bold"}
            whiteSpace={"nowrap"}
          >
            {data?.title}
          </Text>

          <Text
            margin={"10px"}
            color={"black"}
            marginTop={"20px"}
            textAlign="justify"
            fontSize={"18px"}
          >
            {data?.descriptions}
          </Text>
          <Text
            margin={"10px"}
            color={"black"}
            marginTop={"20px"}
            fontSize={"20px"}
            fontWeight={"bold"}
          >
            Price: ${data?.price}
          </Text>
          <HStack
            marginTop={"30px"}
            justifyContent={"space-between"}
            margin={"10px"}
          >
            <HStack>
              <Text fontSize={"20px"} fontWeight={"bold"} color={"black"}>
                Rate:{" "}
              </Text>
              {data && (
                <>
                  <FaStar
                    size={"24px"}
                    color={data.rating > 1 ? "yellow" : undefined}
                  />
                  <FaStar
                    size={"24px"}
                    color={data.rating > 3 ? "yellow" : undefined}
                  />
                  <FaStar
                    size={"24px"}
                    color={data.rating > 5 ? "yellow" : undefined}
                  />
                  <FaStar
                    size={"24px"}
                    color={data.rating > 7 ? "yellow" : undefined}
                  />
                  <FaStar
                    size={"24px"}
                    color={data.rating > 9 ? "yellow" : undefined}
                  />
                </>
              )}
              <Text
                fontSize={"20px"}
                fontWeight={"bold"}
                color={"black"}
                margin={"10px"}
              >
                {data?.rating}
              </Text>
            </HStack>
          </HStack>
          {user && (
            <>
              {!userData?.is_hotel_manager && (
                <>
                  {" "}
                  <Button
                    color={"white"}
                    borderRadius={"30px"}
                    bg={"#219B9D"}
                    width={"150px"}
                    fontSize={"16px"}
                    boxShadow="3px 3px 3px 3px #B0B0B0"
                    marginTop={"10px"}
                    marginLeft={"25%"}
                    leftIcon={<FaUserPlus size={16} color="white" />}
                    onClick={onOpen}
                    sx={{
                      _hover: {
                        bg: "#219B9D",
                      },
                    }}
                  >
                    Book
                  </Button>
                </>
              )}
            </>
          )}
        </GridItem>
        <Show above={"lg"}>
          <GridItem margin={"30px"} area={"right"}>
            <HStack>
              <Image
                marginRight={"0px"}
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

        <GridItem margin={"30px"} area={"main"}>
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
              boxSize={"250px"}
            />
          </Show>
          <Text
            margin={"10px"}
            color={"black"}
            fontSize={"24px"}
            fontWeight={"bold"}
          >
            Rate And Review
          </Text>

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
                                color={"black"}
                                borderColor={"black"}
                                size={"md"}
                                bg={"#F5F5F5"}
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
          {errorComment && <ErrorMessage description={errorComment.message} />}
          {comment?.length === 0 && (
            <Text color={"black"} margin={"10px"}>
              No Review for this room
            </Text>
          )}
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 3 }} padding="10px">
            {isCommentLoading && array.map((i) => <IsLoading key={i} />)}
            {comment?.map((item) => (
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#F5F5F5"} color={"black"} borderRadius={"20px"}>
          <ModalHeader>Book</ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              apiClient
                .get<RoomSize[]>("/book/" + room_id + "/" + roomDate)
                .then((res) => {
                  const roomSize = res.data[0].room_size;
                  if (roomSize <= 0) {
                    setBookError(true);
                  } else {
                    sendForm2.mutate({ date_booked: roomDate });
                  }
                });
            }}
          >
            <ModalBody>
              <Stack spacing={4}>
                <Input
                  borderColor={"black"}
                  color={"balck"}
                  ref={ref}
                  type="date"
                  sx={{
                    "::-webkit-calendar-picker-indicator": {
                      color: "transparent",
                      backgroundColor: "black",
                      borderRadius: "40%",
                      padding: "5px",
                      cursor: "pointer",
                    },
                  }}
                />
                {bookError && (
                  <ErrorMessage description="Sorry, this room is fully booked for the selected date. Please choose another date or explore other available rooms" />
                )}
              </Stack>
            </ModalBody>

            <ModalFooter>
              {!sendData2 ? (
                <Button
                  type="submit"
                  colorScheme="green"
                  bg={"#219B9D"}
                  color={"white"}
                  width={"100%"}
                  boxShadow="3px 3px 3px 3px #B0B0B0"
                  onClick={() => {
                    if (ref.current) setRoomDate(ref.current?.value);
                  }}
                >
                  Book
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
          <ModalHeader>Book Successfully !</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            Booking successful! 🎉 You can view your booking status in the
            'Booked Hotels' section.
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RoomDetail;
