import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '../stores/authStore'
import { authAPI } from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    try {
      // Login to Django
      const response = await authAPI.login(
        formData.username,
        formData.password
      )

      // Django TokenAuthentication returns:
      // { "token": "xxxxxxxx" }
      const token = response.data.token

      if (!token) {
        throw new Error(
          'No authentication token was returned by the server.'
        )
      }

      // Save token in browser
      localStorage.setItem('token', token)

      // Save user session in Zustand
      login(
        {
          username: formData.username,
        },
        token
      )

      // Go to normal user dashboard
      navigate('/dashboard')

    } catch (err) {
      console.error('Login error:', err)

      // Remove invalid token if login fails
      localStorage.removeItem('token')

      setError(
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        err.message ||
        'Login failed. Please check your username and password.'
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B2545] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="bg-[#12345A] rounded-2xl shadow-2xl border border-white/10 overflow-hidden">

          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center border-b border-white/10">

            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFC857] flex items-center justify-center">
              <span className="text-[#0B2545] text-2xl font-bold">
                CLM
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="mt-2 text-white/70">
              Login to your Christ-Like Missionaries account
            </p>

          </div>

          {/* Form */}
          <div className="p-8">

            {error && (
              <div className="mb-6 rounded-lg bg-red-500/20 border border-red-400/30 px-4 py-3 text-red-200 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Username */}
              <div className="mb-5">

                <label
                  htmlFor="username"
                  className="block text-white font-semibold mb-2"
                >
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  autoComplete="username"
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-[#FFC857]"
                  required
                />

              </div>

              {/* Password */}
              <div className="mb-2">

                <label
                  htmlFor="password"
                  className="block text-white font-semibold mb-2"
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-white/20 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-[#FFC857]"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#0B2545] transition"
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >

                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3l18 18M10.58 10.58a2 2 0 002.83 2.83M9.88 4.24A10.94 10.94 0 0112 4c5 0 8.5 4 10 8a17.8 17.8 0 01-3.08 4.78M6.61 6.61C4.62 8.03 3.27 10.04 2 12c1.5 4 5 8 10 8a9.8 9.8 0 003.39-.61"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
                        />

                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                        />
                      </svg>
                    )}

                  </button>

                </div>

              </div>

              {/* Forgot Password */}
              <div className="text-right mb-6">

                <Link
                  to="/forgot-password"
                  className="text-[#FFC857] text-sm font-semibold hover:underline"
                >
                  Forgot Password?
                </Link>

              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FFC857] text-[#0B2545] py-3 rounded-lg font-bold text-lg hover:bg-yellow-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

            </form>

            {/* Register */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">

              <p className="text-white/70 text-sm">
                Don't have an account?
              </p>

              <Link
                to="/register"
                className="inline-block mt-2 text-[#FFC857] font-bold hover:underline"
              >
                Create an Account
              </Link>

            </div>

          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">

          <Link
            to="/"
            className="text-white/60 hover:text-[#FFC857] text-sm transition"
          >
            ← Back to Christ-Like Missionaries
          </Link>

        </div>

      </div>
    </div>
  )
}