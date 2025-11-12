import React from 'react';

import { Outlet } from 'react-router';
import Footer from '../Pages/Footer/Footer';
import Nav from '../Component/Nav';

const Mainlayout = () => {
    return (
      <div className='flex flex-col min-h-screen'>
          <Nav></Nav>
        <div className=' flex-1'> 
            <Outlet></Outlet>
        </div>
            <Footer></Footer>
      </div>
    );
};

export default Mainlayout;