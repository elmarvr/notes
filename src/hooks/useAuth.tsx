import React, { useState, useEffect, useContext, createContext } from "react";
import app, { auth, User } from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAP3k6OeKgV2rn0D3JOv0xoP52DJ3kg078",
  authDomain: "react-firebase-1f01a.firebaseapp.com",
  databaseURL: "https://react-firebase-1f01a.firebaseio.com",
  projectId: "react-firebase-1f01a",
  storageBucket: "react-firebase-1f01a.appspot.com",
  messagingSenderId: "661701516062",
  appId: "1:661701516062:web:cb83b120c7716efb6c070f",
};

app.initializeApp(config);

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    return new Promise<auth.UserCredential>((resolve, reject) => {
      app
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => resolve(user))
        .catch((error) => reject(error));
    });
  };

  const signUp = async (email: string, password: string) => {
    const response = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);

    setUser(response.user);
    return response.user;
  };

  const signout = async () => {
    await app.auth().signOut();

    setUser(null);
  };

  const sendPasswordResetEmail = async (email: string) => {
    await app.auth().sendPasswordResetEmail(email);
    return true;
  };

  const confirmPasswordReset = async (code: string, password: string) => {
    await app.auth().confirmPasswordReset(code, password);
    return true;
  };

  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signIn,
    signUp,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};

export default useAuth;
