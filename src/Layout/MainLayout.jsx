import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSocket } from '../context/SocketProvider';
import Swal from 'sweetalert2';

const MainLayout = () => {
    const socket = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on("receive_partner_request", (data) => {
                Swal.fire({
                    title: "New Partner Request!",
                    text: `${data.senderEmail || "Someone"} wants to be your partner!`,
                    icon: "info",
                    confirmButtonText: "View"
                });
            });

            return () => {
                socket.off("receive_partner_request");
            };
        }
    }, [socket]);

    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar />
            <div className='min-h-screen   '>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;