import * as Yup from 'yup';

export const checkoutSchema = [
    Yup.object().shape({
        email: Yup.string().required('Required'),
        phoneNumber: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
        confirmPassword: Yup.string().required('Required')
            .oneOf([Yup.ref('password'), null], "Password Must Match")
    }),
    Yup.object().shape({
        billingAddress: Yup.object().shape({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            country: Yup.string().required('Required'),
            street1: Yup.string().required('Required'),
            street2: Yup.string(),
            city: Yup.string().required('Required'),
            state: Yup.string().required('Required'),
            zipCode: Yup.string().required('Required'),
        }),
        shippingAddress: Yup.object().shape({
            isSameAddress: Yup.boolean(),
            firstName: Yup.string().when('isSameAddress', {
                is: false,
                then: () => Yup.string().required('Required')
            }),

            lastName: Yup.string().when('isSameAddress', {
                is: false,
                then: () => Yup.string().required('Required')
            }),
            country: Yup.string().when('isSameAddress', {
                is: false,
                then: () => Yup.string().required('Required')
            }),
            street1: Yup.string().when('isSameAddress', {
                is: false,
                then: () => Yup.string().required('Required')
            }),
            street2: Yup.string(),
            city: Yup.string().when('isSameAddress', {
                is: false,
                then: () => Yup.string().required('Required')
            }),
            state: Yup.string().when('isSameAddress', {
                is: false,
                then: () => Yup.string().required('Required')
            }),
            zipCode: Yup.string().when('isSameAddress', {
                is: false,
                then: () => Yup.string().required('Required')
            }),
        })
    })

]