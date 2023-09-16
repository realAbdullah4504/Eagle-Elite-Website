import React, { useState } from "react";
import { Formik } from 'formik';
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { checkoutSchema } from "../../../checkoutSchema/checkoutSchema";
import { shades } from '../../../Theme';
import Shipping from './Shipping'
import Payment from './Payment';
import Review from "./Review";
import { resetCart, setNotify} from '../../../state';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, postUser } from "../../../api/users";
import { postCart } from "../../../api/carts";



const initialValues = {
    billingAddress: {
        firstName: '',
        lastName: '',
        country: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipCode: ''
    },
    shippingAddress: {
        isSameAddress: true,
        firstName: '',
        lastName: '',
        country: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipCode: ''
    },

    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
}


export default function CheckOut() {
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);
    const isFirstStep = activeStep === 0;
    const isSecondStep = activeStep === 1;
    const isThirdStep = activeStep === 2;
    const cart = useSelector((state) => state.cart.cart);

    const filteredCart = cart.map(cart => ({
        itemId: cart._id,
        image: cart.attributes.image,
        name: cart.attributes.name,
        price: cart.attributes.price,
        count: cart.attributes.count
    }));

    const totalPrice = cart.reduce((total, item) => {
        return total + item.attributes.count * item.attributes.price;
    }, 0);

    const navigate = useNavigate();

    const handleFormSubmit = (values, actions) => {
        //setActiveStep(activeStep + 1);
        console.log(values);

        if (isFirstStep)
            fetchUser(values.email, values.password)
                .then(res => {
                    if (cart.length !== 0)
                    {
                    if (res !== 'not found') {
                        setActiveStep(activeStep + 2);
                        actions.setValues(res)
                    }
                    else setActiveStep(activeStep + 1);
                }
                else alert('Cart Should Not e Empty!');

                })
                .catch(err => console.error(err));

        //copies the billing address onto shipping address
        if (isSecondStep) {

            let filteredValue = values;
            if (values.shippingAddress.isSameAddress) {
                filteredValue.shippingAddress = { ...values.billingAddress, isSameAddress: true };
                actions.setFieldValue('shippingAddress', filteredValue.shippingAddress)
            }

            //console.log(filteredValue.shippingAddress);
            postUser(filteredValue)
                .then(res => actions.setValues(res))
                .catch(err => console.error(err));
            if (cart.length !== 0)
                setActiveStep(activeStep + 1);
                else alert('Cart Should Not e Empty!');
        }

        if (isThirdStep) {
                    const filtered = {
                        userId: values._id,
                        products: filteredCart,
                        totalAmount: totalPrice,
                        orderStatus: 'Pending'
                    }
                    //console.log(res1);
                    postCart(filtered)
                        .then(res2 => {
                            console.log(res2)
                            dispatch(setNotify({}));
                        })
                        .catch(err => console.error(err));
                    dispatch(resetCart({}));
                    navigate('/checkout/' + filtered.userId);
        }

        actions.setTouched({});
    }

    return (
        <Box width='80%' m='100px auto'>
            <Stepper activeStep={activeStep} sx={{ m: '20px 0' }}>
                <Step><StepLabel>Billing</StepLabel></Step>
                <Step><StepLabel>Payment</StepLabel></Step>
                <Step><StepLabel>Review Order</StepLabel></Step>
            </Stepper>

            <Formik onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema[activeStep]}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        {isFirstStep &&
                            <Payment values={values}
                                errors={errors}
                                touched={touched}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                            />
                        }
                        {isSecondStep &&
                            <Shipping values={values}
                                errors={errors}
                                touched={touched}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                            />
                        }
                        {isThirdStep && <Review value={values.shippingAddress} />}
                        <Box display='flex' justifyContent='space-between' gap='50px'>
                            <Button fullWidth
                                type='submit'
                                color='primary'
                                variant='contained'
                                sx={{
                                    backgroundColor: shades.primary[400],
                                    boxShadow: 'none',
                                    color: 'white',
                                    borderRadius: 0,
                                    padding: '15px 40px'
                                }}
                            // onClick={() => {
                            //     setActiveStep(activeStep + 1)
                            //     console.log(activeStep)
                            // }}
                            >{(isFirstStep || isSecondStep) ? 'Next' : 'Place Order'}
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}