// Filename: Login.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Google from "../../Component/Google";
import { Authcontext } from "../../context/Authcontext";
import toast from "react-hot-toast";

const Login = () => {
  const { LogInUser } = useContext(Authcontext);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Login | KrishiLink";
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);

    LogInUser(email, password)
      .then((result) => {
        console.log("Logged in user:", result.user);
        toast.success("Welcome back 🌿");
        form.reset();
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Invalid email or password ❌");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-800 to-emerald-900 overflow-hidden relative">
      {/* 🌾 Animated Background Glows */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute w-80 h-80 bg-lime-400/20 rounded-full blur-3xl top-10 left-10"
        ></motion.div>
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl bottom-10 right-10"
        ></motion.div>
      </div>

      {/* 🪴 Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 px-6 lg:px-16"
      >
        {/* Left Section (Welcome Text) */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg text-center lg:text-left text-white"
        >
          <h1 className="text-5xl font-extrabold text-lime-300 drop-shadow-md">
            Welcome Back 🌱
          </h1>
          <p className="mt-4 text-lg text-white/80 leading-relaxed">
            Log in to{" "}
            <span className="text-lime-400 font-semibold">KrishiLink</span> —
            the growing community for farmers and crop enthusiasts. Connect,
            share, and cultivate your digital field together.
          </p>
        </motion.div>

        {/* Right Section (Login Form) */}
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-lime-400/20 rounded-3xl p-8 shadow-2xl space-y-6"
        >
          <h2 className="text-2xl font-semibold text-center text-lime-300">
            Sign In to Continue 🌾
          </h2>

          {/* Email */}
          <div>
            <label className="block text-sm text-white/80 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="farmer@example.com"
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm text-white/80 mb-1">Password</label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
              required
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-[38px] text-white/70 cursor-pointer"
            >
              {showPass ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <Link
              to="/ForgetPassword"
              className="text-sm text-lime-400 hover:text-lime-300 underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 font-semibold rounded-lg bg-gradient-to-r from-lime-400 to-green-400 text-black hover:from-lime-300 hover:to-green-300 shadow-md transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-sm text-white/60">or</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Google Login */}
          <Google />

          <p className="text-center text-sm text-white/70">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-lime-400 hover:text-lime-300 underline"
            >
              Create one
            </Link>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
