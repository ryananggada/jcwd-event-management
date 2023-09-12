import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
  Center,
} from '@chakra-ui/react';
import React from 'react';

function EventCard() {
  return (
    <Center>
      <Card maxW='sm'>
        <CardBody>
          <Image src='https://placehold.co/400x300' />
          <Stack mt={6} spacing={3}>
            <Heading size='md'>Event name</Heading>
            <Text>Description goes here</Text>
            <Text color='blue.600' fontSize='2xl'>
              IDR 69.420
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button>Book now</Button>
        </CardFooter>
      </Card>
    </Center>
  );
}

export default EventCard;
