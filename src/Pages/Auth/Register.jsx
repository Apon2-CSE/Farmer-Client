import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Authcontext } from "../../context/Authcontext";
import Google from "../../Component/Google";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser } = useContext(Authcontext);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    document.title = "Register | KrishiLink";
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const photoURL = form.photoURL.value;

    createUser(email, password)
      .then((result) => {
        console.log("User created:", result.user);
        toast.success("Registration successful 🎉");
        form.reset();
      })
      .catch((error) => {
        console.error(error.message);
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 relative overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute inset-0">
        <div className="absolute w-64 h-64 bg-lime-400/20 rounded-full blur-3xl top-20 left-10 animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl bottom-20 right-10 animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-6 lg:p-10 text-white"
      >
        {/* Left Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-lg text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg text-lime-300">
            Join KrishiLink 🌾
          </h1>
          <p className="mt-3 text-base md:text-lg text-white/80 leading-relaxed">
            Become a part of{" "}
            <span className="text-lime-400 font-semibold">KrishiLink</span> —
            connect with farmers, share knowledge, and grow together.
          </p>
        </motion.div>

        {/* Register Form */}
        <motion.form
          onSubmit={handleSignup}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-6 space-y-4 hover:shadow-lime-400/20 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold text-center text-lime-300">
            Create Account
          </h2>

          {/* Full Name */}
          <div>
            <label className="block text-sm mb-1 text-white/80">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/50 bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-400 text-sm"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-white/80">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              className="w-full border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/50 bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-400 text-sm"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm mb-1 text-white/80">
              Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              className="w-full border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/50 bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-400 text-sm"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm mb-1 text-white/80">Password</label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="w-full border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/50 bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-400 text-sm"
              required
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-[38px] text-white/70 cursor-pointer select-none"
            >
              {showPass ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 font-semibold rounded-lg bg-lime-500 hover:bg-lime-400 text-black transition-colors text-sm shadow-md"
          >
            Register
          </button>

          {/* Google Login */}
          <Google />

          <p className="text-center text-xs text-white/70 mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-lime-400 hover:text-lime-300 underline"
            >
              Login
            </Link>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Register;
