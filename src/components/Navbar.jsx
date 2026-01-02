
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { IoLogOut } from 'react-icons/io5';
import { FaUser, FaBars } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";
import useAuth from '../hooks/useAuth';
import logo from '../assets/studyMate.png';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const html = document.querySelector('html');
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light");
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Find Partners', path: '/find-partners' },
        { name: 'Be a Partner', path: '/create-partner-profile' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const renderLinks = (
        <>
            {navLinks.map((link) => (
                <li key={link.path}>
                    <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                            `font-medium transition-colors hover:text-primary ${isActive ? 'text-primary font-bold' : ''}`
                        }
                    >
                        {link.name}
                    </NavLink>
                </li>
            ))}
            {user && (
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `font-medium transition-colors hover:text-primary ${isActive ? 'text-primary font-bold' : ''}`
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className='bg-base-200'>
            <nav
                className={`sticky top-0 z-50 max-w-7xl mx-auto transition-all duration-300 ${isScrolled ? 'bg-base-100/80 backdrop-blur-md shadow-md' : 'bg-base-200'
                    }`}
            >
                <div className="navbar container mx-auto px-4">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <FaBars className="h-5 w-5" />
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
                            >
                                {renderLinks}
                            </ul>
                        </div>
                        <Link to="/" className="flex items-center gap-2">
                            <img src={logo} alt="StudyMate Logo" className="w-10 h-10 rounded-full object-cover border-2 border-primary" />
                            <div className="flex flex-col leading-tight">
                                <span className="text-xl font-heading font-bold text-primary">Study<span className="text-secondary">Mate</span></span>
                            </div>
                        </Link>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 gap-2">
                            {renderLinks}
                        </ul>
                    </div>

                    <div className="navbar-end gap-3">
                        {/* Theme Toggle */}
                        <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">
                            <input type="checkbox" onChange={handleTheme} checked={theme === "dark"} />
                            {/* sun icon */}
                            <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                            {/* moon icon */}
                            <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                        </label>

                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-base-300">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="User Avatar"
                                            src={user.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex="-1"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-base-200"
                                >
                                    <li className="menu-title px-4 py-2 border-b border-base-200 mb-2">
                                        <span className="text-base font-bold truncate block text-primary">{user.displayName}</span>
                                        <span className="text-xs font-normal opacity-70 block truncate">{user.email}</span>
                                    </li>
                                    <li>
                                        <Link to="/my-profile" className='py-2'>
                                            <FaUser className="w-4 h-4" /> Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/all-users" className='py-2'>
                                            <MdDashboard className="w-4 h-4" /> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="py-2 text-error hover:bg-error/10">
                                            <IoLogOut className="w-4 h-4" /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Link to="/login" className="btn btn-sm btn-ghost">Log In</Link>
                                <Link to="/register" className="btn btn-sm btn-primary text-white">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;