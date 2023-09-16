import { Box, InputBase, Divider, Typography, IconButton } from "@mui/material";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { useState } from "react";

export default function Subscribe() {
    const [email, setEmail] = useState('');
    return (
        <Box width='80%'
            margin='80px auto'
            textAlign='center'>
            <IconButton>
                <MarkEmailReadIcon fontSize='large' />
            </IconButton>
            <Typography variant='h3'>Subscribe To Our Newsletter</Typography>
            <Typography>and recieve $20</Typography>
            <Box p='2px 4px'
                m='15px auto'
                display='flex'
                alignItems='center'
                width='75%'
                backgroundColor='#F2F2F2'>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Enter your email address"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical"/>
                <Typography sx={{p:'10px','&:hover':{cursor:'pointer'}}}>Subscribe</Typography>
            </Box>
        </Box>
    )
}