// import React, { useEffect, useState } from 'react';
// import { Authcontext } from './Authcontext';
// import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase/firebase.config';

// const Authprovider = ({children}) => {
//     const [User , setUser]=useState('');
//     const [Loading , setLoading]=useState(true)

// //create user 
//     const createuser=(email , password)=>{
//     return createUserWithEmailAndPassword(auth, email, password);
//    }
// //google sign in
//    const GoogleLogIn=()=>{
//     const provider = new GoogleAuthProvider();

// useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe(); // cleanup
//   }, []);

//     const userInfo={
//         User,
//         createuser,
//         GoogleLogIn,

//     }
//     return (
//         <Authcontext value={userInfo}>
//             {children}
            
//         </Authcontext>
//     );
// };

// export default Authprovider;

import React, { useEffect, useState } from "react";
import { Authcontext } from "./Authcontext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
// ⚠️ make sure you exported default auth

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user (email/password)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
   // Login user (Email/Password)
  const LogInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign-in
  const GoogleLogIn = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Logout
  const LogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // observe current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    loading,
    createUser,
    GoogleLogIn,
    LogOut,
    LogInUser,
  };

  return (
    <Authcontext.Provider value={userInfo}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authprovider;
