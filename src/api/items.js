import axios from "axios";

const url = process.env.REACT_APP_API_URL;
export const fetchItems = () => {
  const data = axios.get(`${url}/items/`);

  return data
    .then((response) => {
      //console.log(response.data)
      return response.data;
    })
    .catch((error) => console.error(error));
};
export const postItem = (filteredValue) => {
  const data = axios.post(`${url}/items/`, filteredValue);
  //console.log(filteredValue);
  return data
    .then((res) => {
      //console.log(res.data);
      return res.data;
    })
    .catch((err) => console.error(err));
};

export const fetchItem = (itemId) => {
  const data = axios.get(`${url}/items/` + itemId);

  return data
    .then((response) => {
      //console.log(response.data)
      return response.data;
    })
    .catch((error) => console.error(error));
};
export const postEditedItem = (filteredValue) => {
  const data = axios.post(`${url}/items/` + filteredValue.id, filteredValue);
  //console.log(filteredValue);
  return data
    .then((res) => {
      //console.log(res.data);
      return res.data;
    })
    .catch((err) => console.error(err));
};
export const deleteItem = (itemId) => {
  const data = axios.delete(`${url}/items/` + itemId);
  return data
    .then((res) => {
      //console.log(res.data);
      return res.data;
    })
    .catch((err) => console.error(err));
};
