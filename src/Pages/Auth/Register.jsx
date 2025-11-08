import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { use } from 'react';

import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';



const Register = () => {

    const { createUsers, setUser, updateUser, signInWithGoogle } = use(AuthContext);
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(name, photo, email, password)
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
        if (!passwordPattern.test(password)) {
            setError('password must be 6 character with 1 upper and lowercase')
            return;
        }



        createUsers(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        navigate('/')

                    })
                    .catch((error) => {
                        console.log(error);
                        setUser(user)
                    })
            })
            .catch(error => {
                const errorMessage = error.message;
                alert(errorMessage)
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
                const errorCode = error.code
                setError(errorCode)
            });

    }

    const handleTogglePasswordShow = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <h1 className="text-2xl font-bold">Register Your Account</h1>
                            <form onSubmit={handleRegister} >
                                <fieldset className="fieldset">
                                    {/* name */}
                                    <label className="label">Name</label>
                                    <input
                                        name='name'
                                        type="text"
                                        className="input"
                                        placeholder=" your name"
                                        required
                                    />
                                    {/* Photo */}
                                    <label className="label">Photo Url</label>
                                    <input
                                        name='photo'
                                        type="text"
                                        className="input"
                                        placeholder="Photo Url"
                                        required
                                    />
                                    {/* Email */}
                                    <label className="label">Email</label>
                                    <input
                                        name='email'
                                        type="email"
                                        className="input"
                                        placeholder="Email"
                                        required
                                    />
                                    {/* Password */}
                                    <label className="label">Password</label>
                                    <div className='  relative '>
                                        <input
                                            name='password'

                                            type={showPassword ? 'text' : "password"}

                                            className="input"
                                            placeholder="Password"
                                            required
                                        />

                                        <button
                                            onClick={handleTogglePasswordShow}
                                            className="btn absolute top-2 right-2 btn-xs">

                                            {
                                                showPassword ? <FaEyeSlash /> : <FaEye></FaEye>
                                            }
                                        </button>
                                    </div>
                                    {
                                        error && <p className='text-red-400 '>{error}</p>
                                    }


                                    <button type='submit' className="btn  btn-neutral mt-4">Register</button>
                                    <button onClick={handleGoogleSignIn} type='submit' className="btn  btn-outline mt-4"> <FcGoogle></FcGoogle> Login With Google</button>
                                </fieldset>
                            </form>
                            <p><small>Already Have An Account ? </small><Link className='font-semibold text-green-600 underline  hover:text-blue-800' to='/login'>Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Register;