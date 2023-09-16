import axios from "axios";

const url = process.env.REACT_APP_API_URL;
export const fetchUser = (email, password) => {
  const data = axios.get(`${url}/users/login`, {
    params: {
      email,
      password,
    },
  });

  return data
    .then((res) => {
      //console.log(res.data);
      return res.data;
    })
    .catch((err) => console.error(err));
};
export const fetchUserById = (userId) => {
  const data = axios.get(`${url}/users/` + userId);
  return data
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => console.error(err));
};

export const postUser = (filteredValue) => {
  const data = axios.post(`${url}/users/`, filteredValue);

  return data
    .then((res) => {
      //console.log(res.data);
      return res.data;
    })
    .catch((err) => console.error(err));
};

export const fetchUsers = () => {
  const data = axios.get(`${url}/users/`);

  return data
    .then((res) => {
      //console.log(res.data);
      return res.data;
    })
    .catch((err) => console.error(err));
};
