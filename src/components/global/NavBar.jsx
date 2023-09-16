import React from "react";
//import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../Theme";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { setIsCartOpen } from "../../state";
import { useDispatch, useSelector } from "react-redux";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  //console.log(cart);

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255,255,255,0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ '&:hover':{cursor:'pointer'}}}
          color={shades.secondary[500]}
        >
          Ecommerce
        </Box>
        <Box display='flex'
          justifyContent='center'
          columnGap='20px'
          zIndex='2'
        >
          <IconButton sx={{ color: "black" }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: "black" }} onClick={()=>navigate('/login')}>
            <PersonOutline />
          </IconButton>

          <IconButton sx={{ color: "black" }}
            onClick={()=>dispatch(setIsCartOpen({}))}>

            <ShoppingBagOutlined />

          </IconButton>
          <Badge badgeContent={cart.length}
            color='secondary'
            invisible={cart.length===0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: '0 4px',
                height: '14px',
                minwidth: '13px'
              }
            }}>
          </Badge>

          <IconButton sx={{ color: "black" }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
