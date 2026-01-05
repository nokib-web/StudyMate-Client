import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaFingerprint, FaChevronLeft, FaShieldAlt } from "react-icons/fa";
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

        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
        if (!passwordPattern.test(password)) {
            setError("Complexity failure: 6+ chars, 1 uppercase, 1 lowercase required.");
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
                                    title: "Onboarding Successful",
                                    text: "Welcome to the StudyMate ecosystem!",
                                    timer: 2000,
                                    showConfirmButton: false,
                                    customClass: { popup: 'rounded-[1.5rem]' }
                                });
                                navigate("/");
                            });
                    })
                    .catch((err) => {
                        console.error(err);
                        setError("Metadata synchronization failed.");
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
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL,
                };
                axiosInstance.post("/users", newUser);
                Swal.fire({
                    icon: "success",
                    title: "SSO Initialization Complete",
                    text: "Account verified via Google.",
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: { popup: 'rounded-[1.5rem]' }
                });
                navigate("/");
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden p-6 py-20">
            {/* Background design accents */}
            <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-primary/2 rounded-full blur-[120px] -ml-40 -mt-40"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/2 rounded-full blur-[100px] -mr-40 -mb-40"></div>

            <div className="w-full max-w-6xl bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-50 flex flex-col lg:flex-row overflow-hidden min-h-[850px] relative z-10">
                {/* Visual Identity Side */}
                <div className="hidden lg:flex w-5/12 bg-[#0F172A] relative flex-col justify-center p-16 text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1500" className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-primary/20"></div>

                    <div className="relative z-10 space-y-10">
                        <Link to="/" className="inline-flex items-center gap-2 text-primary font-black text-xl">
                            <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white"><FaFingerprint size={14} /></span>
                            StudyMate Hub
                        </Link>

                        <div className="space-y-6">
                            <h2 className="text-5xl font-black tracking-tight leading-tight">Join the <br /><span className="text-primary italic">Intelligence</span> <br />Collective.</h2>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed">
                                Experience the next evolution of academic collaboration. Sync with experts, share resources, and accelerate your mastery.
                            </p>
                        </div>

                        <div className="space-y-4 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"><FaShieldAlt /></div>
                                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">End-to-End Encryption</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Registration Execution Side (Form) */}
                <div className="w-full lg:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-[#FAFBFF]">
                    <div className="mb-10 space-y-2">
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Onboarding Request</h1>
                        <p className="text-gray-500 font-medium">Initialize your profile within the StudyMate ecosystem.</p>
                    </div>

                    <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest pl-1">Legal Identity</label>
                            <input
                                name="name"
                                type="text"
                                className="w-full h-14 px-6 rounded-2xl bg-white border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-gray-900"
                                placeholder="Full Name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest pl-1">Avatar Source (URL)</label>
                            <input
                                name="photo"
                                type="text"
                                className="w-full h-14 px-6 rounded-2xl bg-white border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-gray-900"
                                placeholder="https://image-link.com"
                                required
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest pl-1">Synchronization Email</label>
                            <input
                                name="email"
                                type="email"
                                className="w-full h-14 px-6 rounded-2xl bg-white border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-gray-900"
                                placeholder="active-email@domain.com"
                                required
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest pl-1">Security Key (Password)</label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full h-14 px-6 rounded-2xl bg-white border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-gray-900"
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
                            <p className="text-[9px] font-bold text-gray-400 italic px-1">
                                Requirements: 6+ characters, Uppercase & Lowercase inclusion.
                            </p>
                        </div>

                        <div className="md:col-span-2 pt-4">
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-500 text-xs font-bold rounded-xl flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-16 rounded-2xl bg-gray-900 text-white font-black text-lg shadow-xl shadow-black/5 hover:bg-primary hover:shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                {loading ? "Initializing..." : "Register Profile"}
                            </button>
                        </div>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]"><span className="bg-[#FAFBFF] px-4 text-gray-300">Fast-Track SSO</span></div>
                    </div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all font-bold text-gray-700 shadow-sm"
                    >
                        <FcGoogle size={24} />
                        <span>Continue with Google Architecture</span>
                    </button>

                    <div className="mt-12 text-center">
                        <p className="text-gray-400 font-medium">
                            Already part of the network?{' '}
                            <Link to="/login" className="font-black text-primary hover:underline">
                                Execute Login
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

export default Register;
