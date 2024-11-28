import {
  Box,
  Button,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Text,
} from "@chakra-ui/react";
import logo from "../../assets/photo.png";

import { Link } from "react-router-dom";
import LogIn from "./logIn";
import Register from "./register";
import HotelCreate from "./hotelCreate";
import RoomCreate from "./roomCreate";
import ContactUs from "./contactUs";
import { HamburgerIcon } from "@chakra-ui/icons";

import UseAuth from "../service/useAuth";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../service/api-client";

interface Hotel {
  id: number;
  name: string;
}

interface User {
  id: number;
  profile: string;
  first_name: string;
  last_name: string;
  phone: null;
  email: string;
  sex: string;
  is_hotel_manager: boolean;
  hotel: Hotel;
}

function NavBar() {
  const { user } = UseAuth();
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
      <HStack justifyContent={"space-between"}>
        <Show below={"lg"}>
          <Menu>
            <MenuButton as={Button}>
              <HamburgerIcon fontSize={"20px"} />
            </MenuButton>
            <MenuList color={"white"} sx={{ bg: "#219B9D" }}>
              <MenuItem bg={"#219B9D"}>
                <Link to={""}>
                  <Box>
                    <Text color={"white"} fontSize={"16px"}>
                      <HStack>
                        <Text color={"white"} fontSize={"16px"}>
                          Home
                        </Text>
                      </HStack>
                    </Text>
                  </Box>
                </Link>
              </MenuItem>
              {user && (
                <>
                  {!data?.is_hotel_manager && (
                    <>
                      <MenuItem bg={"#219B9D"}>
                        <Link to={"booked-hotel"}>
                          <Box>
                            <Text color={"white"} fontSize={"16px"}>
                              <HStack>
                                <Text color={"white"} fontSize={"16px"}>
                                  Booked Hotel
                                </Text>
                              </HStack>
                            </Text>
                          </Box>
                        </Link>
                      </MenuItem>
                    </>
                  )}
                </>
              )}

              {user && (
                <>
                  {data?.is_hotel_manager && (
                    <>
                      <MenuItem bg={"#219B9D"}>
                        <Link to={"hotel-creater-detail"}>
                          <Box>
                            <Text color={"white"} fontSize={"16px"}>
                              <HStack>
                                <Text color={"white"} fontSize={"16px"}>
                                  Hotel Info
                                </Text>
                              </HStack>
                            </Text>
                          </Box>
                        </Link>
                      </MenuItem>
                      <MenuItem bg={"#219B9D"}>
                        <Link to={"booked-user"}>
                          <Box>
                            <Text color={"white"} fontSize={"16px"}>
                              <HStack>
                                <Text color={"white"} fontSize={"16px"}>
                                  Booked User
                                </Text>
                              </HStack>
                            </Text>
                          </Box>
                        </Link>
                      </MenuItem>
                      {!data?.hotel && (
                        <MenuItem bg={"#219B9D"}>
                          <Box>
                            <HotelCreate />
                          </Box>
                        </MenuItem>
                      )}

                      <MenuItem bg={"#219B9D"}>
                        <Box>
                          <RoomCreate />
                        </Box>
                      </MenuItem>
                    </>
                  )}
                </>
              )}

              <MenuItem bg={"#219B9D"}>
                <Box>
                  <ContactUs />
                </Box>
              </MenuItem>
              {user && (
                <MenuItem bg={"#219B9D"}>
                  <Link to={"profile"}>
                    <Box>
                      <HStack>
                        <Text color={"white"} fontSize={"16px"}>
                          Profile
                        </Text>
                      </HStack>
                    </Box>
                  </Link>
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Show>
        <HStack spacing={"30px"}>
          <Image src={logo} boxSize={"60px"} />
          <Show above={"lg"}>
            <>
              <Link to={""}>
                <Text color={"white"} fontSize={"16px"}>
                  <HStack>
                    <Text color={"white"} fontSize={"16px"}>
                      Home
                    </Text>
                  </HStack>
                </Text>
              </Link>
              {user && (
                <>
                  {!data?.is_hotel_manager && (
                    <>
                      <Link to={"booked-hotel"}>
                        <Text color={"white"} fontSize={"16px"}>
                          <HStack>
                            <Text color={"white"} fontSize={"16px"}>
                              Booked Hotel
                            </Text>
                          </HStack>
                        </Text>
                      </Link>
                    </>
                  )}
                </>
              )}
              {user && (
                <>
                  {data?.is_hotel_manager && (
                    <>
                      <Link to={"hotel-creater-detail"}>
                        <Text color={"white"} fontSize={"16px"}>
                          <HStack>
                            <Text color={"white"} fontSize={"16px"}>
                              Hotel Info
                            </Text>
                          </HStack>
                        </Text>
                      </Link>
                      <Link to={"booked-user"}>
                        <Text color={"white"} fontSize={"16px"}>
                          <HStack>
                            <Text color={"white"} fontSize={"16px"}>
                              Booked User
                            </Text>
                          </HStack>
                        </Text>
                      </Link>
                      {!data?.hotel && <HotelCreate />}
                      <RoomCreate />{" "}
                    </>
                  )}
                </>
              )}

              <ContactUs />
            </>
          </Show>
        </HStack>
        <Show above={"lg"}>
          {user && (
            <Link to={"profile"}>
              <Image
                src={data?.profile}
                boxSize={"60px"}
                borderRadius={"50%"}
              />
            </Link>
          )}
        </Show>

        {!user && (
          <>
            <HStack spacing={"10px"}>
              <LogIn />
              <Register />
            </HStack>
          </>
        )}
      </HStack>
    </>
  );
}

export default NavBar;
