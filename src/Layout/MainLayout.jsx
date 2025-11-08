import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
           <div className='w-11/12 mx-auto'>
             <Outlet />
           </div>
            <Footer />
        </div>
    );
};

export default MainLayout;