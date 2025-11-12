import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Krishi🌱Link</h2>
          <p className="text-gray-200">
            Connecting farmers, traders, and consumers in one platform.  
            Share your crops, collaborate, and grow together!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-gray-300 transition">Home</Link>
            </li>
            <li>
              <Link to="/allcrops" className="hover:text-gray-300 transition">All Crops</Link>
            </li>
            <li>
              <Link to="/addcrop" className="hover:text-gray-300 transition">Add Crop</Link>
            </li>
            <li>
              <Link to="/myinterests" className="hover:text-gray-300 transition">My Interests</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-gray-300 transition">Profile</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <FaLinkedinIn size={20} />
            </a>
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
