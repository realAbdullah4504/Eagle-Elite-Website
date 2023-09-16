import React, { useState, useEffect } from 'react';

import { Box, Tabs, Tab, Button, Chip, Avatar, IconButton, Typography } from '@mui/material';
import classes from './Home.module.css';
import generalImage from "../assets/img/general-icon.png";
import sportImage from "../assets/img/sport-icon.png";
import lifestyleImage from "../assets/img/lifestyle-icon.png";
import shareImage from '../assets/img/share-icon.png';
import bookmarkImage from "../assets/img/bookmark-icon.png";
import openImage from "../assets/img/open-icon.png";
import userImage from "../assets/img/user-icon.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";





const ArticleComponent = ({ article, fetchCategories }) => {

    return (

        <div className={classes.carousel}>
            <div className={classes.topMobileSection}>
                <div className={classes.mobileCompany}>
                    <Avatar alt="news logo" variant="square" classes={{ img: classes.companyImg }} 
                    // src={checkCompanyLogo(article.company)} 
                    />
                </div>
                {/* <div className={classes.badgeSection}>
                    {
                        (article.category1 || []).map((category) => (
                            <Chip variant='outlined' label={category} key={category} />
                        ))
                    }
                </div> */}
                <Box display="flex" alignItems="center" justifyContent="flex-end">
                    <div className={classes.iconSetMobile}>
                        <IconButton edge="start" color="inherit" aria-label="menu" 
                        // onClick={handleOpenArticle}
                        >
                            <img alt="bookmark" style={{ width: '24px', height: '24px' }} src={openImage} />
                        </IconButton>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <IconButton edge="start" color="inherit" aria-label="menu" style={{ padding: '4px' }} 
                            // onClick={handleSaveArticle}
                            >
                                <img alt="bookmark" style={{ width: '24px', height: '24px' }} src={bookmarkImage} />
                            </IconButton>
                            <IconButton edge="start" color="inherit" aria-label="menu" style={{ padding: '4px' }} 
                            // onClick={handleCopyArticle}
                            >
                                <img alt="share" style={{ width: '24px', height: '24px' }} src={shareImage} />
                            </IconButton>
                        </div>
                    </div>
                </Box>
            </div>
            <div className={classes.title}>
                <div className={classes.company}>
                    <Avatar alt="news logo" variant="square" classes={{ img: classes.companyImg }} 
                    // src={checkCompanyLogo(article.company)} style={{ width: '60px', height: '60px' }} 
                    />
                    {/* <span>{article.company}</span> */}
                </div>
                {/* <div>{article.title}</div> */}
                <div className={classes.iconSetDesktop}>
                    <IconButton edge="start" color="inherit" aria-label="menu" 
                    // onClick={handleOpenArticle}
                    >
                        <img alt="bookmark" style={{ width: '24px', height: '24px' }} src={openImage} />
                    </IconButton>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <IconButton edge="start" color="inherit" aria-label="menu" style={{ padding: '4px' }} 
                        // onClick={handleSaveArticle}
                        >
                            <img alt="bookmark" style={{ width: '24px', height: '24px' }} src={bookmarkImage} />
                        </IconButton>
                        <IconButton edge="start" color="inherit" aria-label="menu" style={{ padding: '4px' }} 
                        // onClick={handleCopyArticle}
                        >
                            <img alt="share" style={{ width: '24px', height: '24px' }} src={shareImage} />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div style={{ padding: '16px' }}>
                <div className={classes.body}>
                    <Carousel
                        showArrows={true}
                        showThumbs={false}
                        // onChange={onChange}
                        // onClickItem={onClickItem}
                        // onClickThumb={onClickThumb}
                        useKeyboardArrows={true}
                        autoPlay={false}
                        infiniteLoop={true}
                        emulateTouch={true}
                        renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        (
                            <button type="button" onClick={onClickHandler} title={label} 
                            // style={{ ...arrowStyles, left: 15 }}
                            >
                                &lt;
                            </button>
                        )
                        }
                        renderArrowNext={(onClickHandler, hasNext, label) =>
                        (
                            <button type="button" onClick={onClickHandler} title={label} 
                            // style={{ ...arrowStyles, right: 15 }}
                            >
                                &gt;
                            </button>
                        )
                        }
                    >
                        <div className={classes.scene1}>
                            <img alt="articleImage" 
                            // src={article.images[0]} 
                            className={classes.image} />
                            {/* <a className="legend" target="_blank" rel="noopener noreferrer" href={article.url}>{article.title}</a> */}
                        </div>
                        <div className={classes.scene2}>
                            <img alt="articleImage" 
                            // src={article.images[1]} 
                            className={classes.image} />
                        </div>
                        {/* <div className={classes.scene3}>
                        <div className={classes.summary}>{secondSummary}</div>
                    </div> */}
                    </Carousel>
                    {/* <div className={classes.summary}>{article.summary}</div> */}
                    <div className={classes.action}>
                        {/* <IconButton onClick={() => handleClickVote(false)}>
                            <ArrowBack />
                        </IconButton> */}
                        <div className={classes.block}>
                            {/* <Button variant={isFirstRange ? 'outlined' : 'contained'} disableElevation color="secondary" className={classes.voteBtn} onClick={() => handleClickVote(-100)}>&nbsp;</Button>
                            <Button variant={isSecondRange ? 'outlined' : 'contained'} disableElevation className={classes.voteBtn} onClick={() => handleClickVote(0)}>&nbsp;</Button>
                            <Button variant={isThirdRange ? 'outlined' : 'contained'} disableElevation color="primary" className={classes.voteBtn} onClick={() => handleClickVote(100)}>&nbsp;</Button> */}
                            {/* <button className={`${classes.voteBtn} ${isFirstRange ? classes.activeBtn : ''} ${voteValue == -100 ? classes.selBtn : ''}`} onClick={() => handleClickVote(-100)}>&nbsp;</button>
                            <button className={`${classes.voteBtn} ${isSecondRange ? classes.activeBtn : ''} ${voteValue == 0 ? classes.selBtn : ''}`} onClick={() => handleClickVote(0)}>&nbsp;</button>
                            <button className={`${classes.voteBtn} ${isThirdRange ? classes.activeBtn : ''} ${voteValue == 100 ? classes.selBtn : ''}`} onClick={() => handleClickVote(100)}>&nbsp;</button> */}
                        </div>
                        {/* <Slider
                            value={vote}
                            min={-100}
                            max={100}
                            onChange={(e, v) => setVote(v)}
                            valueLabelDisplay="off"
                            getAriaValueText={() => `${vote}`}
                        /> */}
                        {/* <IconButton onClick={() => handleClickVote(true)}>
                            <ArrowForward />
                        </IconButton> */}
                    </div>
                </div>
                <div className={classes.bottomSection}>
                    <div className={classes.mobileCompany}>
                        <Avatar alt="news logo" variant="square" classes={{ img: classes.companyImg }} 
                        // src={checkCompanyLogo(article.company)}
                         />
                    </div>
                    {/* <div className={classes.badgeSection}>
                        {
                            (article.category1 || []).map((category) => (
                                <Chip variant='outlined' label={category} key={category} />
                            ))
                        }
                    </div> */}
                    <Box display="flex" alignItems="center" justifyContent="flex-end">
                        <div className={classes.iconSetMobile}>
                            <IconButton edge="start" color="inherit" aria-label="menu" 
                            // onClick={handleOpenArticle}
                            >
                                <img alt="bookmark" style={{ width: '24px', height: '24px' }} src={openImage} />
                            </IconButton>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <IconButton edge="start" color="inherit" aria-label="menu" style={{ padding: '4px' }} 
                                // onClick={handleSaveArticle}
                                >
                                    <img alt="bookmark" style={{ width: '24px', height: '24px' }} src={bookmarkImage} />
                                </IconButton>
                                <IconButton edge="start" color="inherit" aria-label="menu" style={{ padding: '4px' }} 
                                // onClick={handleCopyArticle}
                                >
                                    <img alt="share" style={{ width: '24px', height: '24px' }} src={shareImage} />
                                </IconButton>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );
}







export default function Articles() {
    const [offset, setOffset] = useState(0)

    return (
        <Box
            display="flex" alignItems="center" flexDirection="column" justifyContent="flex-start" style={{ height: '100%', textAlign: 'center' }}
            className={classes.container}>
            <div className={classes.mobileTab}>
                {
                    offset > 150
                        ?
                        <Tabs
                            // value={value} 
                            // onChange={handleChange}
                            aria-label="simple tabs example"
                            classes={{ indicator: classes.indicator }}
                            className={classes.mobileIndicator}>
                            <Tab label="General" value={0} />
                            <Tab label="Sports" value={1} />
                            <Tab label="Lifestyle" value={2} />
                        </Tabs>
                        :
                        <Tabs
                            // value={value} 
                            // onChange={handleChange} 
                            aria-label="simple tabs example"
                            classes={{ indicator: classes.indicator }}
                            className={classes.mobileIndicator}>
                            <Tab icon={<img alt="general" style={{ width: '50px', height: '50px' }} src={generalImage} />} label="General" value={0} />
                            <Tab icon={<img alt="sport" style={{ width: '50px', height: '50px' }} src={sportImage} />} label="Sports" value={1} />
                            <Tab icon={<img alt="lifestyle" style={{ width: '50px', height: '50px' }} src={lifestyleImage} />} label="Lifestyle" value={2} />
                        </Tabs>
                }
            </div>




            <div className={classes.articleContainer}>
                <div className={classes.categories}>
                    <IconButton color="inherit" aria-label="menu">
                        <img className={classes.newImage} alt="news" src={userImage} />
                    </IconButton>
                    <div className={classes.filterSection}>
                        {/* {
                                filter
                                ?
                                <Button disableElevation onClick={() => setFilter(0)}>News Provider</Button>
                                :
                                <Button variant="contained" disableElevation color="primary" className={classes.providerBtn} onClick={() => setFilter(0)}>News Provider</Button>
                            } */}
                        {/* {
                                filter
                                ?
                                <Button variant="contained" disableElevation color="primary" className={classes.providerBtn} onClick={() => setFilter(1)}>Category</Button>
                                :
                                <Button disableElevation onClick={() => setFilter(1)}>Category</Button>
                            } */}
                        {/* <Button variant="contained" disableElevation color="primary" className={classes.providerBtn} onClick={() => setFilter(0)}>News Provider</Button>
                            <Button disableElevation onClick={() => setFilter(1)}>Category</Button> */}
                    </div>
                    {/* {
                            filter
                            ? categories.map((category) => (<Chip label={changeCategoryName(category)} className={classes.categoryChip} classes={{label: classes.category1}} variant={isSelectedCategory(category) ? 'default' : 'outlined'} key={category} onClick={() => handleClickCategory(category)} />))
                            : newsLogos.map((logo, i) => (<Chip label={logo.company} className={classes.categoryChip} classes={{label: classes.category1}} variant={isSelectedCompany(logo.company) ? 'default' : 'outlined'} key={i} onClick={() => handleClickCompany(logo.company)} />))
                        } */}
                </div>
                <div className={classes.mobileFilterSection}>
                    {/* {
                        filter
                        ?
                        <Button disableElevation onClick={() => setFilter(0)}>News Provider</Button>
                        :
                        <Button variant="contained" disableElevation color="primary" className={classes.providerBtn} onClick={() => setFilter(0)}>News Provider</Button>
                    } */}
                    {/* {
                        filter
                        ?
                        <Button variant="contained" disableElevation color="primary" className={classes.providerBtn} onClick={() => setFilter(1)}>Category</Button>
                        :
                        <Button disableElevation onClick={() => setFilter(1)}>Category</Button>
                    } */}
                </div>
                <div className={classes.mobileCategories}>

                    {/* {
                        filter
                        ? categories.map((category) => (<Chip label={changeCategoryName(category)} className={classes.categoryChip} classes={{label: classes.category1}} variant={isSelectedCategory(category) ? 'default' : 'outlined'} key={category} onClick={() => handleClickCategory(category)} />))
                        : newsLogos.map((logo, i) => (<Chip label={logo.company} className={classes.categoryChip} classes={{label: classes.category1}} variant={isSelectedCompany(logo.company) ? 'default' : 'outlined'} key={i} onClick={() => handleClickCompany(logo.company)} />))
                    } */}
                </div>
                <div className={classes.articles}>

                    {/* {
                        articles.map((article) => (
                            <ArticleComponent article={article} key={article._id} fetchCategories={fetchCategories} />))
                    } */}
                    <ArticleComponent />
                </div>
            </div>





        </Box>
    )
}
