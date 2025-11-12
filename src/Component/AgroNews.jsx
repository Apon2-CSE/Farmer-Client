import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AgroNews = () => {
  const news = [
    {
      id: 1,
      image: "https://source.unsplash.com/400x250/?farm,news",
      title: "Smart Farming: The Future of Agriculture in Bangladesh",
      date: "Nov 10, 2025",
      desc: "Technology is transforming how farmers grow, monitor, and sell their crops efficiently.",
    },
    {
      id: 2,
      image: "https://source.unsplash.com/400x250/?tractor,field",
      title: "Organic Farming Gains Popularity Among Young Farmers",
      date: "Nov 5, 2025",
      desc: "More youth are now adopting sustainable organic farming methods to ensure soil health.",
    },
    {
      id: 3,
      image: "https://source.unsplash.com/400x250/?agriculture,market",
      title: "Government Launches New Crop Insurance Policy",
      date: "Oct 29, 2025",
      desc: "The new policy aims to protect farmers against losses caused by natural disasters.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-green-700"
        >
          Agro News & Blogs
        </motion.h2>
        <p className="text-gray-600 mb-10">
          Stay updated with the latest agricultural trends, technologies, and success stories.
        </p>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 text-left">
                <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                <h3 className="text-lg font-semibold mb-2 hover:text-green-600 cursor-pointer">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                <Link
                  to="/blogs"
                  className="text-green-600 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10">
          <Link
            to="/blogs"
            className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AgroNews;
