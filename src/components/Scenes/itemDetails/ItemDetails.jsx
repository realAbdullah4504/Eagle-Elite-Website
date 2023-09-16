import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Box, Typography, Tabs, Tab,Paper } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from '../../../Theme';
import { addToCart, removeFromCart } from '../../../state';
import { useParams, useLocation } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Products from '../../Products';
import { fetchItem } from '../../../api/items';

export default function ItemDetails() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.items);
    const { itemId } = useParams();
    const [value, setValue] = useState('description');
    const [count, setCount] = useState(1);
    const [item, setItem] = useState({
        _id: '',
        attributes: {
            name: '',
            image: '',
            description: '',
            noInStock: 0,
            price: 0,
            category: ''

        }
    });
    //const [items, setItems] = useState([]);
    //console.log(itemId);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const ScrollToTop = () => {
        const { path } = useLocation();
        useEffect(() => {
            window.scrollTo(0, 0);
        }, [path])
    }
    useEffect(() => {
        //console.log(itemId);
        fetchItem(itemId)
            .then((response) => {
                setItem(response);
                //console.log(response);
            })
            .catch(err => console.error(err));
    }, [itemId]);


    return (
        <Box width='80%' m='80px auto'>
            <ScrollToTop />
            <Box display='flex' flexWrap='wrap' columnGap='40px'>
                {/*Images*/}

                    <Box flex='1 1 40%' mb='40px'>
                    <Paper elevation={24}>
                        <img alt={item.attributes.name}
                            src={item.attributes.image}
                            width='100%'
                            height='100%'
                            style={{ objectFit: 'contain' }} />
                    </Paper>
                    </Box>
                
                {/*Actions*/}
                <Box flex='1 1 50%' mb='40px'>
                    <Box display='flex' justifyContent='space-between'>
                        <Box>Home/Item</Box>
                        <Box>Prev Next</Box>
                    </Box>
                    <Box m='65px 0 25px 0'>
                        <Typography variant='h3'>{item.attributes.name}</Typography>
                        <Typography>${item.attributes.price}</Typography>
                        <Typography sx={{ mt: '20px' }}>{item.attributes.description}</Typography>
                    </Box>
                    <Box display='flex' alignItems='center' minHeight='50px'>
                        <Box display='flex'
                            alignItems='center'
                            border={`1,5px solid ${shades.neutral[300]}`}
                            mr='20px'
                            p='2px 5px'>

                            <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography>{count}</Typography>
                            <IconButton onClick={() => {
                                const filteredItem = items.filter(i => i._id === item._id)
                                    .map(i => i.attributes.noInStocks)
                                //console.log(filteredItem);

                                if (count < filteredItem)
                                    setCount(count + 1)
                                else alert(`Maximum stocks: ${filteredItem}`)
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
                    <Box>
                        <Box m='20px 0 5px 0' display='flex'>
                            <FavoriteBorderIcon />
                            <Typography sx={{ ml: '5px' }}>Add to Wishlist</Typography>
                        </Box>
                        <Typography>Categories:{item.attributes.category}</Typography>
                    </Box>
                </Box>
            </Box>
            {/*Informations */}
            <Box m='20px 0'>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label='DESCRIPTION' value='description' />
                    <Tab label='REVIEWS' value='reviews' />
                </Tabs>
            </Box>
            <Box display='flex' flexWrap='wrap' gap='15px'>
                {value === 'description' && (
                    <div>{item.attributes.description}</div>
                )}
                {value === 'reviews' && (
                    <div>reviews</div>
                )}
            </Box>

            {/*Related items*/}
            <Box mt='50px' width='100%'>
                <Typography variant='h3' fontWeight='bold'> Related Products</Typography>
                <Box mt='20px'
                    display='flex'
                    flexWrap='wrap'
                    columnGap='1.33%'
                    justifyContent='space-between'
                >
                    {items.slice(0, 4).map(item =>
                        <Products key={item._id} item={item} />
                    )}
                </Box>
            </Box>

        </Box>
    )
}