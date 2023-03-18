import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { toastErrorNotify, toastSuccessNotify, toastWarnNotify } from '../helpers/TosatifyNotify'


export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')) || false)
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
                sessionStorage.setItem("user", JSON.stringify({ email, displayName, photoURL }))
            } else {
                setCurrentUser(false)
                sessionStorage.clear()
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

    const forgotPassword = (email) => {
        //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
        sendPasswordResetEmail(auth, email)
          .then(() => {
            // Password reset email sent!
            toastWarnNotify("Please check your mail box!");
            // alert("Please check your mail box!");
          })
          .catch((err) => {
            toastErrorNotify(err.message);
            // alert(err.message);
            // ..
          });
      };

    const values = { createUser, signIn, logOut, currentUser, signUpProvider,forgotPassword }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;