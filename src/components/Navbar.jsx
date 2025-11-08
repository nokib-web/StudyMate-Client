
import React from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {

    const links = <>
        <NavLink className='ml-4 lg:ml-6 font-semibold' to={'/'}><li>Home</li></NavLink>
        <NavLink className='ml-4 lg:ml-6 font-semibold' to={'/find-partners'}><li>Find Partners</li></NavLink>


        <NavLink className='ml-4 lg:ml-6 font-semibold' to={'/create-partner-profile'}><li>Create Partner Profile</li></NavLink>
        <NavLink className='ml-4 lg:ml-6 font-semibold' to={'/my-connections'}><li>My Connections</li></NavLink>

    </>
    return (
        <nav>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
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
                <div className="navbar-end">
                    <Link to={'/login'}><li className="btn ">Login</li></Link>
                    
                </div>
            </div>
        </nav>
    );
};

export default Navbar;