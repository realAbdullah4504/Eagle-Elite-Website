import { useSelector } from "react-redux";
import { DataGridPro, GridToolbar, GridCellEditStartReasons, GridCellEditStopReasons } from "@mui/x-data-grid-pro";
import { Box, Grid, Paper } from "@mui/material";
import EditOrders from "./EditOrders";
import { postEditOrderStatus } from "../../../api/carts";
import { useDispatch } from "react-redux";
import { setEditedOrder } from "../../../state";
import OrderProductList from "../../../components/global/OrderProductsList";

export default function Orders() {

    const orders = useSelector(state => state.cart.orders);
    const orderStatus = ['Pending', 'Delivered', 'Cancelled', 'Shipped'];


    const columns = [
        //{ field: 'id', headerName: 'ID', width: 150, editable: true },
        { field: 'fullName', headerName: 'Full Name', width: 120 },
        {
            field: 'email', headerName: 'Email', width: 200,
        },
        {
            field: 'phoneNumber', headerName: 'Ph #', width: 100,
        },
        {
            field: 'shippingAddress', headerName: 'Shipping', width: 200,
        },
        //{ field: 'description', headerName: 'Description', width: 300, editable: true },
        { field: 'date', headerName: 'Date', width: 150, },
        { field: 'totalAmount', headerName: 'Total', width: 100, },
        {
            field: 'orderStatus', headerName: 'Order Status', width: 100, editable: true,
            type: 'singleSelect',
            valueOptions: orderStatus,
            cellClassName: (params) => {
                if (params.value === 'Pending' || params.value === 'Cancelled')
                    return 'super-app-theme--Pending';
                else if (params.value === 'Delivered')
                    return 'super-app-theme--Delivered';
                else if (params.value === 'Shipped')
                    return 'super-app-theme--Shipped';
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <EditOrders params={params} />
            ),
        },
    ];

    const filteredOrders = orders.map(order => (
        {
            id: order._id,
            fullName: order.userId.billingAddress.firstName.concat(' ', order.userId.billingAddress.lastName),
            email: order.userId.email,
            phoneNumber: order.userId.phoneNumber,
            shippingAddress: order.userId.shippingAddress.street1,
            date: new Date(order.createdAt).toDateString(),
            totalAmount: order.totalAmount,
            orderStatus: order.orderStatus,
            products: order.products
        })
    )
    const dispatch = useDispatch();
    const processRowUpdate = (newRow, row) => {

        //console.log(newRow.orderStatus)
        if (newRow.orderStatus !== row.orderStatus) {
            postEditOrderStatus(newRow.orderStatus, newRow.id)
                .then(res => {
                    //console.log(res)
                    //console.log(newRow.id)
                    dispatch(setEditedOrder({ order: res }))
                })
                .catch(err => console.error(err));
        }
        else {
            console.log('Not Edited')
        }
        //console.log(newRow);
        return newRow;
    };
    function detailPanel({ row }) {
        //console.log(row.products);
        return (
            <Box width='80%' m='10px auto'>
                <Grid container spacing={3} marginTop='5px'>
                    {row.products.map(product =>
                        <OrderProductList key={product._id} product={product} />
                    )}
                </Grid>
            </Box>
        );
    }

    //console.log(filteredOrders);


    return (
        <Box width='100%' m='70px auto'
            sx={{
                '& .super-app-theme--Shipped': {
                    backgroundColor: 'rgba(224, 183, 60, 0.55)',
                    color: '#1a3e72',
                    fontWeight: '600',
                },
                '& .super-app-theme--Delivered': {
                    backgroundColor: 'rgba(157, 255, 118, 0.49)',
                    color: '#1a3e72',
                    fontWeight: '600',
                },
                '& .super-app-theme--Pending': {
                    backgroundColor: '#d47483',
                    color: '#1a3e72',
                    fontWeight: '600',
                },
            }}>
            <Paper elevation={20} sx={{
                p: 2,

            }}>
                <DataGridPro rowHeight={75}
                    rows={filteredOrders.reverse()}
                    editMode="row"
                    columns={columns}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={(error) => console.error(error)}

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