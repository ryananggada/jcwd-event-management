import { Box, Text, Flex, Image } from '@chakra-ui/react';
import Layout from '../components/Layout';

function Checkout() {
  return (
    <Layout>
      <Text>Order Summary</Text>
      <Flex>
        <Image src='https://placehold.co/400x300' />
        <Box>
          <Text fontSize='2xl' fontWeight='bold'>
            Event Title
          </Text>
          <Text>Price goes here...</Text>
        </Box>
      </Flex>
    </Layout>
  );
}

export default Checkout;
