import React from "react";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../Theme";
import { removeFromCart, increaseCount, decreaseCount } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import Addicon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@emotion/styled";



export default function CartList() {

    const FlexBox = styles(Box)`
    display:flex;
    justify-content: space-between;
    align-items: center;
    `;
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const items = useSelector((state) => state.cart.items);
    const totalPrice = cart.reduce((total, item) => {
        return total + item.attributes.count * item.attributes.price;
    }, 0);
    //console.log(cart);


    return (
        <Box>
            <Box>
                {cart.map((item) =>
                    <Box key={item._id}>
                        <FlexBox p='15px 0'>
                            <Box flex='1 1 10%'>
                                <img  alt='img'
                                    width='123px'
                                    height='164px'
                                    src={item.attributes.image} />
                            </Box>

                            <Box flex=' 1 1 60%'>
                                {/*item name*/}
                                <FlexBox mb='5px' ml='15px'>
                                    <Typography fontWeight='bold'>{item.attributes.name}</Typography>
                                    <IconButton onClick={() => {
                                        //console.log(cart)
                                        dispatch(removeFromCart({ id: item._id }))
                                    }}
                                    >
                                        <CloseIcon /></IconButton>
                                </FlexBox>
                                <Typography ml='15px'>{item.attributes.description.substring(0, 25) + " ..."}</Typography>

                                {/*Amount*/}
                                <FlexBox m='15px 15px'>
                                    <Box
                                        display='flex'
                                        alignItems='center'
                                        border={`1.5px solid ${shades.neutral[500]}`} >

                                        <IconButton onClick={() => dispatch(decreaseCount({ id: item._id }))}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography>{item.attributes.count}</Typography>
                                        <IconButton onClick={() => {
                                            const filteredItem = items.filter(i => i._id === item._id)
                                                .map(i => i.attributes.noInStocks)
                                            //console.log(filteredItem);

                                            if (item.attributes.count < filteredItem)
                                                dispatch(increaseCount({ id: item._id }))
                                            else alert(`Maximum stocks: ${filteredItem}`)
                                        }}>
                                            <Addicon />
                                        </IconButton>
                                    </Box>
                                </FlexBox>
                                {/* price*/}
                                <FlexBox mb='5px' ml='15px'>
                                    <Typography variant="h3" fontWeight='bold'>Price:</Typography>
                                    <Typography fontWeight='bold' sx={{ fontSize: 16, color: shades.secondary[400] }}>{item.attributes.price * item.attributes.count}$</Typography>
                                </FlexBox>
                            </Box>
                        </FlexBox>
                        <Divider />
                    </Box>
                )}


            </Box>
            {/* actions */}
            <Box m='20px 0' >
                <FlexBox m='20px 0'>
                    <Typography variant="h3" fontWeight='bold' >Sub Total</Typography>
                    <Typography fontWeight='bold' sx={{ fontSize: 16, color: shades.secondary[400] }}>{totalPrice}$</Typography>
                </FlexBox>
            </Box>
        </Box>

    )
}