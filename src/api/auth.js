// imports
import baseURL from "../assets/baseURL";
import axios from "axios";
import QueryString from "query-string";

import { saveUser, deleteUser } from "../api/storage";

class Auth {
  constructor() {
    this.isAuth = false;
    this.user = null;
    this.token = null;
  }
  authenticate = async credentials => {
    try {
      const user = await axios.post(
        `${baseURL}/login`,
        QueryString.stringify(credentials),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );

      this.user = user.data.user;
      this.isAuth = true;
      this.token = user.data.token;
      await saveUser(user.data.user, user.data.token);
      return true;
    } catch (error) {
      return false;
    }
  };
}

const auth = new Auth();
export default auth;

export const registerUser = async body => {
  try {
    const response = await axios.post(
      `${baseURL}/register`,
      QueryString.stringify(body),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    if (response.status === 201) {
      window.alert(
        `Thank you ${response.data.firstname +
          " " +
          response.data.lastname} for registering, you can now login.`
      );
      return true;
    }
    return false;
  } catch (error) {
    window.alert("Something went wrong.");
  }
};

export const logoutUser = () => {
  deleteUser();
};
