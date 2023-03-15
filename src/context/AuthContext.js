import { async } from '@firebase/util'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const navigate = useNavigate()
    const createUser = async(email, password)=>{
        try {
            let userCredential = await createUserWithEmailAndPassword(auth, email, password)
            navigate('/')
            console.log(userCredential);
        } catch (error) {
            console.log(error);
        }            
    }
    const signIn = async(email, password)=>{
        try {
            const signInUser = await signInWithEmailAndPassword(auth, email, password);
            navigate('/')
        
        } catch (error) {
            console.log(error);
        }
    }
    const logOut = ()=>{
        signOut(auth)
        navigate("/login")
        try {
            
        } catch (error) {
            console.log(error);
        }
    }


    const values = {createUser,signIn,logOut ,currentUser: {displayName: "Erhan ATALAN"}}
    return (
    <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;