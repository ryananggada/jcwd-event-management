import { Box, Input, Image, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import wallpaper from "../assets/wallpaper.png";

function MainPage() {
  return (
    <>
      <Link to="/">
        <Image src={wallpaper} w="100vw" h="100vh" />
      </Link>
      <Box display="inline-flex">
        <Input
          marginTop="3vw"
          marginRight="30vw"
          marginLeft="30vw"
          placeholder="Mau cari apa?"
        ></Input>
      </Box>
    </>
  );
}

export default MainPage;
