import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '../stores/authStore'
import { authAPI } from '../services/api'

export default function Register() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.password_confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const response = await authAPI.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })

      login(
        {
          id: response.data.user?.id,
          username: formData.username,
          email: formData.email,
        },
        response.data.token
      )

      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.username?.[0] || err.response?.data?.email?.[0] || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-800 via-navy-900 to-navy-800 flex justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-gradient-to-br from-navy-500 to-navy-600 p-8 rounded-lg shadow-lg border-l-4 border-gold">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Register</h1>

        {error && <div className="bg-red-600 text-white p-4 rounded mb-6 font-semibold">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:border-gold bg-navy-100 text-gray-900"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:border-gold bg-navy-100 text-gray-900"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:border-gold bg-navy-100 text-gray-900"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              name="password_confirm"
              value={formData.password_confirm}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:border-gold bg-navy-100 text-gray-900"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-gray-900 py-2 rounded-lg font-bold hover:bg-yellow-500 disabled:bg-gray-400 transition"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-6 text-navy-150">
          Already have an account?{' '}
          <Link to="/login" className="text-gold hover:text-yellow-400 font-bold transition">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}
