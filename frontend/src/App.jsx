import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login.jsx';
import Register from './pages/registro/RegisterPerson.jsx';
import { AuthProvider } from './auth/Context';
import React, { use, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ListPersons from './pages/Person/Person.jsx';
import { useState } from 'react';
import Organization from './pages/Organization/Organization.jsx';
import MeasurementUnit from './pages/MeasurementUnit/MeasurementUnit.jsx';
import Aliment from './pages/Aliment/Aliment.jsx';

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
          {role === 'A' && <Route path='/organizations' element={<Organization />} />}
          {role === 'A' && <Route path='/measurementUnit' element={<MeasurementUnit />} />}
          {role === 'A' || role === 'O' && <Route path='/aliments' element={<Aliment />} />}
          <Route path='/' element={<div>Ola mundo</div>} />
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
