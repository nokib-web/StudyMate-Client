import { FaEnvelope, FaHome, FaUsers, FaChartPie, FaUserCircle, FaCog, FaSignOutAlt, FaPlus } from "react-icons/fa";
import { NavLink, Outlet, Link } from "react-router";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
    const [isAdmin] = useAdmin();
    const { logOut } = useAuth();

    return (
        <div className="drawer max-w-7xl mx-auto lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* Page Content */}
            <div className="drawer-content flex flex-col min-h-screen bg-base-50">
                {/* Mobile Navbar for Dashboard */}
                <div className="navbar bg-base-100 shadow-sm lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 text-xl font-bold text-primary">StudyMate</div>
                </div>

                <div className="p-4 md:p-8 flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side z-20">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <div className="menu p-4 w-72 min-h-full bg-base-100 text-base-content border-r border-base-200 flex flex-col">
                    {/* Logo/Brand */}
                    <div className="mb-8 px-2 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl">S</div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">StudyMate</h2>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">{isAdmin ? 'Admin' : 'Student'} Panel</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <ul className="space-y-2 flex-1">
                        <li>
                            <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "active bg-primary text-white font-medium my-rounded-md" : "font-medium my-rounded-md"}>
                                <FaChartPie className="text-lg" /> Overview
                            </NavLink>
                        </li>

                        {isAdmin ? (
                            <>
                                <li className="menu-title mt-4 text-xs font-semibold text-gray-400 uppercase">Management</li>
                                <li>
                                    <NavLink to="/dashboard/all-users" className={({ isActive }) => isActive ? "active bg-primary text-white font-medium my-rounded-md" : "font-medium my-rounded-md"}>
                                        <FaUsers className="text-lg" /> All Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-blogs" className={({ isActive }) => isActive ? "active bg-primary text-white font-medium my-rounded-md" : "font-medium my-rounded-md"}>
                                        <FaCog className="text-lg" /> Manage Blogs
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-blog" className={({ isActive }) => isActive ? "active bg-primary text-white font-medium my-rounded-md" : "font-medium my-rounded-md"}>
                                        <FaPlus className="text-lg" /> Add Blog
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="menu-title mt-4 text-xs font-semibold text-gray-400 uppercase">Learning</li>
                                <li>
                                    <NavLink to="/my-connections" className="font-medium my-rounded-md">
                                        <FaUsers className="text-lg" /> My Partners
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/chat" className="font-medium my-rounded-md">
                                        <FaEnvelope className="text-lg" /> Messages
                                    </NavLink>
                                </li>
                            </>
                        )}

                        <li className="menu-title mt-4 text-xs font-semibold text-gray-400 uppercase">Settings</li>
                        <li>
                            <NavLink to="/my-profile" className="font-medium my-rounded-md">
                                <FaUserCircle className="text-lg" /> Profile
                            </NavLink>
                        </li>
                    </ul>

                    {/* Footer / Logout */}
                    <div className="border-t border-base-200 pt-4 mt-auto">
                        <Link to="/" className="flex items-center gap-3 p-2 hover:bg-base-100 rounded-lg mb-2 transition-colors">
                            <FaHome className="text-gray-400" />
                            <span className="font-medium">Back to Home</span>
                        </Link>
                        <button onClick={logOut} className="flex w-full items-center gap-3 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <FaSignOutAlt />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
