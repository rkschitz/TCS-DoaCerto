// import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login.jsx';
import Register from './pages/registro/RegisterPerson.jsx';
import { AuthProvider } from './auth/Context';
import React, { use, useEffect } from 'react';
import Layout from './components/Layout/Layout';
// import Profile from './pages/Profile';
// import Favorites from './pages/Favorites';
// import BreedFeed from './pages/Breeds';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ListPersons from './pages/Person/ListPerson.jsx';
import { useState } from 'react';

const App = () => {

  const [role, setRole] = useState(null);
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }
    , []);

  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          {role === 'A' && <Route path='/persons' element={<ListPersons />} />}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: "50%" }}
      />
    </AuthProvider>
  )
}

export default App
