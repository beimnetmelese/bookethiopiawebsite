import { jwtDecode } from "jwt-decode";

function UseAuth() {
  let user = null;

  try {
    const token = localStorage.getItem("accessToken");
    if (token !== null) {
      user = jwtDecode(token);
    }
  } catch (error) {}
  return { user: user };
}

export default UseAuth;
