import React from "react";
import CartList from '../global/CartList';
import { Drawer, Box, IconButton, Button, Typography } from "@mui/material";
import { setIsCartOpen } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shades } from "../../Theme";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@emotion/styled";


export default function CartMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartLength = useSelector((state) => state.cart.cart.length);
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);

    const FlexBox = styles(Box)`
    display:flex;
    justify-content: space-between;
    align-items: center;
    `;
    return (
        <Drawer anchor='right' width='100px'
            open={isCartOpen}
            onClose={() => dispatch(setIsCartOpen({}))}
        >
            {/* Modal */}
            <Box
                right='0'
                bottom='0'
                backgroundColor='white'>

                <Box padding='30px' height='100'>

                    {/*Header*/}
                    <FlexBox mb='15px'>
                        <Typography variant='h3'>Shopping  Bag ({cartLength})</Typography>
                        <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                            <CloseIcon />
                        </IconButton>
                    </FlexBox>

                    <CartList />

                    <Button sx={{
                        backgroundColor: shades.primary[400],
                        color: 'white',
                        borderRadius: 0,
                        minWidth: '100%',
                        padding: '20px 40px',
                        m: '20px 0'
                    }}
                        onClick={() => {
                            cartLength !==0 ? navigate('/checkout'):
                            alert('Cart should not be empty');
                            
                            dispatch(setIsCartOpen({}));
                        }}
                    >Checkout</Button>
                </Box>
            </Box>
        </Drawer>
    )

}