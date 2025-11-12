import React from "react";
import { motion } from "framer-motion";

const FeaturedFarmers = () => {
  const farmers = [
    {
      name: "Rahim Uddin",
      location: "Rajshahi, Bangladesh",
      image: "https://source.unsplash.com/400x400/?farmer,portrait",
      crops: "Tomato, Potato, Mango",
    },
    {
      name: "Fatema Begum",
      location: "Cumilla, Bangladesh",
      image: "https://source.unsplash.com/400x400/?woman,farmer",
      crops: "Brinjal, Cucumber, Chili",
    },
    {
      name: "Shahidul Islam",
      location: "Sylhet, Bangladesh",
      image: "https://source.unsplash.com/400x400/?agriculture,person",
      crops: "Paddy, Wheat, Corn",
    },
  ];

  return (
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-green-700 mb-6"
        >
          Meet Our Featured Farmers
        </motion.h2>
        <p className="text-gray-600 mb-10">
          Real heroes behind sustainable agriculture and fresh produce.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {farmers.map((farmer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <img
                src={farmer.image}
                alt={farmer.name}
                className="w-full h-60 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-green-700">
                  {farmer.name}
                </h3>
                <p className="text-sm text-gray-500">{farmer.location}</p>
                <p className="text-gray-600 mt-2 text-sm">
                  <strong>Crops:</strong> {farmer.crops}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFarmers;
