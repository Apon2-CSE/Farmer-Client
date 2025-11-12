// src/Pages/MyInterests/MyInterests.jsx
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
    if (!user) return;
    const fetchInterests = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3000/my-interests?userEmail=${user.email}`
        );
        setInterests(res.data); // data should include crop info + user interest
      } catch (err) {
        console.error(err);
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
    return <p className="text-center mt-10">You have not sent any interests yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        My Interests
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse shadow-md">
          <thead>
            <tr className="bg-green-100">
              <th className="border px-4 py-2">Crop Name</th>
              <th className="border px-4 py-2">Owner</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {interests.map((crop) =>
              crop.interests
                .filter((i) => i.userEmail === user.email)
                .map((i) => (
                  <tr key={i._id} className="hover:bg-green-50">
                    <td className="border px-4 py-2">{crop.name}</td>
                    <td className="border px-4 py-2">{crop.owner?.ownerName || "Unknown"}</td>
                    <td className="border px-4 py-2">{i.quantity}</td>
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
