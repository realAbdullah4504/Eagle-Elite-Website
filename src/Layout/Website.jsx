import React, { useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from "../components/global/NavBar";
import CartMenu from '../components/CartMenu/CartMenu';
import Home from "../components/Scenes/Home/Home";
import ItemDetails from "../components/Scenes/itemDetails/ItemDetails";
import Login from "../components/Login/Login";
import OrdersHistory from "../components/global/OrdersHistory";
import CheckOut from "../components/Scenes/Checkout/CheckOut";
import Confirmation from "../components/Scenes/Checkout/Confirmation";
import Footer from "../components/global/Footer";

const ScrollToTop = () => {
  const { path } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path])
}
export default function Website() {
  return (
    <>

      <ScrollToTop />
      <NavBar />
      <CartMenu />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/item/:itemId' element={<ItemDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/login/:userId' element={<OrdersHistory />} />
        <Route path='/checkout' element={<CheckOut />} />
        <Route path='/checkout/:userId' element={<Confirmation />} />
      </Routes>
      <Footer />
    </>
  );
  }