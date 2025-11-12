import { createBrowserRouter } from 'react-router-dom';
import Mainlayout from '../Layout/Mainlayout';
import Home from '../Pages/Home/Home';
import AddCrop from '../Pages/AddCrop/AddCrop';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import CropDetails from '../Pages/CropDetails/CropDetails';
import MyInterests from '../Pages/MyInterests/MyInterests';
import Myposts from '../Pages/MyPosts/Myposts';
import AllCrops from '../Pages/AllCrops/AllCrops';
import UpdateProfile from '../Pages/Profile/UpdateProfile';
import NotFound from '../Pages/ErrorPage/NotFound';
import PrivateRoute from './PrivateRoute';
import ForgetPassword from '../Pages/Auth/ForgetPassword';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout />,
    errorElement: <NotFound></NotFound>,
   
    children: [
      { index: true, element: <Home /> },
      { path: 'addcrop', element: <PrivateRoute><AddCrop /> </PrivateRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'cropdetails/:id', element: <PrivateRoute> <CropDetails /> </PrivateRoute>},
      { path: 'myinterests', element: <PrivateRoute> <MyInterests /> </PrivateRoute> },
      { path: 'myposts', element: <PrivateRoute><Myposts /> </PrivateRoute>},
      { path: 'allcrops', element: <AllCrops /> },
      { path: 'updateprofile', element:  <PrivateRoute><UpdateProfile/></PrivateRoute>},
     { path: 'ForgetPassword', element: <ForgetPassword></ForgetPassword>},
    
    
       
      
      
    ],
  },
]);

export default router;


