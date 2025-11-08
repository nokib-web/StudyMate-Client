
import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

import { createUserWithEmailAndPassword,  GoogleAuthProvider,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase/firebase.config';

const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUsers = (email, password) => {
        setLoading(true);

        return createUserWithEmailAndPassword(auth, email, password)

    }


    const userSignIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }



    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }




    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }




    const logout = () => {
        return signOut(auth);
    }




    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        });
        return () => {
            unSubscribe()
        }
    }, [])


    

    const authData = {
        user,
        setUser,
        createUsers,
        signInWithGoogle,
        logout,
        userSignIn,
        loading,
        setLoading,
        updateUser,

    }







    return (
        <AuthContext value={authData} >
            {children}
        </AuthContext>
    );
};

export default AuthProvider;