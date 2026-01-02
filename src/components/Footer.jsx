import React from 'react';
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhoneAlt,  } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router';
import logo from '../assets/studyMate.png'

const Footer = () => {
    return (
         <div className='bg-base-300'>
            <footer className="footer sm:footer-horizontal max-w-7xl mx-auto bg-base-300 text-base-content p-10">
                <nav>
                  <Link to={'/'}> <p className=" font-bold flex items-center normal-case text-xl">
                                          <img src={logo} alt="StudyMate Logo" className="inline-block rounded-full my-text-primary w-8 h-8 mr-2" />
                                          <span className='my-text-primary'>Study</span><span className='my-text-secondary'>Mate</span></p> </Link>
                    <p>
                        Your trusted companion in  academic <br /> excellence.
                        Empowering students <br /> worldwide to achieve their study goals.


                    </p>

                </nav>
                <nav>
                    <h6 className="footer-title">Quick Links</h6>
                    <Link to="/" className="link link-hover">Home</Link>
                    <Link to="/my-profile" className="link link-hover">Dashboard</Link>
                    <Link to="/login" className="link link-hover">Login</Link>
                    <Link to="/register" className="link link-hover">Register</Link>
                </nav>
                
                <nav>
                    <div>
                        <h6 className="footer-title">Contact & Support</h6>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-orange-400" />
                                D-12,Zakir Hossain Road, <br /> Mohammadpur, Dhaka-1207
                            </li>
                            <li className="flex items-center gap-2">
                                <FaPhoneAlt className="text-orange-400" />
                                +880 1580334337
                            </li>
                            <li className="flex items-center gap-2">
                                <FaEnvelope className="text-orange-400" />
                                support@studymate.com
                            </li>
                        </ul>
                    </div>



                </nav>
                <nav>
                    <div >
                        <h6 className="footer-title">Social Links</h6>
                        <p className="text-sm mb-4">Stay connected with our <br /> StudyMate community </p>
                        <div className="flex items-center gap-4 text-2xl">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">
                                <FaFacebook />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">
                                <FaInstagram />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">
                                <FaXTwitter />
                            </a>
                        </div>
                    </div>
                </nav>
            </footer>

            <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by StudyMate.</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;