import {
  Grid,
  GridItem,
  Text,
  HStack,
  Image,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  Show,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import logo from "../../assets/hotels.jpg";
import apiClient from "../service/api-client";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import FilterList from "./filterList";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "./errorMessage";
import IsLoading from "./isLoading";
import { useRef, useState } from "react";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone: null;
  email: string;
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
}

function Home() {
  const [city, setCity] = useState("");
  const array = [1, 2, 3, 4, 5];
  const ref = useRef<HTMLInputElement>(null);
  const [Search, setSearch] = useState("");
  const hotelQueryFunction = () => {
    if (city === null && Search === null) {
      return apiClient.get("/hotel").then((res) => res.data);
    } else if (city === null && Search !== null) {
      return apiClient.get("/hotel?search=" + Search).then((res) => res.data);
    } else if (city !== null && Search === null) {
      return apiClient.get("/hotel?city=" + city).then((res) => res.data);
    } else {
      return apiClient
        .get("/hotel?city=" + city + "&search=" + Search)
        .then((res) => res.data);
    }
  };

  const { data, error, isLoading } = useQuery<Hotel[], Error>({
    queryKey: ["hotel", city, Search],
    queryFn: hotelQueryFunction,
  });
  return (
    <>
      <Grid
        templateAreas={{
          base: `"left" "main"`,
          lg: `"left right" "main main"`,
        }}
        padding={"10px"}
      >
        <GridItem margin={"10px"} area={"left"}>
          <Text
            margin={"10px"}
            marginBottom={"10px"}
            color={"black"}
            fontSize={"20px"}
            fontWeight={"bold"}
            whiteSpace={"nowrap"}
          >
            Booking Ethiopia Hotel
          </Text>

          <Text
            textAlign="justify"
            margin={"10px"}
            color={"black"}
            fontSize={"18px"}
            marginRight={"30px"}
          >
            Experience Ethiopia like never before with Booking Ethiopia, your
            reliable platform for booking hotels online. We connect you with a
            variety of accommodation options—from high-end hotels in bustling
            cities like Addis Ababa to charming lodges near Ethiopia's most
            scenic locations. With simple search filters, competitive rates, and
            secure booking, you can easily plan your stay with confidence. Our
            mission is to bring Ethiopian hospitality to travelers worldwide,
            offering a trusted service that makes travel planning smooth,
            affordable, and enjoyable. Start your journey with us and discover
            the best of Ethiopia.
          </Text>
        </GridItem>

        <Show above={"lg"}>
          <GridItem margin={"30px"} area={"right"}>
            <HStack>
              <Image
                boxShadow={"lg"}
                src={logo}
                borderBottomLeftRadius={"200px"}
                borderBottomRightRadius={"200px"}
                borderTopRadius={"20px"}
                boxSize={"600px"}
              />
            </HStack>
          </GridItem>
        </Show>

        <GridItem area={"main"} margin={"10px"}>
          <Show below={"lg"}>
            <Image
              boxShadow={"lg"}
              src={logo}
              marginLeft={"10px"}
              marginRight={"30px"}
              marginBottom={"15px"}
              width={"250px"}
              borderBottomLeftRadius={"60px"}
              borderBottomRightRadius={"60px"}
              borderTopRadius={"20px"}
              height={"250px"}
            />
          </Show>
          <Text
            marginBottom={"10px"}
            color={"black"}
            fontSize={"24px"}
            fontWeight={"bold"}
          >
            Search
          </Text>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (ref.current) setSearch(ref.current?.value);
            }}
          >
            <InputGroup margin={"10px"}>
              <Input
                ref={ref}
                color={"#4C1F7A"}
                borderColor={"black"}
                placeholder="Search"
                bg={"#F5F5F5"}
                height={"50px"}
                borderRadius={"30px"}
                variant={"filled"}
                _placeholder={{ color: "grey" }}
              />
            </InputGroup>
          </form>

          <Show below={"lg"}>
            <FilterList value={city} onClick={(data) => setCity(data)} />
          </Show>

          <Show above={"lg"}>
            <Text
              margin={"10px"}
              marginBottom={"10px"}
              color={"black"}
              fontSize={"24px"}
              fontWeight={"bold"}
            >
              Filter
            </Text>
            <HStack margin={"10px"}>
              <Button
                sx={{
                  _hover: {
                    bg: "#219B9D",
                  },
                }}
                color={"black"}
                boxShadow="3px 3px 3px 3px #B0B0B0"
                borderRadius={"20px"}
                bg={city === "" ? "#219B9D" : "#F5F5F5"}
                onClick={() => setCity("")}
              >
                All
              </Button>
              <Button
                sx={{
                  _hover: {
                    bg: "#219B9D",
                  },
                }}
                color={"black"}
                boxShadow="3px 3px 3px 3px #B0B0B0"
                borderRadius={"20px"}
                bg={city === "addis abeba" ? "#219B9D" : "#F5F5F5"}
                onClick={() => setCity("addis abeba")}
              >
                Addis Abeba
              </Button>
              <Button
                sx={{
                  _hover: {
                    bg: "#219B9D",
                  },
                }}
                color={"black"}
                boxShadow="3px 3px 3px 3px #B0B0B0"
                borderRadius={"20px"}
                bg={city === "adama" ? "#219B9D" : "#F5F5F5"}
                onClick={() => setCity("adama")}
              >
                Adama
              </Button>
              <Button
                sx={{
                  _hover: {
                    bg: "#219B9D",
                  },
                }}
                color={"black"}
                boxShadow="3px 3px 3px 3px #B0B0B0"
                borderRadius={"20px"}
                bg={city === "bahirdar" ? "#219B9D" : "#F5F5F5"}
                onClick={() => setCity("bahirdar")}
              >
                Bahir Dar
              </Button>
              <Button
                sx={{
                  _hover: {
                    bg: "#219B9D",
                  },
                }}
                color={"black"}
                boxShadow="3px 3px 3px 3px #B0B0B0"
                borderRadius={"20px"}
                bg={city === "dessie" ? "#219B9D" : "#F5F5F5"}
                onClick={() => setCity("dessie")}
              >
                Dessie
              </Button>
              <Button
                sx={{
                  _hover: {
                    bg: "#219B9D",
                  },
                }}
                color={"black"}
                boxShadow="3px 3px 3px 3px #B0B0B0"
                borderRadius={"20px"}
                bg={city === "diredewa" ? "#219B9D" : "#F5F5F5"}
                onClick={() => setCity("diredewa")}
              >
                Dire Dewa
              </Button>
              <Button
                sx={{
                  _hover: {
                    bg: "#219B9D",
                  },
                }}
                color={"black"}
                boxShadow="3px 3px 3px 3px #B0B0B0"
                borderRadius={"20px"}
                bg={city === "gonder" ? "#219B9D" : "#F5F5F5"}
                onClick={() => setCity("gonder")}
              >
                Gonder
              </Button>
              <Button
                sx={{
                  _hover: {
                    bg: "#219B9D",
                  },
                }}
                color={"black"}
                boxShadow="3px 3px 3px 3px #B0B0B0"
                borderRadius={"20px"}
                bg={city === "hawassa" ? "#219B9D" : "#F5F5F5"}
                onClick={() => setCity("hawassa")}
              >
                Hawasa
              </Button>
              <Button
                sx={{
                  _hover: {
                    bg: "#219B9D",
                  },
                }}
                color={"black"}
                boxShadow="3px 3px 3px 3px #B0B0B0"
                borderRadius={"20px"}
                bg={city === "harar" ? "#219B9D" : "#F5F5F5"}
                onClick={() => setCity("harar")}
              >
                Harer
              </Button>
              <Button
                sx={{
                  _hover: {
                    bg: "#219B9D",
                  },
                }}
                color={"black"}
                boxShadow="3px 3px 3px 3px #B0B0B0"
                borderRadius={"20px"}
                bg={city === "lalibela" ? "#219B9D" : "#F5F5F5"}
                onClick={() => setCity("lalibela")}
              >
                Lalibela
              </Button>
              <Button
                boxShadow="3px 3px 3px 3px #B0B0B0"
                color={"black"}
                sx={{
                  _hover: {
                    bg: "#219B9D",
                  },
                }}
                borderRadius={"20px"}
                bg={city === "mekele" ? "#219B9D" : "#F5F5F5"}
                onClick={() => setCity("mekele")}
              >
                Mekele
              </Button>
            </HStack>
          </Show>
          {error && <ErrorMessage description={error.message} />}
          {data?.length === 0 && (
            <>
              <Text margin={"20px"}>No Hotel in this country</Text>
              <Card height={"300px"} width={"300px"} bg={"#F5F5F5"}></Card>
            </>
          )}

          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} padding="10px">
            {isLoading && array.map((i) => <IsLoading key={i} />)}

            {data?.map((item) => (
              <Link to={`/hotel/${item.id}`}>
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
                  <Image
                    src={
                      "https://bookethiopiabackend.pythonanywhere.com/" +
                      item.image
                    }
                  />
                  <CardBody>
                    <Text marginBottom={"10px"} color={"black"}>
                      {item.name}
                    </Text>
                    <HStack justifyContent={"space-between"}>
                      <HStack>
                        <FaStar
                          size={"24px"}
                          color={item.rating > 1 ? "yellow" : "black"}
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
                  </CardBody>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </GridItem>
      </Grid>
    </>
  );
}

export default Home;
