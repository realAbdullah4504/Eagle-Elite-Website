import axios from "axios";

const url=process.env.REACT_APP_API_URL;
export const postCart = (filtered) => {
    const data = axios.post(`${url}/cart/`, filtered)

    return data.then(res => {
        //console.log(res.data);
        return res.data;
    })
        .catch(err => console.error(err));
}

export const fetchCartByUserId = (userId) => {
    const data = axios.get(`${url}/cart/` + userId)

    return data.then(res => {
        //console.log(res.data);
        return res.data;
    })
        .catch(err => console.error(err));

}
export const fetchOrderByCartId = (userId) => {
    const data =axios.get(`${url}/cart/order/` + userId)

    return data.then(res => {
        //console.log(res.data);
        return res.data;
    })
        .catch(err => console.error(err));

}
export const fetchOrders=()=>{
    const data =axios.get(`${url}/cart/`)

    return data.then(res => {
        //console.log(res.data);
        return res.data;
    })
        .catch(err => console.error(err));
}
export const postEditOrderStatus = (orderStatus,id) => {
    //console.log(orderStatus);
    const data =axios.post(`${url}/cart/order/` + id, {name:orderStatus})
    //console.log(filteredValue);
    return data.then(res => {
        //console.log(res.data);
        return res.data;
    })
        .catch(err => console.error(err));
}