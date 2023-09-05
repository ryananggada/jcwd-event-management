import { Routes, Route } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import AnotherPage from "./pages/AnotherPage";
import AddEventPage from "./pages/AddEvent";

function App() {
  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Routes>
        <Route path="/add-event" element={<AddEventPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/another-page" element={<AnotherPage />} />
      </Routes>
    </Flex>
  );
}

export default App;
