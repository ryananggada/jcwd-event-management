import api from "../api";
import { Formik, Field, Form } from "formik";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

function RegistrationPage() {
  const { isOpen: showPassword, onToggle: onToggleShowPassword } =
    useDisclosure();
  const { isOpen: showConfirmPassword, onToggle: onToggleShowConfirmPassword } =
    useDisclosure();

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (values, form) => {
    try {
      const res = await api.get("/users");
      const { data } = res;
      const existingEmail = data.filter((user) => user.email === values.email);
      const existingUser = data.filter((user) => user.username === values.username);
      if (existingEmail.length > 0) {
        form.setFieldError("email", "E-mail already exist!");
        return;
      }
      if (existingUser.length > 0) {
        form.setFieldError("username", "Username already exist!");
        return;
      }

      const { confirmPassword, ...body } = values;
      await api.post("/users", body);
      toast({
        status: "success",
        title: "Account has been created",
        description: "Redirecting you to home",
        duration: 3000,
        isClosable: true,
        onCloseComplete: () => {
          navigate("/");
        },
      });
    } catch (error) {
      toast({
        status: "error",
        title: "Something wrong",
        description: error.message,
        isClosable: true,
        duration: 5000,
      });
    }
  };

  return (
    <>
      <Center minH="70vh">
        <Container boxShadow="md" px={5} py={10}>
          <Heading mb={3}>SIGN UP</Heading>
          <Box mb={7}>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={yup.object({
                username: yup.string().required("Username can't be blank"),
                firstName: yup
                  .string()
                  .max(15, "Must be 15 characters or less")
                  .required("Required"),
                lastName: yup
                  .string()
                  .max(20, "Must be 20 characters or less")
                  .required("Required"),
                email: yup
                  .string()
                  .email("Invalid email address")
                  .required("Please enter your e-mail address"),
                password: yup
                  .string()
                  .required("Please enter your password.")
                  .matches(
                    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
                    "Must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
                  ),
                confirmPassword: yup
                  .string()
                  .oneOf([yup.ref("password"), null], "Passwords must match")
                  .required("Required"),
              })}
              onSubmit={handleSubmit}
            >
              {(forms) => (
                <Form>
                  <Field name="firstName">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.firstName && form.touched.firstName
                        }
                        mb={5}
                      >
                        <FormLabel>First Name</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>
                          {form.errors.firstName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="lastName">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.lastName && form.touched.lastName
                        }
                        mb={5}
                      >
                        <FormLabel>Last Name</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>
                          {form.errors.lastName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.username && form.touched.username}
                        mb={5}
                      >
                        <FormLabel>Username</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                        mb={5}
                      >
                        <FormLabel>Email</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
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
                  <Field name="confirmPassword">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.confirmPassword &&
                          form.touched.confirmPassword
                        }
                        mb={5}
                      >
                        <FormLabel>Confirmation Password</FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            mr="4.5rem"
                            borderRightRadius={0}
                          />
                          <InputRightElement w="4.5rem">
                            <Button
                              w="full"
                              onClick={onToggleShowConfirmPassword}
                              borderLeftRadius={0}
                              type="button  "
                            >
                              <Icon
                                as={showConfirmPassword ? FaEyeSlash : FaEye}
                              />
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.confirmPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Box>
                    <Button
                      isLoading={forms.isSubmitting}
                      w="full"
                      backgroundColor="#e38100"
                      type="submit"
                    >
                      Register
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </Center>
    </>
  );
}

export default RegistrationPage;
