import React from "react";
import { useSelector } from "react-redux";
import { DataGridPro, GridToolbar, GridCellEditStartReasons, GridCellEditStopReasons } from "@mui/x-data-grid-pro";
import { Box,Paper} from "@mui/material";
import CustomerOrdersList from "./CustomerOrdersList";


export default function ListCustomers() {
    const users = useSelector(state => state.cart.users);
    // console.log(orders);
    const filteredUsers = users.map(user => (
        {
            id: user._id,
            fullName: user.billingAddress.firstName.concat(' ', user.billingAddress.lastName),
            email: user.email,
            phoneNumber: user.phoneNumber,
            shippingAddress: user.shippingAddress.street1,
            city: user.shippingAddress.city,
            country: user.shippingAddress.country,
        }
    ))
    //console.log(filteredUsers);
    const columns = [
        //{ field: 'id', headerName: 'ID', width: 150, editable: true },
        { field: 'fullName', headerName: 'Full Name', width: 120 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 120 },
        { field: 'shippingAddress', headerName: 'Shipping Address', width: 400 },
        { field: 'city', headerName: 'City', width: 120 },
        { field: 'country', headerName: 'Country', width: 120 },
    ];

    function detailPanel({ row }) {
        //console.log(filteredOrders);
        return (
            <CustomerOrdersList customer={row}/>
        );

    }

    return (
        <Box width='100%' m='70px auto'>
            <Paper elevation={20} sx={{
                p: 2,

            }}>
                <DataGridPro rowHeight={75}
                    rows={filteredUsers.reverse()}
                    columns={columns}
                    slots={{
                        toolbar: GridToolbar,
                    }}

                    getDetailPanelContent={detailPanel}
                    getDetailPanelHeight={({ row }) => 'auto'}

                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 5, page: 10 },
                        },
                    }}

                    onCellEditStart={(params, event) => {
                        if (params.reason === GridCellEditStartReasons.cellDoubleClick
                            || params.reason === GridCellEditStartReasons.enterKeyDown) {
                            event.defaultMuiPrevented = true;
                        }
                    }}
                    onCellEditStop={(params, event) => {
                        if (params.reason === GridCellEditStopReasons.enterKeyDown) {
                            event.defaultMuiPrevented = true;
                        }
                    }}
                />
            </Paper>
        </Box>
    );
}