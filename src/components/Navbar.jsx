
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { IoLogIn, IoLogOut } from 'react-icons/io5';
import { FaGear } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    // const { user, logout } = use(AuthContext)
    const { user, logout } = useAuth()

    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")

    useEffect(() => {
        const html = document.querySelector('html')
        html.setAttribute("data-theme", theme)
        localStorage.setItem("theme", theme)
    }, [theme])


    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light")
    }

    const handleLogout = () => {
        logout()
    }

    const links = <>
        <NavLink className='ml-4 lg:ml-6 font-semibold' to={'/'}><li>Home</li></NavLink>
        <NavLink className='ml-4 lg:ml-6 font-semibold' to={'/find-partners'}><li>Find Partners</li></NavLink>


        {
            user && <>
                <NavLink className='ml-4 lg:ml-6 font-semibold' to={'/create-partner-profile'}><li>Create Partner Profile</li></NavLink>
                <NavLink className='ml-4 lg:ml-6 font-semibold' to={'/my-connections'}><li>My Connections</li></NavLink>
            </>
        }

    </>
    return (
        <nav className=''>
            <div className="navbar px-4 bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className=" menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}

                        </ul>
                    </div>
                    <Link to={'/'}> <p className=" font-bold normal-case text-xl">Study<span className='text-primary'>Mate</span></p> </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                {/* <div className="navbar-end">

                    <Link to={'/login'}><li className="btn ">Login</li></Link>

                </div> */}
                <div className="navbar-end gap-3">
                    {user ? (
                        <div className="dropdown dropdown-end z-50">
                            <div
                                tabIndex={0}
                                role="button"
                                className=" rounded-full avatar"
                            >
                                <div className="w-10  rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        referrerPolicy="no-referrer"
                                        src={user.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
                            >
                                <div className=" pb-3 border-b border-b-gray-200">
                                    <li className="text-sm font-bold">{user.displayName}</li>
                                    <li className="text-xs">{user.email}</li>
                                </div>
                                <li className="mt-3">
                                    <Link to={"/profile"}>
                                        <FaUser /> Profile
                                    </Link>
                                </li>

                                <div className='flex items-center gap-2 '>
                                  
                                      <h1 className='mt-4'>Theme:</h1>
                                    
                                <input
                                    onChange={(e) => handleTheme(e.target.checked)}
                                    type="checkbox"
                                    defaultChecked={localStorage.getItem('theme') === "dark"}
                                    className="toggle mt-4" />
                                </div>

                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-sm m-4 bg-linear-to-r from-[#960ae7] to-[#6366F1] text-white"
                                    >
                                        <IoLogOut /> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to={'/login'}><li className="btn ">Login</li></Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;