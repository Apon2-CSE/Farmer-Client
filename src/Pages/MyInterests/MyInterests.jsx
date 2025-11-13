import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Authcontext } from "../../context/Authcontext";
import LoadingScreen from "../Loading/LoadingScreen";

const MyInterests = () => {
  const { user } = useContext(Authcontext);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "My Interests | KrishiLink";
    if (!user) return;

    const fetchInterests = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://krishi-db-server.vercel.app/my-interests?userEmail=${user.email}`
        );

        // Only include crops where this user has sent interest
        const userInterests = res.data
          .map((crop) => {
            const filteredInterests = crop.interests.filter(
              (i) => i.userEmail === user.email
            );
            if (filteredInterests.length > 0) {
              return { ...crop, interests: filteredInterests };
            }
            return null;
          })
          .filter(Boolean); // remove nulls

        setInterests(userInterests);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to fetch your interests");
      } finally {
        setLoading(false);
      }
    };

    fetchInterests();
  }, [user]);

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (interests.length === 0)
    return (
      <p className="text-center mt-10">You have not sent any interests yet.</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        My Interests
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse shadow-md">
          <thead>
            <tr className="bg-green-100">
              <th className="border px-4 py-2">_id</th>
              <th className="border px-4 py-2">Crop Name</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Price/Unit</th>
              <th className="border px-4 py-2">Unit</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Owner</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {interests.map((crop) =>
              crop.interests.map((i) => (
                <tr key={i._id} className="hover:bg-green-50">
                  <td className="border px-4 py-2">{crop._id}</td>
                  <td className="border px-4 py-2">{crop.name}</td>
                  <td className="border px-4 py-2">{crop.type}</td>
                  <td className="border px-4 py-2">{crop.pricePerUnit}</td>
                  <td className="border px-4 py-2">{crop.unit}</td>
                  <td className="border px-4 py-2">{i.quantity}</td>
                  <td className="border px-4 py-2">{crop.description}</td>
                  <td className="border px-4 py-2">{crop.location}</td>
                  <td className="border px-4 py-2">
                    {crop.owner?.name || "Unknown"}
                  </td>
                  <td className="border px-4 py-2">{i.message}</td>
                  <td
                    className={`border px-4 py-2 font-semibold capitalize ${
                      i.status === "pending"
                        ? "text-gray-500"
                        : i.status === "accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {i.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyInterests;
