import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash, FaUserShield, FaChevronLeft, FaFingerprint } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Login = () => {
    const { userSignIn, signInWithGoogle } = useAuth();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const axiosInstance = useAxios();
    const location = useLocation();
    const useNavigateCallback = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await userSignIn(formData.email, formData.password);
            Swal.fire({
                icon: 'success',
                title: 'Authentication Successful',
                text: 'Redirecting to your study space...',
                timer: 1500,
                showConfirmButton: false,
                background: '#fff',
                customClass: { popup: 'rounded-[1.5rem]' }
            });
            useNavigateCallback(from, { replace: true });
        } catch (err) {
            console.error(err);
            setError('Invalid credentials provided.');
            Swal.fire({
                title: 'Verification Failed',
                text: 'Please check your email and password.',
                icon: 'error',
                confirmButtonColor: '#3B82F6',
                customClass: { popup: 'rounded-[1.5rem]' }
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;
            const newUser = {
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
            };
            await axiosInstance.post('/users', newUser);

            Swal.fire({
                icon: 'success',
                title: 'SSO Successful',
                text: 'Logged in via Google.',
                timer: 1500,
                showConfirmButton: false,
                customClass: { popup: 'rounded-[1.5rem]' }
            });
            useNavigateCallback(from, { replace: true });
        } catch (err) {
            console.error('Google sign-in error:', err);
            setError('OAuth verification failed.');
        }
    };

    const handleDemoAdmin = () => {
        setFormData({
            email: 'admin@studymate.com',
            password: 'Password123!'
        });
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden p-6">
            {/* Architectural Background Shapes */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/2 rounded-full blur-[150px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/2 rounded-full blur-[120px] -ml-40 -mb-40"></div>

            <div className="w-full max-w-6xl bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-50 flex overflow-hidden min-h-[700px] relative z-10">
                {/* Left Side: Modern Visual Brand */}
                <div className="hidden lg:flex w-1/2 bg-[#0F172A] relative flex-col justify-center p-16 text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1500" className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-primary/20"></div>

                    <div className="relative z-10 space-y-8">
                        <Link to="/" className="inline-flex items-center gap-2 text-primary font-black text-xl mb-12">
                            <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white"><FaFingerprint size={14} /></span>
                            StudyMate Hub
                        </Link>

                        <div className="space-y-4">
                            <h2 className="text-5xl font-black tracking-tight leading-tight">Master your <br />subjects with <br /><span className="text-primary italic text-6xl">Intelligence.</span></h2>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-sm">
                                Unified ecosystem for academic collaboration and expert partner matching.
                            </p>
                        </div>

                        <div className="pt-12 grid grid-cols-2 gap-6">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                                <h4 className="text-2xl font-black text-white">50k+</h4>
                                <p className="text-[10px] font-black uppercase text-primary tracking-widest">Active Learners</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                                <h4 className="text-2xl font-black text-white">4.9/5</h4>
                                <p className="text-[10px] font-black uppercase text-primary tracking-widest">Global Rating</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Execution Logic (Form) */}
                <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-[#FAFBFF]">
                    <div className="mb-10 space-y-2">
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Login</h1>
                        <p className="text-gray-500 font-medium">Please enter your authorized credentials to continue.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest pl-1">Authorized Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full h-14 px-6 rounded-2xl bg-white border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-gray-900"
                                placeholder="name@domain.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Access Key</label>
                                <a href="#" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Forgot?</a>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full h-14 px-6 rounded-2xl bg-white border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-gray-900 pr-14"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-500 text-xs font-bold rounded-xl flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                {error}
                            </div>
                        )}

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-16 rounded-2xl bg-gray-900 text-white font-black text-lg shadow-xl shadow-black/5 hover:bg-primary hover:shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                {loading ? "Verifying..." : "Initialize Access"}
                            </button>
                        </div>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]"><span className="bg-[#FAFBFF] px-4 text-gray-300">Third-Party SSO</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={handleGoogleSignIn}
                            className="h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all font-bold text-gray-700 shadow-sm"
                        >
                            <FcGoogle size={20} />
                            <span>Google</span>
                        </button>
                        <button
                            onClick={handleDemoAdmin}
                            className="h-14 rounded-2xl bg-white border border-gray-100 border-dashed flex items-center justify-center gap-3 hover:bg-primary/5 hover:border-primary/20 transition-all font-bold text-primary group"
                        >
                            <FaUserShield size={18} className="opacity-50 group-hover:opacity-100" />
                            <span>Demo Admin</span>
                        </button>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-400 font-medium">
                            New to the collective?{' '}
                            <Link to="/register" className="font-black text-primary hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <Link to="/" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 hover:text-primary transition-colors">
                <FaChevronLeft className="text-[8px]" />
                Back to Command Terminal
            </Link>
        </div>
    );
};

export default Login;
