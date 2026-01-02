import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const Register = () => {
    const { createUsers, setUser, updateUser, signInWithGoogle } = useAuth();
    const axiosInstance = useAxios();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        // Validation
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
        if (!passwordPattern.test(password)) {
            setError("Password must be 6+ chars, 1 uppercase, 1 lowercase.");
            setLoading(false);
            return;
        }

        createUsers(email, password)
            .then((result) => {
                const user = result.user;
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        const userData = { name, email, image: photo };

                        axiosInstance.post("/users", userData)
                            .then(() => {
                                Swal.fire({
                                    icon: "success",
                                    title: "Account Created!",
                                    text: "Welcome to StudyMate!",
                                    timer: 2000,
                                    showConfirmButton: false,
                                });
                                navigate("/");
                            });
                    })
                    .catch((err) => {
                        console.error(err);
                        setError("Profile update failed.");
                        setLoading(false);
                    });
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                // ... same logic as Login
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL,
                };
                axiosInstance.post("/users", newUser);
                Swal.fire({
                    icon: "success",
                    title: "Welcome!",
                    text: "Signed up with Google.",
                    timer: 2000,
                    showConfirmButton: false,
                });
                navigate("/");
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-10 px-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex max-w-5xl w-full">
                {/* Left Side - Visual */}
                <div className="hidden md:flex md:w-1/2 bg-secondary relative flex-col justify-center items-center text-white p-12 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
                    <div className="relative z-10 text-center">
                        <h2 className="text-4xl font-heading font-bold mb-4">Join Our Community</h2>
                        <p className="text-yellow-50 text-lg mb-8">
                            Discover a world of collaborative learning. Create your account and find your perfect study partner today.
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
                        <p className="text-gray-500 mt-2">Get started with your free account</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="label font-semibold">Full Name</label>
                            <input
                                name="name"
                                type="text"
                                className="input input-bordered w-full rounded-xl focus:input-secondary"
                                placeholder="Your full name"
                                required
                            />
                        </div>

                        <div>
                            <label className="label font-semibold">Photo URL</label>
                            <input
                                name="photo"
                                type="text"
                                className="input input-bordered w-full rounded-xl focus:input-secondary"
                                placeholder="Link to your profile photo"
                                required
                            />
                        </div>

                        <div>
                            <label className="label font-semibold">Email</label>
                            <input
                                name="email"
                                type="email"
                                className="input input-bordered w-full rounded-xl focus:input-secondary"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="label font-semibold">Password</label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered w-full rounded-xl focus:input-secondary pr-10"
                                    placeholder="Create a strong password"
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
                            <label className="label-text-alt text-xs text-gray-500 mt-1 ml-1">
                                Must contain Uppercase, Lowercase, and 6+ characters.
                            </label>
                        </div>

                        {error && <div className="alert alert-error text-sm py-2 rounded-lg">{error}</div>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-secondary w-full rounded-xl text-lg mt-4 text-white"
                        >
                            {loading ? <span className="loading loading-spinner"></span> : 'Sign Up'}
                        </button>
                    </form>

                    <div className="divider text-gray-400">OR</div>

                    <button
                        onClick={handleGoogleSignIn}
                        type="button"
                        className="btn btn-outline w-full rounded-xl hover:bg-base-100 items-center justify-center gap-2"
                    >
                        <FcGoogle className="text-xl" /> Sign up with Google
                    </button>

                    <p className="text-center mt-8 text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-secondary hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
