import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash, FaUserShield } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Login = () => {
    const { userSignIn, signInWithGoogle } = useAuth();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form state for controlled inputs (needed for Demo button)
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
                title: 'Welcome back!',
                text: 'Logged in successfully.',
                timer: 1500,
                showConfirmButton: false
            });
            useNavigateCallback(from, { replace: true });
        } catch (err) {
            console.error(err);
            setError('Invalid email or password. Please try again.');
            Swal.fire('Login Failed', 'Invalid email or password.', 'error');
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
                title: 'Welcome!',
                text: 'Logged in with Google.',
                timer: 1500,
                showConfirmButton: false
            });
            useNavigateCallback(from, { replace: true });
        } catch (err) {
            console.error('Google sign-in error:', err);
            setError('Failed to login with Google.');
        }
    };

    const handleDemoAdmin = () => {
        setFormData({
            email: 'admin@studymate.com', // Assuming this is a valid demo admin or just placeholder
            password: 'Password123!'
        });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-10 px-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex max-w-5xl w-full">
                {/* Left Side - Visual */}
                <div className="hidden md:flex md:w-1/2 bg-primary relative flex-col justify-center items-center text-white p-12 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
                    <div className="relative z-10 text-center">
                        <h2 className="text-4xl font-heading font-bold mb-4">Welcome Back!</h2>
                        <p className="text-blue-100 text-lg mb-8">
                            Ready to continue your learning journey? Connect with your partners and smash your goals today.
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Login to StudyMate</h1>
                        <p className="text-gray-500 mt-2">Please enter your details to sign in</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="label font-semibold">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="input input-bordered w-full rounded-xl focus:input-primary"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="label font-semibold">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full rounded-xl focus:input-primary pr-10"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <div className="text-right mt-1">
                                <a href="#" className="link link-hover text-sm text-primary">Forgot password?</a>
                            </div>
                        </div>

                        {error && <div className="alert alert-error text-sm py-2 rounded-lg">{error}</div>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full rounded-xl text-lg mt-2"
                        >
                            {loading ? <span className="loading loading-spinner"></span> : 'Sign In'}
                        </button>
                    </form>

                    <div className="divider text-gray-400">OR</div>

                    <div className="space-y-3">
                        <button
                            onClick={handleGoogleSignIn}
                            type="button"
                            className="btn btn-outline w-full rounded-xl hover:bg-base-100 items-center justify-center gap-2"
                        >
                            <FcGoogle className="text-xl" /> Sign in with Google
                        </button>

                        <button
                            onClick={handleDemoAdmin}
                            type="button"
                            className="btn btn-accent btn-outline w-full rounded-xl items-center justify-center gap-2 border-dashed"
                        >
                            <FaUserShield className="text-lg" /> Fill Demo Admin Credentials
                        </button>
                    </div>

                    <p className="text-center mt-8 text-gray-600">
                        Don’t have an account?{' '}
                        <Link to="/register" className="font-bold text-primary hover:underline">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
