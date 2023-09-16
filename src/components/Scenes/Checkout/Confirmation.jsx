import React from "react";
import { Box, Alert, AlertTitle } from "@mui/material";
import OrdersHistory from "../../global/OrdersHistory";

export default function Confirmation() {

    return (
        <Box>
            <Box width='80%' m='100px auto'>
                <Alert severity='success'>
                    <AlertTitle>Success</AlertTitle>
                    You have Successfully Made an Order <strong>congrats on making your order successful</strong>
                </Alert>
            </Box>
            <OrdersHistory />
        </Box>
    )
}