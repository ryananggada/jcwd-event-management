import {
  Box,
  Input,
  Image,
  useToast,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
  Grid,
  Flex,
  MenuItem,
  Menu,
} from "@chakra-ui/react";
import wallpaper from "../assets/wallpaper.png";
import { useEffect, useState } from "react";
import api from "../api";

function MainPage() {
  const [events, setEvents] = useState([]);
  const toast = useToast();
  useEffect(() => {
    api
      .get("/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        toast({
          title: "something wrong",
          description: err.message,
          status: "error",
          isClosable: true,
        });
      });
  }, []);
  console.log(events);
  const [searchData, setSearchData] = useState([]);
  const [sugest, setSugest] = useState([]);
  const handleSearch = (event) => {
    const input = event.target.value;
    setSearchData(input);
    const filtered = events.filter((event) =>
      event.artist.toLowerCase().includes(input.toLowerCase())
    );
    setSugest(filtered);
  };
  return (
    <>
      <Box
        backgroundImage={wallpaper}
        bgRepeat="no-repeat"
        bgSize="100%"
        w="100%"
        h="100vh"
      >
        <Flex>
          <Input
            type="text"
            onChange={handleSearch}
            value={searchData}
            background="Gray.100"
            marginTop="3vw"
            marginRight="30vw"
            marginLeft="30vw"
            placeholder="Mau cari apa?"
          />
        </Flex>
        <Box>
          <Menu>
            {searchData &&
              sugest.map((event) => (
                <MenuItem bg={"white"}>{event.artist}</MenuItem>
              ))}
          </Menu>
        </Box>
      </Box>
      <Box>
        <Grid
          templateColumns={{
            base: "repeat(2,1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={6}
        >
          {events.map((event) => (
            <Card maxW="sm">
              <CardBody>
                <Image
                  src={event.image}
                  alt=""
                  borderRadius="lg"
                  w="20vw"
                  h="35vh"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{event.artist}</Heading>
                  <Text>
                    <b>Genre:</b> {event.genre}
                  </Text>
                  <Text>
                    <b>Date:</b> {event.date}
                  </Text>
                  <Text>
                    <b>Time:</b> {event.time}
                  </Text>
                  <Text>
                    <b>Location:</b> {event.location}
                  </Text>
                  <Text>
                    <b>Description :</b> <br />
                    {event.description}
                  </Text>
                  <Text color="#e38100" fontSize="2xl">
                    {event.price}
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
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default MainPage;
