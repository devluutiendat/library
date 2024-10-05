import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import '../firebase/config.jsx'
import Auth from './auth.jsx'
import {RouterProvider} from 'react-router-dom'
import router from '../router/router.jsx'
import AutoSignOut from '../firebase/signOut.jsx'
createRoot(document.getElementById('root')).render(
  <Auth>
    <StrictMode>
      <AutoSignOut/>
      <RouterProvider router={router}/>
    </StrictMode>,
  </Auth>
)