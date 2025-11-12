import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../Hook/useProducts";
import { Authcontext } from "../../context/Authcontext";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingScreen from "../Loading/LoadingScreen";
import { motion, AnimatePresence } from "framer-motion";

const CropDetails = () => {
  const { products, loading, error } = useProduct();
  const { user } = useContext(Authcontext);
  const { id } = useParams();

  const [crop, setCrop] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const foundCrop = products.find((p) => String(p._id) === id);
      if (foundCrop) {
        setCrop(foundCrop);
        setInterests(foundCrop.interests || []);
      }
    }
  }, [products, id]);

  if (loading) return <LoadingScreen />;
  if (error)
    return <div className="text-red-500 text-center mt-20">{error}</div>;
  if (!crop)
    return (
      <div className="text-center mt-20 text-gray-200">Crop not found</div>
    );

  const totalPrice = quantity * crop.pricePerUnit;
  const hasInterest = interests.some((i) => i.userEmail === user?.email);
  const isOwner = user?.email === crop.owner?.ownerEmail;

  const handleInterestSubmit = async (e) => {
    e.preventDefault();
    if (quantity < 1) return toast.error("Quantity must be at least 1");
    if (hasInterest) return toast.error("You have already sent interest");

    setSubmitting(true);
    const interestData = {
      cropId: crop._id,
      userEmail: user.email,
      userName: user.displayName || "User",
      quantity,
      message,
      status: "pending",
    };

    try {
      const res = await axios.post(
        `http://localhost:3000/crops/${crop._id}/interest`,
        interestData
      );
      toast.success("Interest submitted successfully!");
      setInterests([...interests, res.data]);
      setMessage("");
      setQuantity(1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit interest");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInterestAction = async (interestId, action) => {
    try {
      await axios.put(`http://localhost:3000/crops/${crop._id}/interest`, {
        interestId,
        status: action,
      });
      setInterests(
        interests.map((i) =>
          i._id === interestId ? { ...i, status: action } : i
        )
      );
      toast.success(`Interest ${action}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update interest");
    }
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Crop Info */}
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 mb-8 overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 150 }}
      >
        <motion.img
          src={crop.image || "https://source.unsplash.com/600x400/?agriculture"}
          alt={crop.name}
          className="w-full h-80 object-cover rounded-md mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <motion.h2
          className="text-3xl font-bold text-green-700"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {crop.name}
        </motion.h2>
        <motion.p
          className="text-gray-700 mt-2"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          {crop.description}
        </motion.p>
        <motion.p
          className="text-lg mt-2 font-semibold"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Price: {crop.pricePerUnit} ৳ / {crop.unit}
        </motion.p>
        <motion.p
          className="text-md text-gray-600 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          Quantity: {crop.quantity} {crop.unit}
        </motion.p>
        <motion.p
          className="text-md text-gray-600 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Location: {crop.location}
        </motion.p>
        <motion.p
          className="text-sm text-gray-500 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Posted by: {crop.owner?.ownerName || "Unknown"}
        </motion.p>
      </motion.div>

      {/* Interest Form (Non-owner) */}
      {!isOwner && (
        <motion.div
          className="bg-white shadow-md rounded-lg p-6 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-4">Send Interest</h3>
          {hasInterest ? (
            <p className="text-red-500">
              You have already sent an interest for this crop.
            </p>
          ) : (
            <form
              onSubmit={handleInterestSubmit}
              className="flex flex-col gap-4"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <label className="block font-semibold mb-1">
                  Quantity ({crop.unit})
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={1}
                  className="w-full border rounded p-2"
                  required
                />
              </motion.div>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block font-semibold mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
              </motion.div>
              <motion.p
                className="font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
              >
                Total Price: {totalPrice} ৳
              </motion.p>
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                {submitting ? "Submitting..." : "Submit Interest"}
              </motion.button>
            </form>
          )}
        </motion.div>
      )}

      {/* Received Interests (Owner) */}
      {isOwner && (
        <motion.div
          className="bg-white shadow-md rounded-lg p-6 mb-8 overflow-x-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-4">Received Interests</h3>
          {interests.length === 0 ? (
            <p>No interests received yet.</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-green-100">
                  <th className="border px-4 py-2">Buyer Name</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Message</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {interests.map((i) => (
                    <motion.tr
                      key={i._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-green-50"
                    >
                      <td className="border px-4 py-2">{i.userName}</td>
                      <td className="border px-4 py-2">{i.quantity}</td>
                      <td className="border px-4 py-2">{i.message}</td>
                      <td className="border px-4 py-2 capitalize">
                        {i.status}
                      </td>
                      <td className="border px-4 py-2">
                        {i.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleInterestAction(i._id, "accepted")
                              }
                              className="px-3 py-1 bg-green-600 text-white rounded mr-2 hover:bg-green-700 transition"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleInterestAction(i._id, "rejected")
                              }
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default CropDetails;
