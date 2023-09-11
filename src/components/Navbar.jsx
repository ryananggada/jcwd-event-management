import { Box, Image, ButtonGroup, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logoTicket from "../assets/LogoTicket.png";

function Navbar() {
  return (
    <Box
      shadow={"md"}
      h={"15vh"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      paddingLeft={"20px"}
      paddingRight={"20px"}
    >
      <Link to="/">
        <Image src={logoTicket} />
      </Link>
      <ButtonGroup gap="2">
        <Link to="/login">
          <Button backgroundColor={"#e38100"}>Login</Button>
        </Link>
        <Link to="registration-page">
          <Button backgroundColor={"#e38100"}>Sign Up</Button>
        </Link>
      </ButtonGroup>
    </Box>
  );
}

export default Navbar;
