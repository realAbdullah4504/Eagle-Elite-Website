import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useGridApiContext } from "@mui/x-data-grid";

export default function EditOrders({ params }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const { id } = params;
    const apiRef = useGridApiContext();

    const handleEditClick = () => {
        setIsEditMode(true);
        apiRef.current.startRowEditMode({ id});
    }
    const handleSaveClick = () => {
        setIsEditMode(false);
        apiRef.current.stopRowEditMode({id });
    }
    const handleCancelClick = () => {
        setIsEditMode(false);
        apiRef.current.stopRowEditMode({
            id,
            ignoreModifications: true, // will also discard the changes made
          });
    }
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
                    <IconButton onClick={handleEditClick} style={{ cursor: 'pointer' }} >
                        <EditIcon />
                    </IconButton>
                </Box>
            }
        </Box>
    );
}