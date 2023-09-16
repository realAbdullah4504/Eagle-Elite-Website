import React, { useEffect, useState } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Toolbar from '@mui/material/Toolbar';
import { setItems, setCategories, setOrders, setUsers, setNotify } from '../../state';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../../api/items';
import { fetchCategory } from '../../api/category';
import { fetchOrders } from '../../api/carts';
import { fetchUsers } from '../../api/users';

import { MainListItems, secondaryListItems } from './listItems';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);



export default function Navbar() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        fetchItems()
            .then((response) => dispatch(setItems({ items: response })))
            .catch(err => console.error(err));

        fetchCategory()
            .then(res => {
                const categories = res.map(c => c.name);
                //console.log(categories);
                dispatch(setCategories({ categories }));

            })

            .catch(err => console.error(err));

        fetchOrders()
            .then((response) => {
                dispatch(setOrders({ orders: response }))
            })
            .catch(err => console.error(err));

        fetchUsers()
            .then((response) => dispatch(setUsers({ users: response })))
            .catch(err => console.error(err));

    }, [dispatch]);

    const notify = useSelector(state => state.cart.notify);
    function handleNotifyClick() {
        //dispatch(setNotify({notify:'reset'}));
    }

    return (
        <Box>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Dashboard
                    </Typography>
                    <h1>{notify}</h1>
                    <IconButton color="inherit" onClick={handleNotifyClick}>
                        <Badge badgeContent={notify} color="secondary" >
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    <MainListItems />
                    <Divider sx={{ my: 1 }} />
                    {secondaryListItems}
                </List>
            </Drawer>
        </Box>
    );
}
