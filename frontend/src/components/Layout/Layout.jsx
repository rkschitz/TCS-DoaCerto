import React from 'react';
import Header from '../header/header.jsx';
// import Footer from '../Footer';
import PrivateRoute from '../PrivateRoute/index.jsx';
import './styles.css'

export default function Layout() {
    return (
        <div className="estrutura">
            <Header   />
            <div className='content'>
                <PrivateRoute />
            </div>
            {/* <Footer /> */}
        </div>
    )
}