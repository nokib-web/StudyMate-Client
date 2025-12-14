import { FaEnvelope, FaHome, FaSearch, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router";


const DashboardLayout = () => {
    // TODO: Add isAdmin check here if we want to conditionally render menu items based on role (though AdminRoute protects the page)

    return (
        <div className="flex">
            {/* Dashboard Sidebar */}
            <div className="w-64 min-h-screen bg-primary text-primary-content">
                <div className="p-6">
                    <h2 className="text-2xl font-bold">StudyMate</h2>
                    <span className="badge badge-secondary mt-2">Admin Panel</span>
                </div>
                <ul className="menu p-4">
                    {/* Admin Routes */}
                    <li>
                        <NavLink to="/dashboard/all-users">
                            <FaUsers></FaUsers>
                            All Users
                        </NavLink>
                    </li>

                    <div className="divider"></div>

                    {/* Shared Routes */}
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/chat">
                            <FaEnvelope></FaEnvelope>
                            Chat
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 p-8 bg-base-100">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;
