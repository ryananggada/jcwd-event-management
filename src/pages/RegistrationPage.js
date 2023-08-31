import React from "react";
import { useFormik } from "formik";
import { Button, Input, Text } from "@chakra-ui/react";
import * as Yup from 'yup'


function RegistrationPage() {


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });



    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <Input
                id="firstName"
                type="text"
                {...formik.getFieldProps('firstName')}
            />
            <Text color="red">
                {formik.touched.firstName && formik.errors.firstName ?
                    <div>{formik.errors.firstName}</div> : null}
            </Text>

            <label htmlFor="lastName">Last Name</label>
            <Input
                id="lastName"
                type="text"
                {...formik.getFieldProps('lastName')}
            />
            <Text color="red">
                {formik.touched.lastName && formik.errors.lastName ?
                    <div>{formik.errors.lastName}</div> : null}
            </Text>

            <label htmlFor="email">Email Address</label>
            <Input
                id="email"
                type="email"
                {...formik.getFieldProps('email')}
            />
            <Text color="red">
                {formik.touched.email && formik.errors.email ?
                    <div>{formik.errors.email}</div> : null}
            </Text>

            <Button type="sumbmit">Submit</Button>
        </form>

    );
};

export default RegistrationPage;