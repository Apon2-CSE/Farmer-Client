import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const socialIcons = [
    { icon: <FaFacebookF />, link: "#" },
    { icon: <FaTwitter />, link: "#" },
    { icon: <FaInstagram />, link: "#" },
    { icon: <FaLinkedinIn />, link: "#" },
  ];

  return (
    <footer className="bg-green-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Krishi🌱Link</h2>
          <p className="text-gray-200">
            Connecting farmers, traders, and consumers in one platform. Share
            your crops, collaborate, and grow together!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {["Home", "All Crops", "Add Crop", "My Interests", "Profile"].map(
              (text, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${text.toLowerCase().replace(" ", "")}`}
                    className="hover:text-gray-300 transition-colors duration-300"
                  >
                    {text}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {socialIcons.map((s, idx) => (
              <motion.a
                key={idx}
                href={s.link}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="text-white transition-colors duration-300 hover:text-gray-300"
              >
                {React.cloneElement(s.icon, { size: 20 })}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-800 mt-6 py-4 text-center text-gray-300 text-sm">
        &copy; {new Date().getFullYear()} KrishiLink. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
