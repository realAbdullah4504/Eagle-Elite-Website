import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import styles from "@emotion/styled";

import { shades } from "../../../Theme";
import { fetchOrderByCartId, fetchCartByUserId } from "../../../api/carts";
import OrderProductList from "../../../components/global/OrderProductsList";


export default function CustomerOrdersList({ customer }) {
    const FlexBox = styles(Box)`
    display:flex;
    justify-content: space-between;
    align-items: center;
    `;


    const [ordersId, setOrdersId] = useState([{
        id: '',
        date: new Date()
    }])

    const [order, setOrder] = useState({
        userId: '',
        products: [],
        totalAmount: 0,
        orderStatus: ''
    });
    useEffect(() => {
        fetchCartByUserId(customer.id)
            .then(res => {
                console.log(res);
                const filteredData = res.map(cart => (
                    {
                        id: cart._id,
                        date: new Date(cart.createdAt)

                    }
                ));

                setOrdersId(filteredData.reverse());
            })
            .catch((err) => console.error(err));
    }, [customer.id])

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
        <Box width='90%' m='10px auto'>

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
            <Grid container spacing={3}>

                {order.products.map(product =>
                    <OrderProductList key={product._id} product={product} />
                )}


            </Grid>
            </Box>
            <Box >
                <FlexBox >
                    <Typography variant="h6" fontWeight='bold'>Order Status:</Typography>
                    <Typography fontWeight='bold' sx={{ fontSize: 14, color: shades.secondary[400] }}>{order.orderStatus}</Typography>
                    <Typography variant="h6" fontWeight='bold'>Sub Total:</Typography>
                    <Typography fontWeight='bold' sx={{ fontSize: 14, color: shades.secondary[400] }}>{order.totalAmount}$</Typography>
                </FlexBox>
            </Box>

        </Box>
    )
}