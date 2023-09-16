import React from "react";
import { DataGridPro, GridToolbar, GridRowEditStartReasons, GridRowEditStopReasons } from "@mui/x-data-grid-pro";
import { useSelector, useDispatch } from "react-redux";
import { Box, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'
import { setEditedItem } from "../../../state";
import EditDeleteCollection from "./EditDeleteCollection";
import { postEditedItem } from "../../../api/items";

export default function ListCollections() {

    const items = useSelector(state => state.cart.items);
    const categories = useSelector(state => state.cart.categories);
    const dispatch = useDispatch();

    const filteredItems = items.map(item => {
        return (
            {
                id: item._id,
                name: item.attributes.name,
                image: item.attributes.image,
                description: item.attributes.description,
                noInStocks: item.attributes.noInStocks,
                price: item.attributes.price,
                category: item.attributes.category
            }
        )
    })


    //console.log(items);
    const columns = [
        //{ field: 'id', headerName: 'ID', width: 150, editable: true },
        { field: 'name', headerName: 'Name', width: 200, editable: true },
        {
            field: 'image', headerName: 'Image', width: 100,
            renderCell: (params) =>
                <img src={params.value} alt="Product" style={{ width: 100, height: 100 }} />
        },
        //{ field: 'description', headerName: 'Description', width: 300, editable: true },
        { field: 'noInStocks', headerName: 'Stocks', width: 120, editable: true },
        { field: 'price', headerName: 'Price', width: 120, editable: true},
        {
            field: 'category', headerName: 'Category', width: 100, editable: true,
            type: 'singleSelect',
            valueOptions: categories,
            cellClassName: (params) => {
                if (params.value === 'bestSellers')
                    return 'super-app-theme--bestSellers';
                else if (params.value === 'newArrivals')
                    return 'super-app-theme--newArrivals';
                else if (params.value === 'topRated')
                    return 'super-app-theme--topRated';
            }

        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <EditDeleteCollection params={params} items={items} />
            ),
        },
    ];
    //const [save,setSave]=useState(false);
    const processRowUpdate = (newRow, row) => {
        //const updatedRow = { ...newRow, isNew: false };
        // setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

        const compareArrays = (a, b) => {
            return JSON.stringify(a) === JSON.stringify(b);
        };

        if (!compareArrays(Object.values(newRow), Object.values(row))) {
            postEditedItem(newRow)
                .then(res => {
                    //console.log(res)
                    dispatch(setEditedItem({ item: res }))
                    
                })
                .catch(err => console.error(err));
        }
        else {
            console.log('Not Edited')
        }

        //console.log(items);
        //console.log(row);
        return newRow;

    };
    function detailPanel({ row }) {
        //console.log(row);
        return (
            <Box>
                <Grid container spacing={2} margin='10px' >
                    <Grid item xs={12} md={2} lg={2}>
                        <Typography variant='h3' fontWeight='bold' gutterBottom>Description:</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Typography >{row.description}</Typography>
                    </Grid>
                </Grid>

            </Box>
        );
    }

    return (
        <Box width='90%' m='90px auto'
            sx={{
                '& .super-app-theme--topRated': {
                    backgroundColor: 'rgba(224, 183, 60, 0.55)',
                    color: '#1a3e72',
                    fontWeight: '600',
                },
                '& .super-app-theme--bestSellers': {
                    backgroundColor: 'rgba(157, 255, 118, 0.49)',
                    color: '#1a3e72',
                    fontWeight: '600',
                },
                '& .super-app-theme--newArrivals': {
                    backgroundColor: '#d47483',
                    color: '#1a3e72',
                    fontWeight: '600',
                },

            }}
        >
            <Paper elevation={20} sx={{
                p: 2,

            }}>
                <DataGridPro rowHeight={75}
                    getDetailPanelContent={detailPanel}
                    getDetailPanelHeight={({ row }) => 'auto'}
                    rows={filteredItems.reverse()}
                    columns={columns}
                    editMode="row"
                    //rowModesModel={{ "648b78420bf5d8761356d094": { mode: GridRowModes.Edit } }}//make the grid editable
                    // onCellModesModelChange={(model) => setCellModesModel(model)}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={(error) => console.error(error)}

                    onRowEditStart={(params, event) => {
                        if (params.reason === GridRowEditStartReasons.cellDoubleClick
                            || params.reason === GridRowEditStartReasons.enterKeyDown) {
                            event.defaultMuiPrevented = true;
                        }
                    }}
                    onRowEditStop={(params, event) => {
                        if (params.reason === GridRowEditStopReasons.enterKeyDown) {
                            event.defaultMuiPrevented = true;
                        }
                    }}
                />
            </Paper>
        </Box>
    );
}