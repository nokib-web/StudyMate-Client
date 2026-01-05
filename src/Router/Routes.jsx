
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import FindPartners from "../Pages/FindPartners/FindPartners";
import CreatePartnerProfile from "../Pages/CreatePartnerProfile/CreatePartnerProfile";

import MyConnections from "../Pages/MyConnections/MyConnections";
import Chat from "../Pages/Chat/Chat";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Blogs from "../Pages/Blog/Blogs";
import BlogDetails from "../Pages/Blog/BlogDetails";

import PrivateRoute from "./PrivateRoute";
import PartnerDetails from "../Pages/FindPartners/PartnerDetails";
import ProfilePage from "../Pages/MyProfile/ProfilePage";
import NotFoundPage from "../components/NotFoundPage";

import AdminRoute from "./AdminRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import AllUsers from "../Pages/Dashboard/AllUsers";
import DashboardOverview from "../Pages/Dashboard/DashboardOverview";
import ManageBlogs from "../Pages/Dashboard/ManageBlogs";
import ManageStories from "../Pages/Dashboard/ManageStories";
import AddBlog from "../Pages/Dashboard/AddBlog";




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
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <Contact />
            },

            {
                path: '/blogs',
                element: <Blogs />
            },
            {
                path: '/blogs/:id',
                element: <BlogDetails />
            },
            {
                path: '*',
                Component: NotFoundPage
            }

        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                element: <DashboardOverview />
            },
            {
                path: 'all-users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'manage-blogs',
                element: <AdminRoute><ManageBlogs /></AdminRoute>
            },
            {
                path: 'manage-stories',
                element: <AdminRoute><ManageStories /></AdminRoute>
            },
            {
                path: 'add-blog',
                element: <AdminRoute><AddBlog /></AdminRoute>
            },
            {
                path: 'edit-blog/:id',
                element: <AdminRoute><AddBlog /></AdminRoute>
            },
            {
                path: 'my-connections',
                element: <MyConnections />
            },
            {
                path: 'messages',
                element: <Chat />
            },
            {
                path: 'profile',
                element: <ProfilePage />
            }
        ]
    }

]);

export default router;