import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { toastErrorNotify, toastSuccessNotify } from '../helpers/TosatifyNotify'


export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        userObserver()
    }, [])

    const createUser = async (email, password, displayName) => {
        try {
            let userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {
                displayName: displayName,
            })
            navigate('/')
            toastSuccessNotify('Registered successfully!')
        } catch (error) {
            toastErrorNotify(error.message)
        }
    }
    const signIn = async (email, password) => {
        try {
            const signInUser = await signInWithEmailAndPassword(auth, email, password);
            navigate('/')
            toastSuccessNotify("Logged in successfully!")
        } catch (error) {
            toastErrorNotify(error.message)
        }
    }
    const logOut = () => {
        signOut(auth)
    }
    const userObserver = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { email, displayName, photoURL } = user
                setCurrentUser({ email, displayName, photoURL })
            } else {
                setCurrentUser(false)
            }
        })
    }

    const signUpProvider = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
                toastSuccessNotify("Logged in Successfully!")
                navigate("/")
            }).catch((error) => {
                console.log(error);
            });
    }

    const values = { createUser, signIn, logOut, currentUser, signUpProvider }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;