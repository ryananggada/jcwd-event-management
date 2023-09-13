import {
  Box,
  Image,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
  Flex,
} from "@chakra-ui/react";
import React from "react";

function EventCard({
  artist,
  genre,
  date,
  time,
  location,
  description,
  price,
  image,
}) {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image src={image} alt="" borderRadius="lg" w="20vw" h="35vh" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{artist}</Heading>
          <Text>
            <b>Genre:</b> {genre}
          </Text>
          <Text>
            <b>Date:</b> {date}
          </Text>
          <Text>
            <b>Time:</b> {time}
          </Text>
          <Text>
            <b>Location:</b> {location}
          </Text>
          <Text>
            <b>Description :</b> <br />
            {description}
          </Text>
          <Text color="#e38100" fontSize="2xl">
            {price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex wrap={"wrap"}>
          <Button variant="solid" backgroundColor="#e38100" size="sm">
            Buy now
          </Button>
          <Button variant="ghost" color="#e38100" size="sm">
            Add to cart
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
}

export default EventCard;
