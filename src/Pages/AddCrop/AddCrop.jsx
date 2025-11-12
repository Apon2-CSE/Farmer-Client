import React, { useState, useContext } from "react";
import axios from "axios";
import { Authcontext } from "../../context/Authcontext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AddCrop = () => {
  const { user } = useContext(Authcontext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    pricePerUnit: "",
    unit: "",
    quantity: "",
    description: "",
    location: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.type || !formData.pricePerUnit) {
      toast.error("Please fill all required fields!");
      return;
    }

    const cropData = {
      ...formData,
      pricePerUnit: Number(formData.pricePerUnit),
      quantity: Number(formData.quantity),
      owner: {
        ownerEmail: user.email,
        ownerName: user.displayName || "Unknown",
      },
    };

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/crops", cropData);
      toast.success("🌿 Crop added successfully!");
      navigate("/myposts");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add crop. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-700 flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute inset-0">
        <div className="absolute w-80 h-80 bg-lime-400/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 sm:p-10 text-white"
      >
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-lime-300 mb-6"
        >
          Add New Crop 🌱
        </motion.h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Crop Name */}
          <div className="col-span-1">
            <label className="block text-sm mb-1 text-white/80">
              Crop Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter crop name"
              className="w-full p-3 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-lime-400"
              required
            />
          </div>

          {/* Type */}
          <div className="col-span-1">
            <label className="block text-sm mb-1 text-white/80">
              Crop Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-white/30 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
              required
            >
              <option value="">Select Type</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Grain">Grain</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Price Per Unit */}
          <div className="col-span-1">
            <label className="block text-sm mb-1 text-white/80">
              Price per Unit
            </label>
            <input
              type="number"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleChange}
              placeholder="e.g., 50"
              className="w-full p-3 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-lime-400"
              required
            />
          </div>

          {/* Unit */}
          <div className="col-span-1">
            <label className="block text-sm mb-1 text-white/80">Unit</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="kg, ton, bag..."
              className="w-full p-3 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-lime-400"
              required
            />
          </div>

          {/* Quantity */}
          <div className="col-span-1">
            <label className="block text-sm mb-1 text-white/80">
              Quantity (optional)
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g., 100"
              className="w-full p-3 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>

          {/* Location */}
          <div className="col-span-1">
            <label className="block text-sm mb-1 text-white/80">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Dhaka, Bangladesh"
              className="w-full p-3 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>

          {/* Image URL */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm mb-1 text-white/80">
              Image URL (optional)
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full p-3 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>

          {/* Description */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm mb-1 text-white/80">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description..."
              className="w-full p-3 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-lime-400"
              rows="3"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 font-semibold bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-400 hover:to-green-500 text-black rounded-lg shadow-lg transition-all duration-300"
            >
              {loading ? "Adding Crop..." : "Add Crop"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddCrop;
