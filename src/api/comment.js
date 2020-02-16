// imports
import baseURL from "../assets/baseURL";
import axios from "axios";
import QueryString from "query-string";

import { getAuthToken } from "../api/storage";

export const getAllCommentsByBlogId = async id => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${baseURL}/blog/${id}/comment`, {
      headers: {
        Authorization: token
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addCommentToBlog = async (body, blogId) => {
  try {
    const token = await getAuthToken();
    const response = await axios.post(
      `${baseURL}/blog/${blogId}/comment`,
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
