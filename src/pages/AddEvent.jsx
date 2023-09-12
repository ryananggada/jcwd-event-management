import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '../components/Layout';
import DashboardLayout from '../components/DashboardLayout';

const AddEventPage = () => {
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      name: '',
      date: '',
      location: '',
      desc: '',
      type: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('this field is required'),
      date: Yup.string().required('please input date'),
      location: Yup.string().required('this field is required'),
      desc: Yup.string().required('this field is required'),
      type: Yup.string().required('this field is required'),
    }),
    validateOnChange: false,
    onSubmit: (value, forms) => {
      setTimeout(async () => {
        //ngepost ke database
        const input = {
          name: value.name,
          date: value.date,
          location: value.location,
          desc: value.desc,
          type: value.type,
        };

        try {
          await axios.post('http://localhost:3001/tickets', input);

          formik.setSubmitting(false);
        } catch (err) {
          formik.setSubmitting(false);
          console.log(err);

          toast({
            status: 'error',
            title: 'Something wrong',
            description: err.message,
            isClosable: true,
            duration: 3000,
          });
        }
        forms.resetForm();

        console.log(value);
      }, 3000);
    },
  });
  return (
    <DashboardLayout>
      <Container>
        <Stack spacing={'24px'} textAlign={'center'}>
          <Text fontSize='36px'>Create Event</Text>
          <FormControl>
            <Input
              name='name'
              onChange={(e) => formik.setFieldValue('name', e.target.value)}
              placeholder='Event Name'
            />
            <FormHelperText>{formik.errors.name || ''}</FormHelperText>


            <Input
              name='date'
              onChange={(e) => formik.setFieldValue('date', e.target.value)}
              placeholder='Date and Time'
            />
            <FormHelperText>{formik.errors.date || ''}</FormHelperText>

            <Input
              name='location'
              onChange={(e) => formik.setFieldValue('location', e.target.value)}
              placeholder='Location'
            />
            <FormHelperText>{formik.errors.location || ''}</FormHelperText>
            <Input
              name='desc'
              onChange={(e) => formik.setFieldValue('desc', e.target.value)}
              placeholder='Description'
            />
            <FormHelperText>{formik.errors.desc || ''}</FormHelperText>

            <Input

              name='type'
              onChange={(e) => formik.setFieldValue('type', e.target.value)}
              placeholder='Ticket Type'
            />
            <FormHelperText>{formik.errors.type || ''}</FormHelperText>
          </FormControl>
        </Stack>
        <Button
          mt={'50px'}
          size={'lg'}
          backgroundColor={'#e38100'}
          type='submit'
          onClick={() => formik.handleSubmit()}
          disabled={formik.isSubmitting}
        >
          Create
        </Button>
      </Container>
    </DashboardLayout>

  );
};

export default AddEventPage;
