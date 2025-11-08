
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import FindPartners from "../Pages/FindPartners/FindPartners";



const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/find-partners',
                Component: FindPartners
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            },
            // {
            //     path: '/create-partner-profile',
            //     element: <PrivateRoutes><CreatePartnerProfile></CreatePartnerProfile></PrivateRoutes>
            // },
            // {
            //     path: '/my-connections',
            //     element: <PrivateRoutes><MyConnections></MyConnections></PrivateRoutes>
            // }

        ]
    },

]);

export default router;