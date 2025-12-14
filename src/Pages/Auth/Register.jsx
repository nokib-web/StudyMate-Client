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
    const navigate = useNavigate();

    //  Handle manual registration
    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        // Validate password
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
        if (!passwordPattern.test(password)) {
            setError("Password must be 6+ chars with at least one uppercase & lowercase letter.");
            Swal.fire({
                icon: "error",
                title: "Weak Password",
                text: "Password must be at least 6 characters long and include both upper and lowercase letters.",
            });
            return;
        }

        //  Firebase Registration
        createUsers(email, password)
            .then((result) => {
                const user = result.user;

                // Update user info in Firebase
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });

                        // Save user in MongoDB
                        const userData = { name, email, image: photo };
                        axiosInstance
                            .post("/users", userData)
                            .then((res) => {
                                console.log("User saved to database", res.data);
                            })
                            .catch((err) => {
                                console.error("Error saving user to database:", err);
                            });

                        // SweetAlert success
                        Swal.fire({
                            icon: "success",
                            title: "Registration Successful !",
                            text: "Welcome to StudyMate!",
                            showConfirmButton: false,
                            timer: 2000,
                        });

                        navigate("/");
                    })
                    .catch((error) => {
                        console.log(error);
                        setUser(user);
                        Swal.fire({
                            icon: "error",
                            title: "Update Failed",
                            text: "Profile update failed. Please try again later.",
                        });
                    });
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: errorMessage,
                });
            });
    };

    //  Handle Google Sign-In
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL,
                };

                // Save user to database
                axiosInstance
                    .post("/users", newUser)
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Welcome Back!",
                            text: "Logged in successfully with Google.",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    })
                    .catch((err) => {
                        console.error("Error saving user to database:", err);
                    });

                setUser(user);
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                setError(errorCode);
                Swal.fire({
                    icon: "error",
                    title: "Google Sign-in Failed",
                    text: errorCode,
                });
            });
    };

    const handleTogglePasswordShow = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-2xl my-text-primary font-bold text-center mb-4">
                            Register Your Account
                        </h1>

                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset space-y-2">
                                {/* Name */}
                                <label className="label">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Your name"
                                    required
                                />



                                {/* Photo URL */}
                                <label className="label">Photo URL</label>
                                <input
                                    name="photo"
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Profile photo link"
                                    required
                                />

                                {/* Email */}
                                <label className="label">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    className="input input-bordered w-full"
                                    placeholder="Your email"
                                    required
                                />

                                {/* Password */}
                                <label className="label">Password</label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        className="input input-bordered w-full pr-10"
                                        placeholder="Password"
                                        required
                                    />
                                    <button
                                        onClick={handleTogglePasswordShow}
                                        type="button"
                                        className="absolute top-2.5 right-3 text-gray-500"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>

                                {error && <p className="text-red-500 text-sm">{error}</p>}

                                {/* Buttons */}
                                <button type="submit" className="btn my-btn-primary mt-4 w-full">
                                    Register
                                </button>
                                <button
                                    onClick={handleGoogleSignIn}
                                    type="button"
                                    className="btn my-btn-outline mt-3 w-full"
                                >
                                    <FcGoogle className="text-xl mr-2" /> Register with Google
                                </button>
                            </fieldset>
                        </form>

                        <p className="text-center mt-4 text-sm">
                            Already have an account?{" "}
                            <Link
                                className="font-semibold text-green-600 underline hover:text-blue-800"
                                to="/login"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
