import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Spacer,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import * as yup from "yup";
import api from "../api";
import { useDispatch } from "react-redux";
import { default as authLogin, login } from "../slices/authLogin";

function Login() {
    const { isOpen: showPassword, onToggle: onToggleShowPassword } =
        useDisclosure();
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values, form) => {
        api
            .get(`/users?q=${values.username}`)
            .then((res) => {
                const { data } = res;
                const filteredUser = data
                    .filter((user) => {
                        return (
                            user.username === values.username ||
                            user.email === values.username
                        );
                    })
                    .filter((user) => user.password === values.password);
                if (filteredUser.length === 0) {
                    toast({
                        status: "error",
                        title: "Login failed",
                        description: "Incorrect username or password",
                        isClosable: true,
                        duration: 5000,
                    });
                    return;
                }

                const [userProfile] = filteredUser;
                dispatch(login(userProfile));

                toast({
                    status: "success",
                    title: "Login successful",
                    description: "Redirecting you to home",
                    isClosable: true,
                    duration: 3000,
                    onCloseComplete: () => {
                        dispatch(login(userProfile));
                        form.resetForm();
                        navigate("/");
                    },
                });
            })
            .catch((error) => {
                console.log(error)
                toast({
                    status: "error",
                    title: "Something is wrong",
                    description: error.message,
                    isClosable: true,
                    duration: 5000,
                });
                form.resetForm();
            });
    };

    const loginSchema = yup.object().shape({
        username: yup.string().required("Username can't be blank"),
        password: yup
            .string()
            .required("Please enter your password.")
            .matches(
                "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
                "Must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
            )
    });

    return (
        <Center minH="90vh">
            <Container boxShadow="md" px={5} py={10}>
                <Box mb={7}>
                    <Heading mb={3}>LOG IN</Heading>
                    <Text>
                        Don't have an account yet?{" "}
                        <Link to="/registration-page">
                            <Button color="#e38100" fontSize="md" variant="link">
                                Sign up
                            </Button>
                        </Link>
                        {" "}now!
                    </Text>
                </Box>
                <Formik
                    initialValues={{ username: "", password: "" }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                >
                    {(forms) => (
                        <Form>
                            <Field name="username">
                                {({ field, form }) => (
                                    <FormControl
                                        isInvalid={form.errors.username && form.touched.username}
                                        mb={5}
                                    >
                                        <FormLabel>Username/Email</FormLabel>
                                        <Input {...field} />
                                        <FormErrorMessage>
                                            {form.errors.username}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="password">
                                {({ field, form }) => (
                                    <FormControl
                                        isInvalid={form.errors.password && form.touched.password}
                                        mb={5}
                                    >
                                        <FormLabel>Password</FormLabel>
                                        <InputGroup>
                                            <Input
                                                {...field}
                                                type={showPassword ? "text" : "password"}
                                                mr="4.5rem"
                                                borderRightRadius={0}
                                            />
                                            <InputRightElement w="4.5rem">
                                                <Button
                                                    w="full"
                                                    onClick={onToggleShowPassword}
                                                    borderLeftRadius={0}
                                                    type="button"
                                                >
                                                    <Icon as={showPassword ? FaEyeSlash : FaEye} />
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        <FormErrorMessage>
                                            {form.errors.password}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Flex mb={3}>
                                <Spacer />
                                <Button color="#e38100" variant="link">Forgot password?</Button>
                            </Flex>
                            <Box>
                                <Button
                                    isLoading={forms.isSubmitting}
                                    w="full"
                                    backgroundColor="#e38100"
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Center>
    );
}

export default Login;