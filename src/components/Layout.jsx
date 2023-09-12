import { Flex } from '@chakra-ui/react';
import Navbar from './Navbar';

function Layout(props) {
  return (
    <Flex direction='column' minHeight='100vh'>
      <Navbar />
      <main>{props.children}</main>
    </Flex>
  );
}

export default Layout;
