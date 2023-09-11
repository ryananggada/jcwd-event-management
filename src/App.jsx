import { Routes, Route } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import RegistrationPage from "./pages/RegistrationPage";
import AddEventPage from "./pages/AddEvent";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Flex direction="column" minHeight="100vh">
        <Navbar />
        <Routes>
          <Route path="/add-event" element={<AddEventPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/registration-page" element={<RegistrationPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Flex>
    </Provider>
  );
}

export default App;
