import { Box, Image, ButtonGroup, Button, Menu, MenuItem, MenuList, MenuGroup, MenuButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logoTicket from "../assets/LogoTicket.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authLogin";
import { useNavigate } from "react-router-dom";


function Navbar(props) {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profile = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen: isOpenReff, onOpen: onOpenReff, onClose: onCloseReff } = useDisclosure()
  const { isOpen: isOpenAcc, onOpen: onOpenAcc, onClose: onCloseAcc } = useDisclosure()





  return (
    <>
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
        {isLoggedIn ? (
          <>
            <ButtonGroup gap={2}>
              <Link to="/add-event">
                <Button backgroundColor={"#e38100"}>Create Event</Button>
              </Link>
              <Menu>
                <MenuButton as={Button} backgroundColor={"#e38100"}>
                  Hi, {profile.firstName}!
                </MenuButton>
                <MenuList>
                  <MenuGroup title='Profile'>
                    <MenuItem onClick={onOpenAcc}>My Account</MenuItem>
                    <Modal isOpen={isOpenAcc} onClose={onCloseAcc}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>My Account</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          First Name: {profile.firstName}
                          Last Name: {profile.lastName}
                          Username: {profile.username}
                          Password: {profile.password}
                        </ModalBody>

                        <ModalFooter>
                          <Button colorScheme="gray" mr={3} onClick={onCloseAcc}>
                            Close
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                    <MenuItem>My Events </MenuItem>
                    <MenuItem>My Tickets </MenuItem>
                    <MenuItem onClick={onOpenReff}>Referral Code</MenuItem>
                    <Modal isOpen={isOpenReff} onClose={onCloseReff}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Referral Code</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Center>
                            Share your referral code and get discount for you and your friends when they make first order!
                          </Center>
                          <br />
                          <Box borderWidth='1px'>
                            <Center>
                              <Text as='b' fontSize='3xl'>{profile.reffcode}</Text>
                            </Center>
                          </Box>
                        </ModalBody>

                        <ModalFooter>
                          <Button colorScheme="gray" mr={3} onClick={onCloseReff}>
                            Close
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                    <MenuItem
                      onClick={() => {
                        dispatch(logout());
                        navigate("/");
                      }}>
                      Logout</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </ButtonGroup>
          </>
        ) : (
          <>
            <ButtonGroup gap="2">
              <Link to="/login">
                <Button backgroundColor={"#e38100"}>Login</Button>
              </Link>
              <Link to="registration-page">
                <Button backgroundColor={"#e38100"}>Sign Up</Button>
              </Link>
            </ButtonGroup>
          </>
        )}
      </Box >

    </>

  );
}

export default Navbar;
