import React, { useState, useEffect, useContext } from "react";
import { Authcontext } from "../../context/Authcontext";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingScreen from "../Loading/LoadingScreen";

const Myposts = () => {
  const { user } = useContext(Authcontext);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit modal state
  const [editCrop, setEditCrop] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Fetch crops created by the logged-in user
  const fetchCrops = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/crops`);
      const userCrops = res.data.filter(c => c.owner?.ownerEmail === user.email);
      setCrops(userCrops);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch your crops");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, [user]);

  // Handle Delete
  const handleDelete = async (cropId) => {
    const confirm = window.confirm("Are you sure you want to delete this crop?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/crops/${cropId}`);
      toast.success("Crop deleted successfully!");
      setCrops(crops.filter(c => c._id !== cropId));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete crop");
    }
  };

  // Handle Edit (open modal)
  const handleEdit = (crop) => {
    setEditCrop(crop);
    setEditModalOpen(true);
  };

  // Handle Edit Save
  const handleSave = async () => {
    try {
      const { _id, name, pricePerUnit, quantity, unit, location, description } = editCrop;
      await axios.put(`http://localhost:3000/crops/${_id}`, {
        name, pricePerUnit, quantity, unit, location, description
      });
      toast.success("Crop updated successfully!");
      setCrops(crops.map(c => c._id === _id ? editCrop : c));
      setEditModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update crop");
    }
  };

  if (loading) return   <LoadingScreen></LoadingScreen>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Crops</h2>
      {crops.length === 0 ? (
        <p className="text-gray-500">You have not posted any crops yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-green-100">
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Quantity</th>
                <th className="py-2 px-4 border">Location</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {crops.map(crop => (
                <tr key={crop._id}>
                  <td className="border px-4 py-2">{crop.name}</td>
                  <td className="border px-4 py-2">{crop.pricePerUnit} tk/ {crop.unit}</td>
                  <td className="border px-4 py-2">{crop.quantity} {crop.unit}</td>
                  <td className="border px-4 py-2">{crop.location}</td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() => handleEdit(crop)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => handleDelete(crop._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <h3 className="text-xl font-bold mb-4">Edit Crop</h3>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={editCrop.name}
              onChange={e => setEditCrop({ ...editCrop, name: e.target.value })}
              className="w-full border rounded p-2 mb-2"
            />
            <label className="block mb-2">Price Per Unit</label>
            <input
              type="number"
              value={editCrop.pricePerUnit}
              onChange={e => setEditCrop({ ...editCrop, pricePerUnit: e.target.value })}
              className="w-full border rounded p-2 mb-2"
            />
            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              value={editCrop.quantity}
              onChange={e => setEditCrop({ ...editCrop, quantity: e.target.value })}
              className="w-full border rounded p-2 mb-2"
            />
            <label className="block mb-2">Unit</label>
            <input
              type="text"
              value={editCrop.unit}
              onChange={e => setEditCrop({ ...editCrop, unit: e.target.value })}
              className="w-full border rounded p-2 mb-2"
            />
            <label className="block mb-2">Location</label>
            <input
              type="text"
              value={editCrop.location}
              onChange={e => setEditCrop({ ...editCrop, location: e.target.value })}
              className="w-full border rounded p-2 mb-2"
            />
            <label className="block mb-2">Description</label>
            <textarea
              value={editCrop.description}
              onChange={e => setEditCrop({ ...editCrop, description: e.target.value })}
              className="w-full border rounded p-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Myposts;
