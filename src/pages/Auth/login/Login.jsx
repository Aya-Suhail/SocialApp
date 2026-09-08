import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendData } from "../../../services/Auth/loginService";
import { loginSchema } from "../../../schema/loginSchema";
import { toast } from "react-toastify";
import { useContext } from "react";
import { authContext } from "../../../context/authcontext";

const MailIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="M7 10V8a5 5 0 0110 0v2m-9 0h8a2 2 0 012 2v7a2 2 0 01-2 2H8a2 2 0 01-2-2v-7a2 2 0 012-2z"
    />
  </svg>
);

const EyeIcon = ({ open }) => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    {open ? (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
        />
        <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
      </>
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A10.5 10.5 0 0112 5c6.5 0 10 7 10 7a17.7 17.7 0 01-3.1 4.2M6.1 6.1C3.5 8 2 12 2 12s3.5 7 10 7c1.4 0 2.7-.3 3.8-.8"
      />
    )}
  </svg>
);
const Login = () => {
let {token ,setToken} =  useContext(authContext)
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function submitForm(data) {
    try {
      let result =await sendData(data);
      // console.log("submit", data);
      // console.log("hi",result);
      setToken(result.data.data.token)
      toast.success(result.data.message);
      localStorage.setItem('token',result.data.data.token )
      console.log(token);
      navigate("/home");
    } catch (err) {
      toast.error("enter avalid data");
    }
  }

  const [showPassword, setShowPassword] = useState(false);
 
  return (
    <div>
      <div className="min-h-screen bg-[#F7F8FC] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200 mb-4">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M21 11.5a8.4 8.4 0 01-9 8.5 8.8 8.8 0 01-3.8-.9L4 20l1.2-3.7A8.4 8.4 0 013 10.5 8.5 8.5 0 0112 2a8.5 8.5 0 019 9.5z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Social<span className="text-indigo-600">Hub</span>
            </h1>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 p-7 sm:p-9">
            <div className="text-center mb-7">
              <h2 className="text-3xl font-bold text-gray-900">
                Login Account
              </h2>

              <p className="text-gray-500 mt-2 text-sm">
                Join our community and start sharing your world
              </p>
            </div>

            <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <MailIcon />
                  </div>

                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <LockIcon />
                  </div>

                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="w-full h-12 pl-12 pr-12 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition duration-200"
              >
                Login Account
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-1">
                <div className="flex-1 h-px bg-gray-200"></div>

                <span className="text-sm text-gray-400">or</span>

                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Google */}
              <button
                type="button"
                className="w-full h-12 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 transition flex items-center justify-center gap-3"
              >
                <span className="font-bold text-lg">G</span>
                Continue with Google
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            © 2026 SocialHub. All rights reserved.
          </p>
        </div>
      </div>
      );
    </div>
  );
};

export default Login;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNmE5MmI1NTY4ZWJlOTJjMmMwN2UxZjg4IiwiaWF0IjoxNzg3OTk5NzYyLCJleHAiOjE3ODg2MDQ1NjIsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.vxNN3M6UoPFLvJ92lTwjnKevlOzp-FjRhbVZewQ-xro