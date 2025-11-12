import React, { useState } from "react";
import useProduct from "../../Hook/useProducts";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingScreen from "../Loading/LoadingScreen";

const AllCrops = () => {
  const { products, loading, error } = useProduct();
  const [search, setSearch] = useState("");

  if (loading) return <LoadingScreen />;
  if (error)
    return (
      <p className="text-center text-red-600 mt-10">Error loading crops ❌</p>
    );

  // 🔍 Filter crops by search input
  const filteredCrops = products.filter((crop) =>
    crop.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-16 px-4">
      {/* 🏷️ Page Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center text-green-800 mb-10"
      >
        🌾 All Available Crops
      </motion.h2>

      {/* 🔍 Search Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center mb-10"
      >
        <input
          type="text"
          placeholder="🔍 Search crops by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-green-400 rounded-full px-6 py-3 w-full md:w-1/2 shadow-sm bg-white/90 focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-800 placeholder-gray-400"
        />
      </motion.div>

      {/* 🌱 Crop Cards Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
      >
        {filteredCrops.length > 0 ? (
          filteredCrops.map((crop, index) => (
            <motion.div
              key={crop._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { type: "spring", stiffness: 200 },
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-100"
            >
              <div className="relative overflow-hidden group">
                <img
                  src={
                    crop.image ||
                    "https://source.unsplash.com/400x300/?crop,agriculture"
                  }
                  alt={crop.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-5 text-center">
                <h3 className="text-xl font-bold text-green-700">
                  {crop.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{crop.type}</p>
                <p className="text-green-900 font-semibold mt-3 text-lg">
                  💰 {crop.pricePerUnit} tk
                </p>

                {/* View Details Button */}
                <Link
                  to={`/cropdetails/${crop._id}`}
                  className="inline-block mt-4 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full font-medium shadow-md hover:shadow-lg hover:from-green-500 hover:to-emerald-400 transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">
            No crops found 🌱
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default AllCrops;
