// import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login.jsx';
import Register from './pages/registro/RegisterPerson.jsx';
import { AuthProvider } from './auth/Context';
import React from 'react';
import Layout from './components/Layout/Layout';
// import Profile from './pages/Profile';
// import Favorites from './pages/Favorites';
// import BreedFeed from './pages/Breeds';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ListPersons from './pages/Person/ListPerson.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/feed" element={<BreedFeed />} /> */}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/persons' element={<ListPersons />} />
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
