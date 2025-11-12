import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Pages/Home/Home'
import { RouterProvider } from "react-router/dom";
import router from './Router/Router';
import Authprovider from './context/Authprovider';
import { Toaster } from 'react-hot-toast';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
<Authprovider>
      <RouterProvider router={router} />
       <Toaster position="top-center" reverseOrder={false} />
</Authprovider>
  </StrictMode>,
)


