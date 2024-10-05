import React, { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';

const AutoSignOut = () => {
    const auth = getAuth();

    const signOutUser = () => {
        signOut(auth).then(() => {
            console.log("User signed out successfully.");
            // Optionally, redirect to the login page
        }).catch((error) => {
            console.error("Sign out error:", error);
        });
    };

    const checkSignOut = () => {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // Set your desired sign-out time (e.g., 11:59 PM)
        const signOutHour = 23; // 11 PM
        const signOutMinute = 59;

        if (currentHour === signOutHour && currentMinute === signOutMinute) {
            signOutUser();
        }
    };

    useEffect(() => {
        // Check every minute
        const intervalId = setInterval(checkSignOut, 60000);
        
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return null; // This component does not render anything
};

export default AutoSignOut;
