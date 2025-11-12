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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
      toast.success("🌾 Crop added successfully!");
      navigate("/myposts");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add crop. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-emerald-800 to-lime-700 flex items-center justify-center px-3 py-10 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 bg-lime-400/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
      </div>

      {/* Animated container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-2xl p-6 sm:p-8 text-white"
      >
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl font-extrabold text-center text-lime-300 mb-6 tracking-wide drop-shadow-lg"
        >
          🌱 Add a New Crop
        </motion.h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Input Fields */}
          {[
            {
              label: "Crop Name",
              name: "name",
              type: "text",
              placeholder: "Enter crop name",
            },
            {
              label: "Crop Type",
              name: "type",
              type: "select",
              options: ["Vegetable", "Fruit", "Grain", "Other"],
            },
            {
              label: "Price per Unit",
              name: "pricePerUnit",
              type: "number",
              placeholder: "e.g., 50",
            },
            {
              label: "Unit",
              name: "unit",
              type: "text",
              placeholder: "kg, ton, bag...",
            },
            {
              label: "Quantity (optional)",
              name: "quantity",
              type: "number",
              placeholder: "e.g., 100",
            },
            {
              label: "Location",
              name: "location",
              type: "text",
              placeholder: "e.g., Dhaka, Bangladesh",
            },
          ].map((field, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="flex flex-col"
            >
              <label className="text-sm mb-1 text-white/80">
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="p-2.5 sm:p-3 rounded-md border border-white/30 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                >
                  <option value="">Select Type</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="p-2.5 sm:p-3 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  required={field.name !== "quantity"}
                />
              )}
            </motion.div>
          ))}

          {/* Image URL */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-2"
          >
            <label className="text-sm mb-1 text-white/80">
              Image URL (optional)
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full p-2.5 sm:p-3 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="md:col-span-2"
          >
            <label className="text-sm mb-1 text-white/80">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description..."
              rows="3"
              className="w-full p-2.5 sm:p-3 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-lime-400"
            ></textarea>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="md:col-span-2 text-center mt-4"
          >
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-400 hover:to-green-500 text-black font-semibold rounded-lg shadow-xl transition-all duration-300"
            >
              {loading ? "Adding Crop..." : "Add Crop 🌿"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddCrop;
