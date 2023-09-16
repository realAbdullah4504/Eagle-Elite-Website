import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Typography,Box } from "@mui/material";
import CartList from '../../global/CartList';


export default function Review(props) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>

      <CartList />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>Name:{`${props.value.firstName} ${props.value.lastName}`}</Typography>
          <Typography gutterBottom>Address:{props.value.street1}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
