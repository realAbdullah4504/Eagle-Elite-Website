import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

export default function Payment({
    values, errors, touched, handleBlur, handleChange, setFieldValue
}) {
    return (
        <Box m='30px 0'>
            <Box>
                <Typography sx={{ mb: '15px' }} fontSize='18px'>Contact Info</Typography>

                <TextField fullWidth
                    type='email' placeholder='abc@def.com'
                    label='Email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name='email'
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: 'span 4',marginBottom:'15px' }}
                />
                <TextField fullWidth
                    type='text'
                    label='Phone Number'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    name='phoneNumber'
                    error={!!touched.phoneNumber && !!errors.phoneNumber}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    sx={{ gridColumn: 'span 4',marginBottom:'15px' }}
                />
                <TextField fullWidth
                    type='password'
                    label='Password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name='password'
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: 'span 4',marginBottom:'15px' }}
                />
                <TextField fullWidth
                    type='password'
                    label='Confirm Password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    name='confirmPassword'
                    error={!!touched.confirmPassword && !!errors.confirmPassword}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    sx={{ gridColumn: 'span 4',marginBottom:'15px' }}
                />
            </Box>
        </Box>
    )
}