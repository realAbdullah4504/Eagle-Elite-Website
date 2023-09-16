import React, { useEffect, useState } from "react";
import { Box, Typography, Grid} from "@mui/material";
import { useParams } from "react-router-dom";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import styles from "@emotion/styled";
import { shades } from "../../Theme";
import { fetchOrderByCartId, fetchCartByUserId } from "../../api/carts";
import { fetchUserById } from "../../api/users";

import OrderProductList from "./OrderProductsList";


export default function OrdersHistory() {
    const FlexBox = styles(Box)`
    display:flex;
    justify-content: space-between;
    align-items: center;
    `;

    const { userId } = useParams();


    const [ordersId, setOrdersId] = useState([{
        id: '',
        date: new Date()
    }])
    const [user, setUser] = useState({
        email: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        street1: ''
    })
    const [order, setOrder] = useState({
        userId: '',
        products: [],
        totalAmount: 0,
        orderStatus: ''
    });
    useEffect(() => {
        fetchCartByUserId(userId)
            .then(res => {
                //console.log(res);
                const filteredData = res.map(cart => (
                    {
                        id: cart._id,
                        date: new Date(cart.createdAt)

                    }
                ));

                fetchUserById(userId)
                    .then(res1 => {
                        setUser({
                            email: res1.email,
                            phoneNumber: res1.phoneNumber,
                            firstName: res1.billingAddress.firstName,
                            lastName: res1.billingAddress.lastName,
                            street1: res1.billingAddress.street1
                        })
                    })
                    .catch(err => console.error(err));

                // setUser({
                //     email:res
                // }
                //console.log(filteredData);
                setOrdersId(filteredData.reverse());
            })
            .catch((err) => console.error(err));
    }, [userId])

    function handleChange(e) {
        const id = e.target.value;

        fetchOrderByCartId(id)
            .then(res => {
                //console.log(res.data);
                setOrder(res);
            })
            .catch(err => console.error(err));

        //console.log(e.target.value);
    }


    return (
        <Box width='80%' m='100px auto'>
            <Box>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} >
                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            User Details
                        </Typography>
                        <Typography gutterBottom>Name:{`${user.firstName} ${user.lastName}`}</Typography>
                        <Typography gutterBottom>Email:{user.email}</Typography>
                        <Typography gutterBottom>Phone No:{user.phoneNumber}</Typography>
                        <Typography gutterBottom>Address:{user.street1}</Typography>
                    </Grid>
                </Grid>
            </Box>


            <Box width='25%' m='25px 0'>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Orders History</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue=''
                        label="Orders History"
                        onChange={handleChange}>

                        {ordersId.map(order =>
                            <MenuItem key={order.id} value={order.id}>{order.date.toDateString()}</MenuItem>
                        )}
                    </Select>
                </FormControl>

            </Box>
            <Box m='30px 30px'>
                <Grid container spacing={2}>

                    {order.products.map(product =>
                        <OrderProductList key={product._id} product={product} />
                    )}
                </Grid>
                
            </Box>
            {/* actions */}
            <Box m='20px 0'>
                <FlexBox m='20px 0'>
                    <Typography variant="h3" fontWeight='bold'>Order Status:</Typography>
                    <Typography fontWeight='bold' sx={{ fontSize: 16, color: shades.secondary[400] }}>{order.orderStatus}</Typography>
                    <Typography variant="h3" fontWeight='bold'>Sub Total:</Typography>
                    <Typography fontWeight='bold' sx={{ fontSize: 16, color: shades.secondary[400] }}>{order.totalAmount}$</Typography>
                </FlexBox>
            </Box>
        </Box>
    )
}