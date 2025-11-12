import React from 'react';
import Nav from '../../Component/Nav';
import HeroSection from '../../Component/HeroSection';

import { Link } from 'react-router';
import HowItWorks from '../../Component/HowItWorks';
import AgroNews from '../../Component/AgroNews';
import FeaturedFarmers from '../../Component/FeaturedFarmers';
import WhyChooseUs from '../../Component/WhyChooseUs';
import useLatestCrops from '../../Hook/useLatestCrops';
import LoadingScreen from '../Loading/LoadingScreen';


const Home = () => {

  const data=useLatestCrops()
  const crops=data.products
  console.log(crops);
 
  
    return (
        <div>
        <HeroSection></HeroSection>
           <section className="my-10 px-6 md:px-16">
        <h2 className="text-2xl font-bold mb-6 text-center">🌾 Latest Crop Posts</h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          {crops.map(crop => (
            <Link  to={`/cropdetails/${crop._id}`} key={crop._id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
              <img src={crop.image} alt={crop.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{crop.name}</h3>
                <p className="text-gray-600">{crop.type}</p>
                <p className="text-green-600 font-bold">{crop.pricePerUnit} tk / {crop.unit}</p>
                <p className="text-sm text-gray-500 mt-1">{crop.location}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link to="/allcrops" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            View All Crops
          </Link>
        </div>
      </section>
      <HowItWorks></HowItWorks>
      <AgroNews></AgroNews>
      <FeaturedFarmers></FeaturedFarmers>
      <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;