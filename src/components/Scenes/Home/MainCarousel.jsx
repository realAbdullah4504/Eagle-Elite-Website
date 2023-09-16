import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { shades } from "../../../Theme";
import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";

function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
}
const images = importAll(require.context('../../../assets', false, /\.(png|jpe?g|svg)$/));

export default function MainCarousel() {
    const isNonMobile = useMediaQuery("min-width:600px");

    return (
        <Carousel
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) => (
                <IconButton onClick={onClickHandler}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '0',
                        color: 'white',
                        padding: '5px',
                        zIndex: '10'
                    }}
                >
                    <NavigateBeforeIcon sx={{ fontSize: '40' }} />
                </IconButton>
            )}
            renderArrowNext={(onClickHandler, hasNext, label) => (
                <IconButton onClick={onClickHandler}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '0',
                        color: 'white',
                        padding: '5px',
                        zIndex: '10'
                    }}>
                    <NavigateNextIcon sx={{ fontSize: '40' }} />
                </IconButton>
            )}
        >
            {Object.values(images).map((texture, index) =>
                <Box key={index}>
                    <img src={texture}
                        alt={`caousel-${index}`}
                        style={{
                            width: '100%',
                            height: '700px',
                            objectFit: 'cover',
                            backgroundAttachment: 'fixed'
                        }} />
                    <Box
                        color='white'
                        padding='20px'
                        borderRadius='1px'
                        textAlign='left'
                        backgroundColor='rgba(0,0,0,0.4)'
                        position='absolute'
                        top='48px'
                        left={isNonMobile ? '10%' : '0'}
                        right={isNonMobile ? undefined : '0'}
                        margin={isNonMobile ? undefined : '0 auto'}
                        maxWidth={isNonMobile ? undefined : '240px'}
                    >
                        <Typography color={shades.secondary[200]}>--NEW ITEMS</Typography>
                        <Typography variant="h1">Summer Sale</Typography>
                        <Typography
                            fontWeight='bold'
                            color={shades.secondary}
                            sx={{ textDecoration: 'underline' }}>Discover More</Typography>
                    </Box>
                </Box>
            )}
        </Carousel>
    )
}