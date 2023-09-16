import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { shades } from "../../../Theme";
import { postCategory } from "../../../api/category";
import { useDispatch } from "react-redux";
import { addToCategory } from '../../../state';

export default function NewCategory() {
    const [category, setCategory] = useState('');
    const dispatch = useDispatch();

    function handleChange(e) {
        setCategory(e.target.value);
        //console.log(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        postCategory(category)
            .then(res => dispatch(addToCategory({ category: res.name })))
            .catch(err => console.log(err));
    }


    return (
        <Box
            component="form" onSubmit={handleSubmit}
        >
            <Box width='50%' margin='auto'>
                <TextField fullWidth
                    required
                    id="name"
                    label="Category"
                    name="category"
                    value={category}
                    autoComplete="category"
                    onChange={handleChange}
                    autoFocus
                    sx={{ gridColumn: 'span 4' }}
                />
            </Box>
            <Box width='25%' margin='10px auto'>
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
                >Post Category
                </Button>
            </Box>
        </Box>
    )
}