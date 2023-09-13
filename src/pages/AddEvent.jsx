import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import DashboardLayout from "../components/DashboardLayout";

const AddEventPage = () => {
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      genre: "",
      artist: "",
      date: "",
      time: "",
      location: "",
      description: "",
      image: "",
      price: "",
    },
    validationSchema: Yup.object().shape({
      genre: Yup.string().required("please input the genre"),
      artist: Yup.string().required("please input the artist"),
      date: Yup.string().required("please input the date"),
      time: Yup.string().required("please input the time"),
      location: Yup.string().required("please input the location"),
      description: Yup.string().required("please input the description"),
      image: Yup.string().required("please input the image"),
      price: Yup.string().required("please input the price"),
    }),
    validateOnChange: false,
    onSubmit: async (value, forms) => {
      //ngepost ke database
      const input = {
        genre: value.genre,
        artist: value.artist,
        date: value.date,
        time: value.time,
        location: value.location,
        description: value.description,
        image: value.image,
        price: value.price,
      };

      try {
        await axios.post("http://localhost:3001/events", input);

        formik.setSubmitting(false);
      } catch (err) {
        formik.setSubmitting(false);
        console.log(err);

        toast({
          status: "error",
          title: "Something wrong",
          description: err.message,
          isClosable: true,
          duration: 3000,
        });
      }
      forms.resetForm();

      console.log(value);
    },
  });
  return (
    <DashboardLayout>
      <Container>
        <Stack spacing={"24px"} textAlign={"center"}>
          <Text fontSize="36px">Create Event</Text>
          <FormControl>
            <Input
              name="genre"
              onChange={(e) => formik.setFieldValue("genre", e.target.value)}
              placeholder="Genre"
              value={formik.values.genre}
            />
            <FormHelperText>{formik.errors.artist || ""}</FormHelperText>
            <Input
              name="artist"
              onChange={(e) => formik.setFieldValue("artist", e.target.value)}
              placeholder="Artist"
              value={formik.values.artist}
            />
            <FormHelperText>{formik.errors.artist || ""}</FormHelperText>

            <Input
              name="date"
              onChange={(e) => formik.setFieldValue("date", e.target.value)}
              placeholder="Date"
              value={formik.values.date}
            />
            <FormHelperText>{formik.errors.date || ""}</FormHelperText>
            <Input
              name="time"
              onChange={(e) => formik.setFieldValue("time", e.target.value)}
              placeholder="Time"
              value={formik.values.time}
            />
            <FormHelperText>{formik.errors.time || ""}</FormHelperText>

            <Input
              name="location"
              onChange={(e) => formik.setFieldValue("location", e.target.value)}
              placeholder="Location"
              value={formik.values.location}
            />
            <FormHelperText>{formik.errors.location || ""}</FormHelperText>
            <Input
              name="description"
              onChange={(e) =>
                formik.setFieldValue("description", e.target.value)
              }
              placeholder="Description"
              value={formik.values.description}
            />
            <FormHelperText>{formik.errors.description || ""}</FormHelperText>

            <Input
              name="image"
              onChange={(e) => formik.setFieldValue("image", e.target.value)}
              placeholder="Image"
              value={formik.values.image}
            />
            <FormHelperText>{formik.errors.image || ""}</FormHelperText>
            <Input
              name="price"
              onChange={(e) => formik.setFieldValue("price", e.target.value)}
              placeholder="Price"
              value={formik.values.price}
            />
            <FormHelperText>{formik.errors.price || ""}</FormHelperText>
          </FormControl>
        </Stack>
        <Button
          mt={"50px"}
          size={"lg"}
          backgroundColor={"#e38100"}
          type="submit"
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
