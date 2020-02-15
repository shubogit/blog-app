// imports
import baseURL from "../assets/baseURL";
import axios from "axios";
import QueryString from "query-string";

import { getAuthToken } from "../api/storage";

export const getAllBlogs = async (limit = 20, skip = 0) => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(
      `${baseURL}/blog?limit=${limit}&skip=${skip}`,
      {
        headers: {
          Authorization: token
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createBlog = async body => {
  try {
    const token = await getAuthToken();
    const response = await axios.post(
      `${baseURL}/blog`,
      QueryString.stringify(body),
      {
        headers: {
          Authorization: token
        }
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
