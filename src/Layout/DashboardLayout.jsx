import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from '../componentsDashboard/global/Navbar';
import Collections from "../componentsDashboard/Dashboard/Collections/Collections";
import ListCollections from "../componentsDashboard/Dashboard/Collections/ListCollections";
import ListOrders from "../componentsDashboard/Dashboard/Orders/ListOrders";
import ListCustomers from "../componentsDashboard/Dashboard/Customers/ListCustomers";



export default function DashboardLayout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar />
            <Routes>
                <Route path='/collections' element={<Collections />}></Route>
                <Route path='/collections/list' element={<ListCollections/>}></Route>
                <Route path='/collections/orders' element={<ListOrders/>}></Route>
                <Route path='/collections/customers' element={<ListCustomers/>}></Route>
                
            </Routes>
        </Box>
    );
}