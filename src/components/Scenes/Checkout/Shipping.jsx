import React from "react";
import { Box, FormControlLabel, Typography } from "@mui/material";
import AddressForm from './AddressForm';
import Checkbox from '@mui/material/Checkbox';

export default function Shipping(
    { values, errors, touched, handleBlur, handleChange, setFieldValue }) {
    return (
        <Box m='30px auto'>
            {/*billing Form */}
            <Box>
                <Typography sx={{ mb: '15px' }} fontSize='18px'>Billing Information</Typography>
                <AddressForm type='billingAddress'
                    values={values.billingAddress}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange} />
            </Box>
            <Box mb='20px'>
                <FormControlLabel label='Same for Shipping Address'
                    control={
                        <Checkbox defaultChecked
                            value={values.shippingAddress.isSameAddress}
                            onChange={() => {
                                setFieldValue('shippingAddress.isSameAddress',
                                    !values.shippingAddress.isSameAddress)
                                //console.log(values.shippingAddress.isSameAddress)
                            }} />
                    } />
            </Box>

            {!values.shippingAddress.isSameAddress && (
                <Box>
                    <Typography sx={{ mb: '15px' }} fontSize='18px'>
                        Shipping Information</Typography>
                    <AddressForm type='shippingAddress'
                        values={values.shippingAddress}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange} />
                </Box>
            )}
        </Box>

    )
}