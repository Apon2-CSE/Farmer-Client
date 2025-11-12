import React from "react";
import { FaSeedling, FaSearch, FaHandshake, FaTruck } from "react-icons/fa";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSeedling className="text-green-600 text-4xl mb-3" />,
      title: "Add Your Crop",
      description:
        "Farmers can easily list their crops with details like type, price, and quantity.",
    },
    {
      icon: <FaSearch className="text-green-600 text-4xl mb-3" />,
      title: "Browse Crops",
      description:
        "Buyers explore the available crops and find what they need directly from farmers.",
    },
    {
      icon: <FaHandshake className="text-green-600 text-4xl mb-3" />,
      title: "Show Interest",
      description:
        "Buyers can express interest and connect with the crop owners instantly.",
    },
    {
      icon: <FaTruck className="text-green-600 text-4xl mb-3" />,
      title: "Connect & Trade",
      description:
        "Finalize the deal and arrange delivery for fresh produce right from the farm.",
    },
  ];

  return (
    <section className="py-16 bg-green-50">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
        🌱 How It Works
      </h2>

      <div className="grid gap-8 md:grid-cols-4 px-6 md:px-20 text-center">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 15px 25px rgba(0,0,0,0.2)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            {step.icon}
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
