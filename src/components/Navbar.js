import {
  Flex,
  Box,
  Image,
  ButtonGroup,
  Button,
  Spacer,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logoTicket from '../assets/LogoTicket.png';

function Navbar() {
  return (
    <Flex minWidth='max-content' alignItems='center' gap='2' padding='16px'>
      <Box p='2'>
        <Link to='/'>
          <Image src={logoTicket} />
        </Link>
      </Box>
      <Spacer />
      <ButtonGroup gap='2'>
        <Link to='/another-page'>
          <Button colorScheme='teal'>Log In</Button>
        </Link>
        <Link to='/registration-page'>
          <Button colorScheme='teal'>Sign Up</Button>
        </Link>
      </ButtonGroup>
    </Flex>
  );
}

export default Navbar;
