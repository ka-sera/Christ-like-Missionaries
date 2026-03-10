import React, { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Send message to backend
    alert('Thank you for contacting us! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-deepblue-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-deepblue-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-deepblue-600"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-deepblue-600"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-deepblue-500 text-white py-2 rounded-lg font-bold hover:bg-deepblue-400"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Email</h3>
            <p className="text-gray-600">christlikemissionaries@gmail.com</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Phone</h3>
            <p className="text-gray-600">0700880903 - Wcliffe Augo</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Location</h3>
            <p className="text-gray-600">University of Eastern Africa Baraton</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-deepblue-600 hover:text-deepblue-800">
                Facebook
              </a>
              <a href="#" className="text-deepblue-600 hover:text-deepblue-800">
                Twitter
              </a>
              <a href="#" className="text-deepblue-600 hover:text-deepblue-800">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
