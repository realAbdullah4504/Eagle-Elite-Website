import React, { useState} from "react";
import { Box, TextField,useMediaQuery, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { shades } from "../../../Theme";
import Button from '@mui/material/Button';
import { postItem } from "../../../api/items";
import { useSelector,useDispatch } from "react-redux";
import { addToItems } from "../../../state";
import { useNavigate } from "react-router-dom";

export default function NewCollections() {
    const navigate=useNavigate();
    const categories=useSelector(state=>state.cart.categories);
    const items=useSelector(state=>state.cart.items);
    const dispatch=useDispatch();
    //console.log(categories);
    const [item, setItem] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        image: '',
        noInStocks: 0
    });

    const handleChange = (e) => {
        const filteredItem = {
            ...item,
            [e.target.name]: e.target.value
        };
        setItem(filteredItem);
        //console.log(filteredItem);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(item);
        postItem(item)
            .then((res) => {
                dispatch(addToItems({item:res}));
            })
            .catch((err) => {
                console.log(err);
            });
            // setItem({
            //     name: '',
            //     description: '',
            //     price: 0,
            //     category: '',
            //     image: '',
            //     noInStocks: 0
            // });
            navigate('/dashboard/collections/list')
    };
    const isNonMobile = useMediaQuery('(min-width: 600px)');

    return (
        <Box
            component="form" onSubmit={handleSubmit}
            display='grid'
            gap='15px'
            gridTemplateColumns='repeat(4,minmax(0,1fr))'
            sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
            }}>
            <TextField fullWidth
                required
                id="name"
                label="Name"
                name="name"
                value={item.name}
                autoComplete="name"
                onChange={handleChange}
                autoFocus
                sx={{ gridColumn: 'span 4' }}
            />
            <TextField fullWidth
                required
                id="description"
                label="Description"
                name="description"
                value={item.description}
                autoComplete="description"
                onChange={handleChange}
                autoFocus
                sx={{ gridColumn: 'span 4' }}
            />
            <TextField fullWidth
                required
                type="number"
                id="noInStocks"
                label="No in stock"
                name="noInStocks"
                value={item.noInStocks}
                autoComplete="noInStocks"
                onChange={handleChange}
                autoFocus
                sx={{ gridColumn: 'span 2' }}
            />

            <TextField fullWidth
                required
                id="price"
                type="number"
                label="Price"
                name="price"
                value={item.price}
                autoComplete="price"
                onChange={handleChange}
                autoFocus
                sx={{ gridColumn: 'span 2' }}
            />
            <FormControl sx={{ gridColumn: 'span 1' }} fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Category"
                    value={item.category}
                    name='category'
                    onChange={handleChange}
                >
                    {categories.map((category, index) =>
                        <MenuItem key={index} value={category}>{category}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <TextField fullWidth
                required
                id="image"
                label="Image"
                name="image"
                value={item.image}
                autoComplete="image"
                onChange={handleChange}
                autoFocus
                sx={{ gridColumn: 'span 2' }}
            />
            <Box sx={{ gridColumn: 'span 4' }} display='flex' gap='50px'>
                <Button fullWidth
                    type='submit'
                    color='primary'
                    variant='contained'
                    sx={{
                        backgroundColor: shades.primary[400],
                        boxShadow: 'none',
                        color: 'white',
                        borderRadius: 0,
                        padding: '15px 40px'
                    }}
                >Post Collection
                </Button>
            </Box>
        </Box>
    );
}