import { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { AuthContext } from './AuthContext';
import { SocketContext } from './SocketContext';

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            // Replace with your actual server URL if different
            const newSocket = io('https://study-mate-server-kvw8.onrender.com');
            setSocket(newSocket);

            newSocket.emit('register', user.email);

            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};
