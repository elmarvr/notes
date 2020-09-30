import 'firebase/auth';

import app, { FirebaseError, User } from 'firebase/app';
import { useEffect, useState } from 'react';

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

interface UserState {
  user: User | null;
  loading: boolean;
}

const useAuth = () => {
  const [auth, setAuth] = useState<UserState>({
    user: null,
    loading: false,
  });

  const authRequest = <T>(request: Promise<T>) => {
    setAuth((prev) => ({ ...prev, loading: true }));
    return request.finally(() =>
      setAuth((prev) => ({ ...prev, loading: false }))
    );
  };

  const signIn = async (email: string, password: string) => {
    const { user } = await authRequest(
      app.auth().signInWithEmailAndPassword(email, password)
    );

    setAuth((prev) => ({
      ...prev,
      user,
    }));
  };

  const signUp = async (email: string, password: string) => {
    const { user } = await authRequest(
      app.auth().createUserWithEmailAndPassword(email, password)
    );

    setAuth((prev) => ({
      ...prev,
      user,
    }));
  };

  const signOut = async () => {
    await app.auth().signOut();

    setAuth((prev) => ({
      ...prev,
      user: null,
    }));
  };

  const sendPasswordResetEmail = async (email: string) => {
    await authRequest(app.auth().sendPasswordResetEmail(email));
  };

  const confirmPasswordReset = async (code: string, password: string) => {
    await authRequest(app.auth().confirmPasswordReset(code, password));
  };

  const checkActionCode = async (code: string) => {
    try {
      return !!(await authRequest(app.auth().checkActionCode(code)));
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuth((prev) => ({
          ...prev,
          user,
        }));
      } else {
        setAuth((prev) => ({
          ...prev,
          user: null,
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    auth,
    signIn,
    signUp,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
    checkActionCode,
  };
};

export default useAuth;
