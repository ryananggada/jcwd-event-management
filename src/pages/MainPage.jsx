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
import Layout from "../components/Layout";
import EventCard from "../components/EventCard";

function MainPage() {
  const [events, setEvents] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [sugest, setSugest] = useState([]);
  const toast = useToast();

  const handleSearch = (event) => {
    const input = event.target.value;
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
          {renderData()}
        </Grid>
      </Box>
    </Layout>
  );
}

export default MainPage;
