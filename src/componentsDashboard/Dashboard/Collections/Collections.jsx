import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { shades } from "../../../Theme";
import NewCollections from "./NewCollections";
import NewCategory from "./NewCategory";

export default function Collections() {


    const [isCollection, setIsCollection] = useState(true);


    return (
        <Box width='80%' m='100px auto'>
            <Paper elevation={20} sx={{
                  p: 2,
                }}>
                <Box display='flex' justifyContent='center' gap='50px'>
                    <Button
                        fullWidth
                        sx={{
                            color: shades.primary[400]
                        }}
                        variant={isCollection ? 'outlined' : 'text'}
                        onClick={() => setIsCollection(true)}
                    >
                        <Typography variant='h1'
                            fontWeight='bold'
                            fontSize='18px' gutterBottom>Collection</Typography>
                    </Button>
                    <Button
                        sx={{
                            color: shades.primary[400]
                        }}
                        fullWidth
                        variant={!isCollection ? 'outlined' : 'text'}
                        onClick={() => setIsCollection(false)}
                    >
                        <Typography variant='h1'
                            fontWeight='bold'
                            fontSize='18px' gutterBottom>Category</Typography>
                    </Button>
                </Box>
                <Box m='30px auto'>
                    {isCollection &&
                        <NewCollections />
                    }
                    {!isCollection &&
                        <NewCategory />
                    }
                </Box>
            </Paper>
        </Box>
    );
}