import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material';
import Products from '../../Products';
import { fetchItems } from "../../../api/items";
import { setItems } from "../../../state";


export default function ShoppingList() {
    const dispatch = useDispatch();
    const [value, setValue] = useState('all');
    const items = useSelector(state => state.cart.items);

    const isNonMobile = useMediaQuery('(min-width: 600px)');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    //console.log(items);

    useEffect(() => {
        fetchItems()
            .then((response) => dispatch(setItems({ items: response.reverse()})))
            .catch(err=>console.error(err));

    }, [dispatch]);

    const topRatedItems = items.filter(item =>
        item.attributes.category === 'topRated');
        //console.log(topRatedItems)

    const newArrivalsItems = items.filter(item =>
        item.attributes.category === 'newArrivals');

    const bestSellersItems = items.filter(item =>
        item.attributes.category === 'bestSellers');
    return (
        <Box width='80%' margin='80px auto'>
            <Typography variant='h3' textAlign='center'>
                Our Featured <b>Products</b></Typography>
            <Tabs
                textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{ sx: { display: isNonMobile ? 'block' : 'none' } }}
                sx={{
                    m: '25px',
                    '& .MuiTabs-flexContainer': {
                        flexWrap: 'wrap'
                    }
                }}>
                <Tab label='All' value='all' />
                <Tab label='NEW ARRIVALS' value='newArrivals' />
                <Tab label='BEST SELLERS' value='bestSellers' />
                <Tab label='TOP RATED' value='topRated' />
            </Tabs>
            <Box margin='0 auto'
                display='grid'
                gridTemplateColumns='repeat(auto-fill,300px)'
                justifyContent='space-around'
                rowGap='20px'
                columnGap='1.33%'
            >
                {value === 'all' && items.map(item =>
                    <Products key={item._id} item={item} />
                )}
                {value === 'bestSellers' && bestSellersItems.map(item =>
                    <Products key={item._id} item={item} />
                )}
                {value === 'newArrivals' && newArrivalsItems.map(item =>
                    <Products key={item._id} item={item} />
                )}
                {value === 'topRated' && topRatedItems.map(item =>
                    <Products key={item._id} item={item} />
                )}
            </Box>



        </Box>
    )
}