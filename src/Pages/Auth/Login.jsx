import React, { useState } from 'react';

import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { Link, useLocation, useNavigate } from 'react-router';

const Login = () => {
    const { userSignIn, signInWithGoogle } = useAuth();
    const [error, setError] = useState('');
    const axiosInstance = useAxios();

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const result = await userSignIn(email, password);
            console.log('Logged in user:', result.user);
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            setError('Invalid email or password. Please try again.');
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

            // Save user to DB
            await axiosInstance.post('/users', newUser);
            console.log('User saved:', newUser);

            navigate(from, { replace: true });
        } catch (err) {
            console.error('Google sign-in error:', err);
            setError('Failed to login with Google.');
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-2xl font-bold mb-2">Login to Your Account</h1>

                        <form onSubmit={handleLogin}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input"
                                    placeholder="Email"
                                    required
                                />

                                <label className="label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="input"
                                    placeholder="Password"
                                    required
                                />

                                <div className="text-right mt-1">
                                    <a className="link link-hover">Forgot password?</a>
                                </div>

                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                                <button className="btn btn-neutral mt-4 w-full">Login</button>
                            </fieldset>
                        </form>

                        <button
                            onClick={handleGoogleSignIn}
                            type="button"
                            className="btn btn-outline mt-3 flex items-center gap-2 justify-center"
                        >
                            <FcGoogle className="text-xl" /> Login with Google
                        </button>

                        <p className="mt-3 text-center">
                            <small>
                                Don’t have an account?{' '}
                                <Link
                                    to="/register"
                                    className="font-semibold text-blue-600 hover:underline"
                                >
                                    Register
                                </Link>
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
