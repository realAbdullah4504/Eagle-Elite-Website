import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Divider,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { shades } from "../../Theme";

export default function OrderProductList({ product = {} }) {
  return (
    <Grid item md={2} sm={4} xs="auto">
      <Card sx={{ maxWidth: 125, border: "none", boxShadow: "none" }}>
        <CardMedia
          sx={{
            height: 125,
            width: 125,
            margin: "auto",
          }}
          image={product.image}
          title={product.name}
        />

        <CardContent>
          <Typography gutterBottom variant="h10" component="div">
            {product?.name?.length > 18
              ? product?.name?.substring(0, 16) + "..."
              : product?.name}
          </Typography>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{ fontSize: 12 }}
              color={shades.primary[700]}
              margin="4px"
            >
              {product?.count + " "}Pcs
            </Typography>

            <Typography
              sx={{ fontSize: 12 }}
              color={shades.secondary[400]}
              margin="4px"
            >
              ${product?.price * product?.count}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
