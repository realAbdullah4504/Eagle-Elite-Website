import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../Theme";

export default function Footer() {
    const {
        pallete: { neutral },
    } = useTheme();
    return (
        <Box mt='70px' p='40px 0' backgroundColor={neutral.light}>
            <Box
                width='80%'
                margin='auto'
                display='flex'
                justifyContent='space-between'
                flexWrap='wrap'
                rowGap='30px'
                columnGap='clamp(20px,30px,40px)'
            >
                <Box width='clamp(20%,30%,40%)'>
                    <Typography variant='h4' fontWeight='bold' color={shades.secondary[500]} mb='30px'>Ecommerce</Typography>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Velit laoreet id donec ultrices tincidunt arcu non sodales. Senectus et netus
                        et malesuada fames ac turpis egestas. At augue eget arcu dictum. Id porta nibh venenatis cras sed felis eget
                    </div>
                </Box>
                <Box>
                <Typography variant='h4' fontWeight='bold' mb='30px'>About Us</Typography>
                <Typography mb='30px'>Careers</Typography>
                <Typography mb='30px'>Track Your Order</Typography>
                <Typography mb='30px'> Corporate & Bulk purchasing</Typography>
                <Typography mb='30px'>Returns & Refunds</Typography>
                </Box>
                <Box width='clamp(20%,25%,30%)'>
                <Typography variant='h4' fontWeight='bold' color={shades.secondary[500]} mb='30px'>Contact Us</Typography>
                <Typography mb='30px'>House # 9 Muslim Town</Typography>
                <Typography mb='30px'> Email:Abdullahjavaid1@live.com</Typography>
                <Typography mb='30px'>(+92)-310-7899989</Typography>
                
            </Box>

            </Box>
        </Box>
    )
}