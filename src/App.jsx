import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import RegistrationPage from "./pages/RegistrationPage";
import AddEvent from "./pages/AddEvent";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return (
    <Routes>
      <Route
        path="/add-event"
        element={isLoggedIn && isAdmin ? <AddEvent /> : <Navigate to="/" />}
      />
      <Route
        path="/registration-page"
        element={isLoggedIn ? <Navigate to="/" /> : <RegistrationPage />}
      />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/dashboard"
        element={isLoggedIn && isAdmin ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/checkout"
        element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />}
      />
      <Route
        path="/"
        element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
