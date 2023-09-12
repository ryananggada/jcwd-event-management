import {
  Box,
  Image,
  ButtonGroup,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuGroup,
  MenuDivider,
  MenuButton,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logoTicket from '../assets/LogoTicket.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authLogin';

function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profile = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();

  return (
    <Box
      shadow={'md'}
      h={'12vh'}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      paddingLeft={'20px'}
      paddingRight={'20px'}
      position='sticky'
      top={0}
      zIndex={999}
      background='white'
    >
      <Link to='/'>
        <Image src={logoTicket} width='180px' />
      </Link>
      {isLoggedIn ? (
        <>
          <Menu>
            <MenuButton as={Button} backgroundColor={'#e38100'}>
              Hi, {profile.firstName}!
            </MenuButton>
            <MenuList>
              <MenuGroup title='Profile'>
                <MenuItem>My Account</MenuItem>
                <MenuItem>My Events </MenuItem>
                <MenuItem>My Tickets </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title='Help'>
                <MenuItem>Settings</MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Logout
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </>
      ) : (
        <ButtonGroup gap='2'>
          <Link to='/login'>
            <Button backgroundColor={'#e38100'}>Login</Button>
          </Link>
          <Link to='/registration-page'>
            <Button backgroundColor={'#e38100'}>Sign Up</Button>
          </Link>
        </ButtonGroup>
      )}
    </Box>
  );
}

export default Navbar;
