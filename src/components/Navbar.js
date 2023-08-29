import {
  Flex,
  Box,
  Heading,
  ButtonGroup,
  Button,
  Spacer,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <Flex minWidth='max-content' alignItems='center' gap='2' padding='16px'>
      <Box p='2'>
        <Link to='/'>
          <Heading size='md'>Chakra App</Heading>
        </Link>
      </Box>
      <Spacer />
      <ButtonGroup gap='2'>
        <Link to='/another-page'>
          <Button colorScheme='teal'>Another page</Button>
        </Link>
        <Button colorScheme='teal'>Log in</Button>
      </ButtonGroup>
    </Flex>
  );
}

export default Navbar;
