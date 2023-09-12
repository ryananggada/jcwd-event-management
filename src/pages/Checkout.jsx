import { Box, Text, Flex, Image, Button, useToast } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const propsData = location.state;

  return (
    <Layout>
      <Box margin="16px">
        <Text fontSize="4xl" fontWeight="bold" marginY="12px">
          Order Summary
        </Text>
        <Image src={propsData.image} height="256px" />
        <Text fontSize="2xl" fontWeight="bold" marginY="16px">
          {propsData.artist}
        </Text>
        <Text>{propsData.date}</Text>
        <Text>{propsData.time}</Text>
        <Text>{propsData.location}</Text>
        <Text>{propsData.price}</Text>
        <Button
          colorScheme="green"
          marginY="16px"
          onClick={() => {
            toast({
              status: "success",
              title: "Purchase successful",
              description: "Redirecting you to home",
              isClosable: true,
              duration: 1500,
              onCloseComplete: () => {
                navigate("/");
              },
            });
          }}
        >
          Checkout
        </Button>
      </Box>
    </Layout>
  );
}

export default Checkout;
