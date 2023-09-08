import { Routes, Route } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import AnotherPage from './pages/AnotherPage';
import RegistrationPage from './pages/RegistrationPage';
import Login from './pages/Login';



function App() {

  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/another-page' element={<AnotherPage />} />
        <Route path='/registration-page' element={<RegistrationPage />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </Flex>
  );
}

export default App;
