
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import FindPartners from "../Pages/FindPartners/FindPartners";
import CreatePartnerProfile from "../Pages/CreatePartnerProfile/CreatePartnerProfile";

import MyConnections from "../Pages/MyConnections/MyConnections";

import PrivateRoute from "./PrivateRoute";
import PartnerDetails from "../Pages/FindPartners/PartnerDetails";
import ProfilePage from "../Pages/MyProfile/ProfilePage";
import NotFoundPage from "../components/NotFoundPage";




const router = createBrowserRouter([
    {
        path: "/",
        
        errorElement: <NotFoundPage />,
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
                path: '/find-partners/:id',
                element: <PrivateRoute><PartnerDetails></PartnerDetails></PrivateRoute>
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/create-partner-profile',
                element: <PrivateRoute><CreatePartnerProfile></CreatePartnerProfile></PrivateRoute>
            },
            {
                path: '/my-connections',
                element: <PrivateRoute><MyConnections></MyConnections></PrivateRoute>
            },
            {
                path: '/my-profile',
               element: <PrivateRoute><ProfilePage></ProfilePage></PrivateRoute>
            },
        
            {
                path: '*',
                Component: NotFoundPage
            }

        ]
    },

]);

export default router;