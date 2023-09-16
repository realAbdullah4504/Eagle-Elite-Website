import React from "react";
import { Box, useMediaQuery, TextField } from "@mui/material";
import { getIn } from "formik";

export default function AddressForm({ type, values, errors, touched, handleBlur, handleChange }) {
    const isNonMobile = useMediaQuery('(min-width: 600px)');

    //for better code readability
    const formattedName = (field) => `${type}.${field}`;
    const formattedError = (field) =>
        Boolean(
            getIn(touched, formattedName(field)) &&
            getIn(errors, formattedName(field))
        );
    const formattedHelper = (field) =>
        Boolean(
            getIn(touched, formattedName(field)) &&
            getIn(errors, formattedName(field))
        );

    return (
        <Box
            display='grid'
            gap='15px'
            gridTemplateColumns='repeat(4,minmax(0,1fr))'
            sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
            }}>
            <TextField fullWidth
                type='text'
                label='First Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                error={formattedError('firstName')}
                name={formattedName('firstName')}
                helperText={formattedHelper('firstName')}
                sx={{ gridColumn: 'span 2' }}
            />
            <TextField fullWidth
                type='text'
                label='Last Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                error={formattedError('lastName')}
                name={formattedName('lastName')}
                helperText={formattedHelper('lastName')}
                sx={{ gridColumn: 'span 2' }}
            />

            <TextField fullWidth
                type='text'
                label='Street Address 1'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.street1}
                error={formattedError('street1')}
                name={formattedName('street1')}
                helperText={formattedHelper('street1')}
                sx={{ gridColumn: 'span 4' }}
            />
            <TextField fullWidth
                type='text'
                label='Country'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                error={formattedError('country')}
                name={formattedName('country')}
                helperText={formattedHelper('country')}
                sx={{ gridColumn: 'span 2' }}
            />
            <TextField fullWidth
                type='text'
                label='Street Address 2 (Optional)'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.street2}
                error={formattedError('street2')}
                name={formattedName('street2')}
                helperText={formattedHelper('street2')}
                sx={{ gridColumn: 'span 2' }}
            />
            <TextField fullWidth
                type='text'
                label='City'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                error={formattedError('city')}
                name={formattedName('city')}
                helperText={formattedHelper('city')}
                sx={{ gridColumn: 'span 2' }}
            />
            <TextField fullWidth
                type='text'
                label='State'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                error={formattedError('state')}
                name={formattedName('state')}
                helperText={formattedHelper('state')}
                sx={{ gridColumn: '1fr' }}
            />
            <TextField fullWidth
                type='text'
                label='Zip-Code'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.zipCode}
                error={formattedError('zipCode')}
                name={formattedName('zipCode')}
                helperText={formattedHelper('zipCode')}
                sx={{ gridColumn: '1fr' }}
            />
        </Box>
    )
}