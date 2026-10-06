
import React, { useState } from 'react'
import { contactAPI } from '../services/api'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setSuccess('')
    setError('')

    try {
      const response = await contactAPI.sendMessage(formData)

      setSuccess(
        response.data?.message ||
        'Your message has been sent successfully.'
      )

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })

    } catch (err) {
      console.error('Contact form error:', err)

      const responseData = err.response?.data

      if (responseData) {
        if (typeof responseData === 'string') {
          setError(responseData)
        } else if (responseData.detail) {
          setError(responseData.detail)
        } else {
          const messages = Object.values(responseData)
            .flat()
            .filter(Boolean)

          setError(
            messages.length
              ? messages.join(' ')
              : 'Unable to send your message. Please try again.'
          )
        }
      } else {
        setError(
          'Unable to send your message. Please check your connection and try again.'
        )
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">
            Send us a Message
          </h2>

          {success && (
            <div className="mb-6 p-4 rounded-lg bg-green-100 border border-green-300 text-green-800">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-100 border border-red-300 text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                Message
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>

          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">
            Get in Touch
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">
              Email
            </h3>

            <p className="text-gray-600">
              info@christ-likemissionaries.org
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">
              Phone
            </h3>

            <p className="text-gray-600">
              0700880903 - Wyclif Augo
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">
              Location
            </h3>

            <p className="text-gray-600">
              University of Eastern Africa, Baraton
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">
              Follow Us
            </h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800"
              >
                Facebook
              </a>

              <a
                href="#"
                className="text-blue-600 hover:text-blue-800"
              >
                Twitter
              </a>

              <a
                href="#"
                className="text-blue-600 hover:text-blue-800"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
