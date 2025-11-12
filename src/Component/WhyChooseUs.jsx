import React from "react";
import { motion } from "framer-motion";
import { Leaf, Handshake, ShieldCheck } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Leaf className="w-10 h-10 text-green-600 mb-3" />,
      title: "Fresh & Organic",
      desc: "We ensure every crop is grown naturally, without harmful chemicals.",
    },
    {
      icon: <Handshake className="w-10 h-10 text-green-600 mb-3" />,
      title: "Farmer to Buyer Directly",
      desc: "No middlemen — buyers connect directly with trusted local farmers.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-600 mb-3" />,
      title: "Trusted Platform",
      desc: "Verified users, secure transactions, and a strong farmer community.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-green-700 mb-6"
        >
          Why Choose <span className="text-green-500">KrishiLink</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Empowering farmers and buyers through a transparent and smart
          agricultural network.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 15px 25px rgba(0,0,0,0.2)",
              }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="p-8 bg-green-50 rounded-2xl shadow-md cursor-pointer"
            >
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
