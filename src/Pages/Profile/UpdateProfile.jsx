import { updateProfile } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { Authcontext } from '../../context/Authcontext';

const UpdateProfile = () => {
   const { user } = useContext(Authcontext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await updateProfile(user, { displayName, photoURL });
      toast.success("Profile updated successfully!");
      setLoading(false);
      navigate("/"); // redirect to home
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-900 p-4">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl text-white space-y-5 shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-lime-300 text-center mb-4">
          Update Profile
        </h2>

        <div>
          <label className="block text-sm mb-1 text-white/80">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/50 bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-white/80">Photo URL</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/50 bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 font-semibold rounded-lg bg-lime-500 hover:bg-lime-400 text-black transition-colors"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;