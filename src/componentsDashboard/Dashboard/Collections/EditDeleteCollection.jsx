import React, { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import { setItems } from "../../../state";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";
import { deleteItem } from "../../../api/items";
import { useNavigate } from "react-router-dom";


export default function EditDeleteCollection({ params, items }) {
    const navigate=useNavigate();
    const { id } = params;
    const dispatch = useDispatch();
    const [isEditMode, setIsEditMode] = useState(false);

    const apiRef = useGridApiContext();

    const handleEditClick = () => {
        setIsEditMode(true);
        apiRef.current.startRowEditMode({ id });
    };
    const handleSaveClick = () => {
        setIsEditMode(false);
        apiRef.current.stopRowEditMode({ id });

    }
    const handleCancelClick = () => {
        setIsEditMode(false);
        apiRef.current.stopRowEditMode({
            id,
            ignoreModifications: true, // will also discard the changes made
        });

    }

    const handleDeleteClick = () => {
        // Dispatch an action to handle the delete functionality
        // Example: dispatch(deleteItem(id));
        //console.log(items.filter(item => item._id !== id));
        const filteredItems = items.filter(item => item._id !== id)

        //console.log(id);
        deleteItem(id)
            .then(res =>console.log(res))
            .catch(err => console.error(err));

        dispatch(setItems({ items: filteredItems }))
    };
    return (
        <Box>


            {isEditMode ?
                <Box>
                    <IconButton onClick={handleSaveClick} style={{ cursor: 'pointer' }} >
                        <SaveIcon />
                    </IconButton>
                    <IconButton onClick={handleCancelClick} style={{ cursor: 'pointer' }} >
                        <CloseIcon />
                    </IconButton>
                </Box>
                :
                <Box>
                    <IconButton style={{ cursor: 'pointer' }} onClick={() => navigate(`/item/${params.row.id}`)}>
                        <PreviewIcon />
                    </IconButton>
                    <IconButton onClick={handleEditClick} style={{ cursor: 'pointer' }} >
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDeleteClick} style={{ cursor: 'pointer' }}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            }
            
        </Box>
    )
}