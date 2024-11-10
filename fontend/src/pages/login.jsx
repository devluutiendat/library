import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const handleLoginWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const accessToken = result.user.accessToken;
      // Save access token to localStorage for future feature addition
      localStorage.setItem("accessToken", accessToken);

      console.log("User logged in:", result);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Redirect if already logged in
  if (user) {    
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-10 text-center">
      <p className="text-2xl my-4">Welcome to Note App</p>

      <button
        className="border border-b mx-[45%] p-2 rounded-lg bg-black text-white"
        onClick={handleLoginWithGoogle}
        disabled={loading}
        aria-label="Login with Google"
      >
        {loading ? "Logging in..." : "Login with Google"}
      </button>
    </div>
  );
}
