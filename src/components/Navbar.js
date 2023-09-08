import {
  Flex,
  Box,
  Image,
  ButtonGroup,
  Button,
  Spacer,
  Text,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent

} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import LogoTicket from '../assets/LogoTicket.png';

function Navbar() {
  return (
    <Flex minWidth='max-content' alignItems='center' gap='2' padding='16px'>
      <Box color chp='2'>
        <Link to='/'>

        </Link>
      </Box>
      <Spacer />
      <ButtonGroup gap='2'>
        <Link to='/login'>
          <Button colorScheme='teal'>Login</Button>
        </Link>
        <Link to='/registration-page'>
          <Button colorScheme='teal'>Sign Up</Button>
        </Link>
      </ButtonGroup>
    </Flex>
  );
}

export default Navbar;
