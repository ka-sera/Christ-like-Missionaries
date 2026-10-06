import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email.trim()) {
      return
    }

    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#0B2545] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">

          {!submitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#0B2545]">
                  Forgot Password?
                </h1>

                <p className="text-gray-600 mt-3">
                  Enter your registered email address and we will help you
                  reset your password.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-[#FFC857]
                    focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FFC857] text-[#0B2545]
                  font-bold py-3 rounded-lg
                  hover:bg-yellow-400 transition duration-200"
                >
                  Send Reset Link
                </button>

              </form>

              {/* Back to login */}
              <div className="text-center mt-6">
                <Link
                  to="/login"
                  className="text-[#0B2545] font-semibold hover:text-[#FFC857] transition"
                >
                  ← Back to Login
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Success message */}
              <div className="text-center">

                <div className="text-5xl mb-5">
                  ✓
                </div>

                <h1 className="text-2xl font-bold text-[#0B2545]">
                  Check Your Email
                </h1>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  If an account exists with
                </p>

                <p className="font-semibold text-[#0B2545] mt-1">
                  {email}
                </p>

                <p className="text-gray-600 mt-2 leading-relaxed">
                  you will receive instructions to reset your password.
                </p>

                <Link
                  to="/login"
                  className="inline-block mt-8 bg-[#FFC857]
                  text-[#0B2545] font-bold px-6 py-3 rounded-lg
                  hover:bg-yellow-400 transition duration-200"
                >
                  Return to Login
                </Link>

              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default ForgotPassword