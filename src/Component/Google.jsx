


import React, { useContext } from "react";
import { Authcontext } from "../context/Authcontext";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";

const Google = () => {
  const { GoogleLogIn } = useContext(Authcontext);
   const navigate = useNavigate();

  const SignInhandle = (e) => {
    e.preventDefault();
    GoogleLogIn()
      .then((result) => {
        console.log("Google user:", result.user);
        toast.success(`Welcome ${result.user.displayName || "User"}! 🎉`);
         navigate("/");
      
      })
      .catch((error) => {
        console.error(error.message);
        toast.error(`Login failed: ${error.message}`);
      });
  };

  return (
    <>
      {/* Divider */}
      <div className="flex items-center justify-center gap-2 my-2">
        <div className="h-px w-16 bg-white/20"></div>
        <span className="text-sm text-white/50">or</span>
        <div className="h-px w-16 bg-white/20"></div>
      </div>

      {/* Google Button */}
      <button
        type="button"
        onClick={SignInhandle}
        className="w-full py-2 font-semibold rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
      >
        Continue with Google
      </button>
    </>
  );
};

export default Google;
