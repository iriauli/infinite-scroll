import axios from "axios";

// api
const API_URL = process.env.REACT_APP_SWEEFT_DIGITAL_API;

// get users
async function GetUsers(page) {
  try {
    const response = await axios.request({
      method: "GET",
      url: `${API_URL}/user/${page}/20`,
    });
    return response.data.list;
  } catch (error) {
    return error.response.data;
  }
}

// get single user
async function GetSingleUser(userId) {
  try {
    const response = await axios.request({
      method: "GET",
      url: `${API_URL}/user/${userId}`,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

// get user friends
async function GetUserFriends({ userId, pages }) {
  try {
    const response = await axios.request({
      method: "GET",
      url: `${API_URL}/user/${userId}/friends/${pages}/20`,
    });
    return response.data.list;
  } catch (error) {
    return error.response.data;
  }
}

export { GetUsers, GetSingleUser, GetUserFriends };
