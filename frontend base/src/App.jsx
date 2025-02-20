import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/Context';
import React from 'react';
import Layout from './components/Layout/index';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// import Home from './pages/Home',
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<p>Ola mundo</p>} />
          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/feed" element={<BreedFeed />} /> */}
        </Route>
         <Route path="/login" element={<Login />} />
        {/*<Route path="/register" element={<Register />} /> */}
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
