import React, {  useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../context/AuthContext';
import useAuth from '../../hooks/useAuth';


const Login = () => {

    // const { userSignIn, signInWithGoogle } = use(AuthContext);
    const { userSignIn, signInWithGoogle } = useAuth();
    const [error, setError] = useState('')
    const emailRef = useRef();
    const [email, setEmail] = useState("");

    const location = useLocation();
    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        userSignIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate(`${location.state ? location.state : '/'}`)

            })
            .catch(error => {
                const errorCode = error.code;
                setError(errorCode)
            });

    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate(`${location.state ? location.state : '/'}`)

            })
            .catch(error => {
                const errorCode = error.code;
                setError(errorCode)
            });



    }

 






    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-2xl font-bold">Login Your Account</h1>
                        <form onSubmit={handleLogin}>
                            <fieldset className="fieldset">

                                {/* email */}

                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    className="input"
                                    placeholder="Email"
                                    name='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    ref={emailRef}
                                    required
                                />

                                {/* password */}

                                <label className="label">Password</label>
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="Password"
                                    name='password'
                                    required
                                />

                                <div><a className="link link-hover">Forgot password?</a></div>

                                {
                                    error && <p className='text-red-400 '>{error}</p>
                                }

                                <button className="btn btn-neutral mt-4">Login</button>

                            </fieldset>
                        </form>
                        <button onClick={handleGoogleSignIn} type='submit' className="btn "> <FcGoogle></FcGoogle> Login With Google</button>
                        <p><small>Do not Have An Account ? </small><Link className='font-semibold hover:text-blue-700 text-red-400 underline' to='/register'>Register</Link></p>
                    </div>
                </div>
            </div>

        </div>
    );

};

export default Login;