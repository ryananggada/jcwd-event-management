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
import { Link } from "react-router-dom";
import api from "../api";
import Layout from "../components/Layout";
import EventCard from "../components/EventCard";
import { useDispatch } from "react-redux";

function MainPage() {
  const [events, setEvents] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [sugest, setSugest] = useState([]);
  const toast = useToast();
  const dispatch = useDispatch()

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
  }, [toast]);

  const handleSearch = (e) => {
    const input = e.target.value;
    setSearchData(input);

    const filtered = events.filter((event) =>
      event?.artist?.toLowerCase().includes(input.toLowerCase())
    );

    setSugest(filtered);
  };

  const fetchData = async () => {
    try {
      // manggil api dengan method get
      const res = await api.get("/events");

      setEvents(res.data);
    } catch (err) {
      toast({
        title: "something wrong",
        description: err.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  // merender hasil get data dengan cara melakukan iterasi kepada setiap event,
  // lalu hasilnya ditaro ke props yg ada di komponen EventCard
  const renderData = () => {
    return events?.map((event) => {
      return (
        <EventCard
          artist={event.artist}
          genre={event.genre}
          date={event.date}
          time={event.time}
          location={event.location}
          description={event.description}
          price={event.price}
          image={event.image}
        />
      );
    });
  };

  useEffect(() => {
    // if(sugest){

    // }
    fetchData();
  }, []);

  return (
    <Layout>
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
            onChange={(e) => handleSearch(e)}
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
            <Box marginRight="30vw" marginLeft="30vw">
              {searchData &&
                sugest.map((event) => (
                  <MenuItem _last={{ borderBottomRadius: "md" }} bg={"white"}>
                    {event.artist}
                  </MenuItem>
                ))}
            </Box>
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
                  <Link to="/checkout" state={event}>
                    <Button
                      variant="solid"
                      backgroundColor="#e38100"
                      size="sm"
                      onClick={() => {

                      }}
                    >
                      Buy now
                    </Button>
                  </Link>
                  <Button variant="ghost" color="#e38100" size="sm">
                    Add to cart
                  </Button>
                </Flex>
              </CardFooter>
            </Card>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
}

export default MainPage;
