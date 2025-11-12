import React from 'react';
import Slider from 'react-slick';
import slider1 from '../assets/slider1.jpg'
import slider2 from '../assets/slider2.jpg'
import slider3 from '../assets/slider3.jpg'

const HeroSection = () => {
 const slides = [
    {
      image: slider2,
      title: "Fresh Vegetables from Local Farmers",
      subtitle: "Get the best produce directly from the source",
    },
    {
      image: slider3,
      title: "Connect with Farmers Easily",
      subtitle: "Buy or show interest in crops in just a few clicks",
    },
    {
      image: slider1,
      title: "Organic and Healthy Crops",
      subtitle: "Support sustainable farming practices",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  return (
    <div className="hero-section">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-4">
              <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
              <p className="text-lg">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;