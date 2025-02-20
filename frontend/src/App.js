import React from "react";
import { Routes, Route } from "react-router-dom"; // Removido BrowserRouter daqui
import Header from "./components/header/header";
import Login from "./pages/login/login";
import Register from "./pages/registro/registrar";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/registrar" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
