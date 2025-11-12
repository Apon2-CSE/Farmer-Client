// import React from 'react';
// import { useParams } from 'react-router';
// import useProduct from '../../Hook/useProducts';
// import LoadingScreen from '../Loading/LoadingScreen';

// const CropDetails = () => {
//   const { products, loading, error } = useProduct();
//   const { id } = useParams();

//   // Loading চেক
//   if (loading) return <LoadingScreen></LoadingScreen>;
//   if (error) return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

//   // Crop খুঁজে পাওয়া
//   const crop = products.find(p => String(p._id) === id);

//   if (!crop) return <p className="text-center mt-10">Crop not found</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
//       <img
//         src={crop.image || "https://source.unsplash.com/600x400/?agriculture"}
//         alt={crop.name}
//         className="w-full h-80 object-cover rounded-md"
//       />
//       <h2 className="text-3xl font-bold text-green-700 mt-4">{crop.name}</h2>
//       <p className="text-gray-700 mt-2">{crop.description}</p>
//       <p className="text-lg mt-3 font-semibold">Price: {crop.pricePerUnit} ৳ / {crop.unit}</p>
//       <p className="text-md text-gray-600 mt-1">
//         Category: {crop.type || "N/A"}
//       </p>
//       <p className="text-sm text-gray-500 mt-1">
//         Posted by: {crop.owner?.ownerName || "Unknown"}
//       </p>

//       {/* Interest Button */}
//       <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
//         Show Interest
//       </button>
//     </div>
//   );
// };

// export default CropDetails;



import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../Hook/useProducts";
import { Authcontext } from "../../context/Authcontext";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingScreen from "../Loading/LoadingScreen";

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


  if (loading) return   <LoadingScreen></LoadingScreen>
  if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;
  if (!crop) return <div className="text-center mt-20">Crop not found</div>;

  const totalPrice = quantity * crop.pricePerUnit;

  // Check if logged-in user already sent interest
  const hasInterest = interests.some((i) => i.userEmail === user?.email);

  const isOwner = user?.email === crop.owner?.ownerEmail;

  const handleInterestSubmit = async (e) => {
    e.preventDefault();
    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    if (hasInterest) {
      toast.error("You have already sent an interest for this crop");
      return;
    }

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
      const res = await axios.post(`http://localhost:3000/crops/${crop._id}/interest`, interestData);
      toast.success("Interest submitted successfully!");
      setInterests([...interests, res.data]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit interest");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInterestAction = async (interestId, action) => {
    try {
      const res = await axios.put(`http://localhost:3000/crops/${crop._id}/interest`, {
        interestId,
        status: action,
      });

      // Update interests state
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
    <div className="max-w-5xl mx-auto p-6">
      {/* Crop Info */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <img
          src={crop.image || "https://source.unsplash.com/600x400/?agriculture"}
          alt={crop.name}
          className="w-full h-80 object-cover rounded-md mb-4"
        />
        <h2 className="text-3xl font-bold text-green-700">{crop.name}</h2>
        <p className="text-gray-700 mt-2">{crop.description}</p>
        <p className="text-lg mt-2 font-semibold">Price: {crop.pricePerUnit} ৳ / {crop.unit}</p>
        <p className="text-md text-gray-600 mt-1">Quantity: {crop.quantity} {crop.unit}</p>
        <p className="text-md text-gray-600 mt-1">Location: {crop.location}</p>
        <p className="text-sm text-gray-500 mt-1">
          Posted by: {crop.owner?.ownerName || "Unknown"}
        </p>
      </div>

      {/* Interest Form (Non-owner) */}
      {!isOwner && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold mb-4">Send Interest</h3>
          {hasInterest ? (
            <p className="text-red-500">You have already sent an interest for this crop.</p>
          ) : (
            <form onSubmit={handleInterestSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-semibold mb-1">Quantity ({crop.unit})</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={1}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <p>Total Price: <span className="font-bold">{totalPrice} ৳</span></p>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                {submitting ? "Submitting..." : "Submit Interest"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Received Interests (Owner) */}
      {isOwner && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
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
                {interests.map((i) => (
                  <tr key={i._id}>
                    <td className="border px-4 py-2">{i.userName}</td>
                    <td className="border px-4 py-2">{i.quantity}</td>
                    <td className="border px-4 py-2">{i.message}</td>
                    <td className="border px-4 py-2 capitalize">{i.status}</td>
                    <td className="border px-4 py-2">
                      {i.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleInterestAction(i._id, "accepted")}
                            className="px-3 py-1 bg-green-600 text-white rounded mr-2 hover:bg-green-700 transition"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleInterestAction(i._id, "rejected")}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default CropDetails;
