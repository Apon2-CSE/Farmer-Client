import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Authcontext } from "../../context/Authcontext";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingScreen from "../Loading/LoadingScreen";
import { motion } from "framer-motion";

const CropDetails = () => {
  const { user } = useContext(Authcontext);
  const { id } = useParams();

  const [crop, setCrop] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch crop by ID
  useEffect(() => {
    document.title = "CropDetails | KrishiLink";

    const fetchCrop = async () => {
      try {
        const res = await axios.get(
          `https://krishi-db-server.vercel.app/crops/${id}`
        );
        setCrop(res.data);
        setInterests(res.data.interests || []);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to fetch crop details");
      } finally {
        setLoading(false);
      }
    };

    fetchCrop();
  }, [id]);

  if (loading) return <LoadingScreen />;
  if (error)
    return <div className="text-red-500 text-center mt-20">{error}</div>;
  if (!crop) return <div className="text-center mt-20">Crop not found</div>;

  const totalPrice = quantity * crop.pricePerUnit;
  const hasInterest = interests.some((i) => i.userEmail === user?.email);
  const isOwner = user?.email === crop.owner?.email;

  const handleInterestSubmit = async (e) => {
    e.preventDefault();
    if (quantity < 1) return toast.error("Quantity must be at least 1");
    if (hasInterest)
      return toast.error("You already sent an interest for this crop");

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
        `https://krishi-db-server.vercel.app/crops/${crop._id}/interest`,
        interestData
      );

      const newInterest = res.data.interest || res.data;

      toast.success("✅ Interest submitted successfully!");
      setInterests([...interests, newInterest]);
      setMessage("");
      setQuantity(1);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to submit interest");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInterestAction = async (interestId, action) => {
    try {
      await axios.put(
        `https://krishi-db-server.vercel.app/crops/${crop._id}/interest`,
        { interestId, status: action }
      );

      setInterests(
        interests.map((i) =>
          i._id === interestId ? { ...i, status: action } : i
        )
      );

      toast.success(`Interest ${action}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to update interest");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-green-100 p-8 md:p-12"
      >
        {/* Crop Info */}
        <div className="grid md:grid-cols-2 gap-10">
          <motion.img
            whileHover={{ scale: 1.03 }}
            src={
              crop.image || "https://source.unsplash.com/600x400/?agriculture"
            }
            alt={crop.name}
            className="w-full h-80 object-cover rounded-xl shadow-md"
          />
          <div>
            <h2 className="text-4xl font-bold text-green-800">{crop.name}</h2>
            <p className="text-gray-700 mt-4">{crop.description}</p>

            <div className="mt-4 space-y-2">
              <p className="text-lg font-semibold text-green-700">
                Price:{" "}
                <span className="text-gray-800">
                  {crop.pricePerUnit} ৳ / {crop.unit}
                </span>
              </p>
              <p className="text-gray-700">
                Quantity: {crop.quantity} {crop.unit}
              </p>
              <p className="text-gray-700">Location: {crop.location}</p>
              <p className="text-sm text-gray-500">
                Posted by: {crop.owner?.name || "Unknown"}
              </p>
            </div>
          </div>
        </div>

        {/* Interest Form (Buyer) */}
        {!isOwner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              🌿 Send Your Interest
            </h3>
            {hasInterest ? (
              <p className="text-red-500 font-medium">
                You have already sent an interest for this crop.
              </p>
            ) : (
              <form
                onSubmit={handleInterestSubmit}
                className="flex flex-col md:flex-row gap-6"
              >
                <div className="flex-1">
                  <label className="block font-medium text-gray-700 mb-1">
                    Quantity ({crop.unit})
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min={1}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 transition"
                    required
                  />
                </div>

                <div className="flex-1">
                  <label className="block font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 transition"
                    rows={2}
                    required
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <p className="font-semibold text-gray-800 mb-2">
                    Total:{" "}
                    <span className="text-green-700">{totalPrice} ৳</span>
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-all shadow-md"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}

        {/* Interests (Owner) */}
        {isOwner && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 bg-gradient-to-r from-white to-green-50 border border-green-100 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              💬 Received Interests
            </h3>
            {interests.length === 0 ? (
              <p className="text-gray-600">No interests received yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-green-100 text-green-800">
                      <th className="border px-4 py-2 text-left">Buyer</th>
                      <th className="border px-4 py-2 text-left">Quantity</th>
                      <th className="border px-4 py-2 text-left">Message</th>
                      <th className="border px-4 py-2 text-left">Status</th>
                      <th className="border px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interests.map((i) => (
                      <tr
                        key={i._id}
                        className="border-t hover:bg-green-50 transition"
                      >
                        <td className="px-4 py-3">{i.userName}</td>
                        <td className="px-4 py-3">{i.quantity}</td>
                        <td className="px-4 py-3">{i.message}</td>
                        <td
                          className={`px-4 py-3 capitalize font-medium ${
                            i.status === "accepted"
                              ? "text-green-600"
                              : i.status === "rejected"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {i.status}
                        </td>
                        <td className="px-4 py-3">
                          {i.status === "pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  handleInterestAction(i._id, "accepted")
                                }
                                className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleInterestAction(i._id, "rejected")
                                }
                                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CropDetails;
