import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../services/api'

export default function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

    if (formData.password !== formData.password_confirm) {
      setError('Passwords do not match.')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    setLoading(true)

    try {
      await authAPI.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })

      // Registration successful.
      // Send the new user to Login instead of logging them in automatically.
      navigate('/login', {
        state: {
          registered: true,
          username: formData.username,
        },
      })
    } catch (err) {
      const data = err.response?.data

      setError(
        data?.username?.[0] ||
        data?.email?.[0] ||
        data?.password?.[0] ||
        data?.detail ||
        'Registration failed. Please check your details and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B2545] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Registration Card */}
        <div className="bg-[#12345A] rounded-2xl shadow-2xl border border-white/10 overflow-hidden">

          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center border-b border-white/10">

            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFC857] flex items-center justify-center">
              <span className="text-[#0B2545] text-xl font-bold">
                CLM
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white">
              Create Account
            </h1>

            <p className="mt-2 text-white/70">
              Join Christ-Like Missionaries
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
                  placeholder="Choose a username"
                  autoComplete="username"
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-[#FFC857]"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-white font-semibold mb-2"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-[#FFC857]"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-5">
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
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-white/20 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-[#FFC857]"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#0B2545] transition"
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
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

                <p className="mt-2 text-xs text-white/50">
                  Use at least 8 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div className="mb-6">
                <label
                  htmlFor="password_confirm"
                  className="block text-white font-semibold mb-2"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="password_confirm"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="password_confirm"
                    value={formData.password_confirm}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-white/20 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-[#FFC857]"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#0B2545] transition"
                    aria-label={
                      showConfirmPassword
                        ? 'Hide confirmation password'
                        : 'Show confirmation password'
                    }
                  >
                    {showConfirmPassword ? (
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

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FFC857] text-[#0B2545] py-3 rounded-lg font-bold text-lg hover:bg-yellow-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

            </form>

            {/* Login */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">

              <p className="text-white/70 text-sm">
                Already registered?
              </p>

              <Link
                to="/login"
                className="inline-block mt-2 text-[#FFC857] font-bold hover:underline"
              >
                Login to Your Account
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