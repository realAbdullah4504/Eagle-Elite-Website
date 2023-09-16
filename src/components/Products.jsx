import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Box, Typography,Paper, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../Theme";
import { addToCart, removeFromCart } from '../state';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function Products({ item, width }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const [isHovered, setIsHovered] = useState(false);



    return (
        <Box width={width}>
            <Paper elevation={isHovered && 24}>
                <Box position='relative'
                    onMouseOver={() => setIsHovered(true)}
                    onMouseOut={() => setIsHovered(false)}
                    style={{ cursor: 'pointer' }}
                >

                    <img alt='abcd'
                        width='300px'
                        height='400px'
                        src={item.attributes.image}
                        onClick={() => navigate(`/item/${item._id}`)}
                        style={{ cursor: 'pointer' }}
                    />

                    <Box display={isHovered ? 'block' : 'none'}
                        position='absolute'
                        bottom='10%'
                        left='0'
                        width='100%'
                        padding='0 5%'
                    >
                        <Box display='flex' justifyContent='space-between'>
                            {/*amount */}
                            <Box display='flex'
                                alignItems='center'
                                backgroundColor={shades.neutral[100]}
                                borderRadius='3px'
                            >
                                <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                                    <RemoveIcon />
                                </IconButton>
                                <Typography>{count}</Typography>
                                <IconButton onClick={() => {
                                    count < item.attributes.noInStocks ?
                                        setCount(count + 1) :
                                        alert(`Maximum number of stocks ${item.attributes.noInStocks}`)
                                }}>
                                    <AddIcon />
                                </IconButton>
                            </Box>

                            {/*Buttons */}
                            <IconButton sx={{ backgroundColor: shades.primary[300], color: 'white' }}
                                aria-label="add to shopping cart"
                                onClick={() => {
                                    dispatch(removeFromCart({ id: item._id }))
                                    dispatch(addToCart({
                                        item: {
                                            ...item,
                                            attributes: {
                                                ...item.attributes,
                                                count
                                            }
                                        }
                                    }))
                                }}
                            >
                                <AddShoppingCartIcon />
                            </IconButton>
                        </Box>
                    </Box>

                </Box>
                <Grid container  textAlign='left'>
                    <Grid md={12} xs={12}>
                        <Typography gutterBottom variant="h5" >
                            {item.attributes.name}
                        </Typography>
                    </Grid>
                    <Box sx={{ display:'flex',flexDirection: 'row' }}>
                        <Typography 
                        sx={{ fontSize: 18, textDecoration: "line-through" ,fontWeight:'bold' }} 
                        color={shades.primary[400]} 
                        margin='4px'>
                            {item.attributes.price*2}$
                        </Typography>
                        <Typography sx={{ fontSize: 18 }} color={shades.secondary[400]} margin='4px'>
                            {item.attributes.price}$
                        </Typography>
                    </Box>
                </Grid>
            </Paper>
        </Box>
    );
}