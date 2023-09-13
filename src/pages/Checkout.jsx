import { Box, Text, Flex, Image, Button, useToast } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Checkout() {
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const localInstantBuy = useSelector((state) => state.buy.buyInstant)
  const propsData = location.state;

  return (
    <>
    {localInstantBuy  ? 
    <Layout>
      <Box margin="16px">
        <Text fontSize="4xl" fontWeight="bold" marginY="12px">
          Order Summary
        </Text>
        <Image src={propsData.image} height="256px" />
        <Text fontSize="2xl" fontWeight="bold" marginY="16px">
          {localInstantBuy.artist}
        </Text>
        <Text>{localInstantBuy.date}</Text>
        <Text>{localInstantBuy.time}</Text>
        <Text>{localInstantBuy.location}</Text>
        <Text>{localInstantBuy.price}</Text>
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
  : null }
  </>
  );
}

export default Checkout;
