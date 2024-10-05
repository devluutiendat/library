import { getAuth } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
export const authContent = createContext();
export default function Auth({children}) {
    const [userLogin,setUser] = useState();
    const auth = getAuth();
    useEffect(() =>{
        const authLogin = auth.onIdTokenChanged((user) =>{
            if(user){
                setUser(user)
            }
            setUser({})
        })
            return() =>{
                authLogin();
            }
    },[auth])
  return ( 
    <authContent.Provider value = {{userLogin,setUser}}>
        {children}
    </authContent.Provider>
  )
}
