import { createBrowserRouter } from "react-router-dom";
import LayOut from "../custome/layout";
import Home from "../custome/home";
import HotelDetail from "../custome/hotelDetail";
import RoomDetail from "../custome/roomDetail";
import BookedHotel from "../custome/bookedHotel";
import BookedUser from "../custome/bookedUser";
import Profile from "../custome/profile";
import HotelCreateDetail from "../custome/hotelCreaterDetail";

const route = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      { path: "", element: <Home /> },
      { path: "hotel/:id", element: <HotelDetail /> },
      { path: "hotel/:id/room/:roomid", element: <RoomDetail /> },
      { path: "booked-hotel", element: <BookedHotel /> },
      { path: "booked-user", element: <BookedUser /> },
      { path: "profile", element: <Profile /> },
      { path: "hotel-creater-detail", element: <HotelCreateDetail /> },
    ],
  },
]);

export default route;
