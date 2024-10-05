import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { authContent } from '../src/auth';

export default function ProtectedRoute({Children}) {
    const navigate = useNavigate();
    const userLogin = useContext(authContent);

    if (!userLogin) {
        navigate('/login')
        return;
    }
  return (
    <Outlet/>
  )
}
