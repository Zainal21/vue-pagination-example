import axios from "axios";

export function getUsers(page = 1, term = "") {
  return axios.get(
    `http://127.0.0.1:8000/api/users?page=${page}&term=${term}`,
    {
      method: "GET",
      url: "",
      headers: {
        Accept: "application/json",
      },
    }
  );
}
