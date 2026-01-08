import { FaEnvelope, FaHome, FaUsers, FaChartPie, FaUserCircle, FaCog, FaSignOutAlt, FaPlus, FaQuoteRight } from "react-icons/fa";
import { NavLink, Outlet, Link } from "react-router";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
    const [isAdmin] = useAdmin();
    const { user, logOut } = useAuth();

    return (
        <div className="drawer max-w-7xl mx-auto lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* Page Content */}
            <div className="drawer-content flex flex-col min-h-screen bg-base-200">
                {/* Mobile Navbar for Dashboard */}
                <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-10 border-b border-base-300 lg:hidden px-4">
                    <div className="flex-none">
                        <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-circle text-base-content">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1">
                        <span className="text-lg font-bold bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">StudyMate</span>
                    </div>
                    <div className="flex-none">
                        <div className="avatar w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                            <img src={user?.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'} alt="user" />
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-8 flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side z-20">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <div className="menu p-6 w-80 min-h-full bg-base-100 text-base-content border-r border-base-300 flex flex-col shadow-xl lg:shadow-none">
                    {/* Logo/Brand */}
                    <div className="mb-10 px-2 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-primary to-blue-600 flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <FaChartPie className="text-xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black tracking-tight text-base-content">StudyMate</h2>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${isAdmin ? 'bg-orange-500' : 'bg-green-500 animate-pulse'}`}></span>
                                <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest text-base-content">{isAdmin ? 'Administrator' : 'Student Pro'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <ul className="space-y-1.5 flex-1">
                        <li>
                            <NavLink to="/dashboard" end className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? "bg-primary/10 text-primary font-bold" : "text-base-content opacity-50 hover:bg-base-200 hover:opacity-100"
                                }`}>
                                <FaChartPie className="text-lg" />
                                <span className="flex-1">Overview</span>
                                <div className="w-1 h-5 bg-primary rounded-full scale-y-0 group-[.active]:scale-y-100 transition-transform origin-center"></div>
                            </NavLink>
                        </li>

                        {isAdmin ? (
                            <>
                                <li className="px-4 pt-6 pb-2 text-[11px] font-black opacity-30 uppercase tracking-[0.2em] text-base-content">Management</li>
                                <li>
                                    <NavLink to="/dashboard/all-users" className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? "bg-primary/10 text-primary font-bold" : "text-base-content opacity-50 hover:bg-base-200 hover:opacity-100"
                                        }`}>
                                        <FaUsers className="text-lg" />
                                        <span className="flex-1">All Users</span>
                                        <div className="w-1 h-5 bg-primary rounded-full scale-y-0 group-[.active]:scale-y-100 transition-transform"></div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-blogs" className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? "bg-primary/10 text-primary font-bold" : "text-base-content opacity-50 hover:bg-base-200 hover:opacity-100"
                                        }`}>
                                        <FaCog className="text-lg" />
                                        <span className="flex-1">Manage Blogs</span>
                                        <div className="w-1 h-5 bg-primary rounded-full scale-y-0 group-[.active]:scale-y-100 transition-transform"></div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-stories" className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? "bg-primary/10 text-primary font-bold" : "text-base-content opacity-50 hover:bg-base-200 hover:opacity-100"
                                        }`}>
                                        <FaQuoteRight className="text-lg" />
                                        <span className="flex-1">Manage Stories</span>
                                        <div className="w-1 h-5 bg-primary rounded-full scale-y-0 group-[.active]:scale-y-100 transition-transform"></div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-blog" className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? "bg-primary/10 text-primary font-bold" : "text-base-content opacity-50 hover:bg-base-200 hover:opacity-100"
                                        }`}>
                                        <FaPlus className="text-lg" />
                                        <span className="flex-1">Add Blog</span>
                                        <div className="w-1 h-5 bg-primary rounded-full scale-y-0 group-[.active]:scale-y-100 transition-transform"></div>
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="px-4 pt-6 pb-2 text-[11px] font-black opacity-30 uppercase tracking-[0.2em] text-base-content">Learning</li>
                                <li>
                                    <NavLink to="/dashboard/my-connections" className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? "bg-primary/10 text-primary font-bold" : "text-base-content opacity-50 hover:bg-base-200 hover:opacity-100"
                                        }`}>
                                        <FaUsers className="text-lg" />
                                        <span className="flex-1">My Partners</span>
                                        <div className="w-1 h-5 bg-primary rounded-full scale-y-0 group-[.active]:scale-y-100 transition-transform"></div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/messages" className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? "bg-primary/10 text-primary font-bold" : "text-base-content opacity-50 hover:bg-base-200 hover:opacity-100"
                                        }`}>
                                        <FaEnvelope className="text-lg" />
                                        <span className="flex-1">Messages</span>
                                        <div className="w-1 h-5 bg-primary rounded-full scale-y-0 group-[.active]:scale-y-100 transition-transform"></div>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        <li className="px-4 pt-6 pb-2 text-[11px] font-black opacity-30 uppercase tracking-[0.2em] text-base-content">Settings</li>
                        <li>
                            <NavLink to="/dashboard/profile" className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? "bg-primary/10 text-primary font-bold" : "text-base-content opacity-50 hover:bg-base-200 hover:opacity-100"
                                }`}>
                                <FaUserCircle className="text-lg" />
                                <span className="flex-1">Profile</span>
                                <div className="w-1 h-5 bg-primary rounded-full scale-y-0 group-[.active]:scale-y-100 transition-transform"></div>
                            </NavLink>
                        </li>
                    </ul>

                    {/* Footer / User Profile */}
                    <div className="border-t border-base-300 pt-6 mt-6 space-y-4">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-base-200">
                            <div className="w-10 h-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden shrink-0">
                                <img src={user?.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'} alt="avatar" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-base-content truncate">{user?.displayName}</h4>
                                <p className="text-[10px] opacity-40 truncate uppercase tracking-tighter text-base-content font-bold">{user?.role || 'Member'}</p>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Link to="/" className="flex items-center gap-3 px-4 py-2 hover:bg-base-200 rounded-lg text-base-content opacity-50 hover:opacity-100 transition-all text-sm">
                                <FaHome className="text-lg" />
                                <span className="font-bold">Back to Home</span>
                            </Link>
                            <button onClick={logOut} className="flex w-full items-center gap-3 px-4 py-2 text-error hover:bg-error/10 rounded-lg transition-all text-sm">
                                <FaSignOutAlt className="text-lg" />
                                <span className="font-bold">Logout Account</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
