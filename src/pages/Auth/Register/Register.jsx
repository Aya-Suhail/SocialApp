import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../schema/registerSchema";
import { sendData } from "../../../services/Auth/registerService";
import { toast } from "react-toastify";

const UserIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="8" r="4" strokeWidth="1.8" />

    <path strokeLinecap="round" strokeWidth="1.8" d="M4 21a8 8 0 0116 0" />
  </svg>
);

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

const Register = () => {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      gender: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
    },
  });

  async function submitForm(data) {
    try {
      let result = await sendData(data);
      // console.log("submit", result.data.message);
      // console.log("hi",result);
      toast.success(result.data.message);
      navigate("/");
    } catch (err) {
      toast.error("enter avalid data");
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                Create Account
              </h2>

              <p className="text-gray-500 mt-2 text-sm">
                Join our community and start sharing your world
              </p>
            </div>

            <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
              {/* name + username */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    name
                  </label>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <UserIcon />
                    </div>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Choose username"
                      className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* userName */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    username
                  </label>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <UserIcon />
                    </div>

                    <input
                      {...register("username")}
                      type="text"
                      placeholder="Enter your name"
                      className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white"
                    />
                  </div>
                  {errors.username && (
                    <p className="text-red-500">{errors.username.message}</p>
                  )}
                </div>
              </div>

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <LockIcon />
                    </div>
                    <input
                      {...register("rePassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="w-full h-12 pl-12 pr-12 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <EyeIcon open={showConfirmPassword} />
                    </button>
                  </div>
                  {errors.rePassword && (
                    <p className="text-red-500">{errors.rePassword.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      {...register("gender")}
                      className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white"
                    >
                      <option selected>....</option>
                      <option value="female">female</option>
                      <option value="male">male</option>
                    </select>
                  </div>
                  {errors.gender && (
                    <p className="text-red-500">{errors.gender.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      {...register("dateOfBirth")}
                      id="dateOfBirth"
                      aria-label="dateOfBirth"
                      type="date"
                      className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white"
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <p className="text-red-500">{errors.dateOfBirth.message}</p>
                  )}
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 accent-indigo-600 cursor-pointer"
                />

                <p className="text-sm text-gray-500 leading-5">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    Privacy Policy
                  </button>
                </p>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition duration-200"
              >
                Create Account
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

            {/* Login */}
            <p className="text-center text-sm text-gray-500 mt-7">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Login
              </Link>
            </p>
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

export default Register;

// npm i react-toastify
