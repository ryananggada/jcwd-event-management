import {
  useDisclosure,
  Box,
  useColorModeValue,
  Drawer,
  Flex,
  Text,
  CloseButton,
  Icon,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  VStack,
  MenuList,
  MenuItem,
  MenuDivider,
  DrawerContent,
  Image,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiMenu,
  FiChevronDown,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../slices/authLogin';
import logoTicket from '../assets/LogoTicket.png';

const LinkItems = [
  { name: 'Home', icon: FiHome, link: '/dashboard' },
  { name: 'Add Event', icon: FiTrendingUp, link: '/add-event' },
  { name: 'View Events', icon: FiCompass, link: '/dashboard' },
];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h={20} alignItems='center' mx={8} justifyContent='space-between'>
        <Image src={logoTicket} width='180px' />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.link}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, link, children, ...rest }) => {
  return (
    <Link to={link}>
      <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align='center'
          p={4}
          mx={4}
          borderRadius='lg'
          role='group'
          cursor='pointer'
          _hover={{ bg: '#e38100', color: 'white' }}
          {...rest}
        >
          {icon && (
            <Icon
              mr={4}
              fontSize={16}
              _groupHover={{ color: 'white' }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </Link>
  );
};

const MobileNav = ({ onOpen, dispatch, profile, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height={20}
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />
      <Box display={{ base: 'flex', md: 'none' }}>
        <Image src={logoTicket} width='160px' />
      </Box>
      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems='center'>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar size='sm' />
                <VStack>
                  <Text fontSize='sm'>
                    {profile.firstName} {profile.lastName}
                  </Text>
                  <Text fontSize='xs' color='gray.600'>
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

function DashboardLayout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);

  return (
    <Box minH='100vh' background={useColorModeValue('white', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} dispatch={dispatch} profile={profile} />
      <Box ml={{ base: 0, md: 60 }} p={4}>
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;
