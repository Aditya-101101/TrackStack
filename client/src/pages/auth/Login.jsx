import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../features/auth/authSlice.js";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    loading,
    error,
  } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const result =
      await dispatch(
        loginUser(formData)
      );

    if (
      loginUser.fulfilled.match(
        result
      )
    ) {
      navigate("/dashboard");
    }
  }

  return (
    <div
      className="
        flex min-h-screen
        items-center justify-center
        bg-gray-100 px-4
        transition-colors
        dark:bg-black
      "
    >
      <div
        className="
          w-full max-w-md
          rounded-3xl border
          border-gray-200
          bg-white p-8
          shadow-sm
          transition-colors
          dark:border-gray-800
          dark:bg-gray-950
        "
      >

        <div className="mb-8">
          <h1
            className="
              text-3xl font-bold
              text-gray-900
              dark:text-white
            "
          >
            Welcome back
          </h1>

          <p
            className="
              mt-2 text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            Login to your TrackStack
            account
          </p>
        </div>


        {error && (
          <div
            className="
              mb-5 rounded-2xl
              border border-red-200
              bg-red-50 px-4 py-3
              text-sm text-red-700
              dark:border-red-900
              dark:bg-red-950/30
              dark:text-red-400
            "
          >
            {error}
          </div>
        )}


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label
              className="
                mb-2 block
                text-sm font-medium
                text-gray-700
                dark:text-gray-300
              "
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="
                w-full rounded-2xl
                border border-gray-200
                bg-white px-4 py-3
                text-gray-900
                outline-none transition
                placeholder:text-gray-400
                focus:border-black
                dark:border-gray-800
                dark:bg-black
                dark:text-white
                dark:placeholder:text-gray-500
                dark:focus:border-white
              "
            />
          </div>


          <div>
            <label
              className="
                mb-2 block
                text-sm font-medium
                text-gray-700
                dark:text-gray-300
              "
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="
                w-full rounded-2xl
                border border-gray-200
                bg-white px-4 py-3
                text-gray-900
                outline-none transition
                placeholder:text-gray-400
                focus:border-black
                dark:border-gray-800
                dark:bg-black
                dark:text-white
                dark:placeholder:text-gray-500
                dark:focus:border-white
              "
            />
          </div>


          <button
            disabled={loading}
            className="
              w-full rounded-2xl
              bg-black py-3
              font-medium text-white
              transition hover:bg-gray-800
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:bg-white
              dark:text-black
              dark:hover:bg-gray-200
            "
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p
          className="
            mt-6 text-sm
            text-gray-600
            dark:text-gray-400
          "
        >
          Don&apos;t have an
          account?{" "}

          <Link
            to="/register"
            className="
              font-semibold
              text-black hover:underline
              dark:text-white
            "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;