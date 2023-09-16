import axios from 'axios';
const url=process.env.REACT_APP_API_URL;
export const fetchCategory = () => {
    const data = axios.get(`${url}/category/`)

    return data.then(response => {
        //console.log(response.data)
        return response.data;
    })
        .catch(error => console.error(error));
}
export const postCategory=(category)=>{
    const data = axios.post(`${url}/category/`, {
        name: category
    })
    //console.log(filteredValue);
    return data.then(res => {
        //console.log(res.data);
        return res.data;
    })
        .catch(err => console.error(err));
}