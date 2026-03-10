import React, { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this to your backend
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="bg-navy-800 py-12 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">Contact Us</h1>
        <p className="text-lg text-navy-100 text-center mb-12 border-b-2 border-navy-300 pb-6">
          We'd love to hear from you. Get in touch with us for any inquiries.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Get in Touch</h2>

            <div className="space-y-8">
              <div className="border-l-4 border-gold pl-6">
                <h3 className="text-xl font-bold text-gold mb-2">Address</h3>
                <p className="text-navy-100">
                  Christ-Like Missionaries<br />
                  123 Faith Street<br />
                  Your City, YC 12345
                </p>
              </div>

              <div className="border-l-4 border-gold pl-6">
                <h3 className="text-xl font-bold text-gold mb-2">Phone</h3>
                <p className="text-navy-100">
                  Main: +1 (555) 123-4567<br />
                  Missions: +1 (555) 987-6543<br />
                  Emergency: +1 (555) 111-2222
                </p>
              </div>

              <div className="border-l-4 border-gold pl-6">
                <h3 className="text-xl font-bold text-gold mb-2">Email</h3>
                <p className="text-navy-100">
                  General: <a href="mailto:info@christlikeemissionaries.org" className="text-gold hover:text-yellow-400 transition">info@christlikeemissionaries.org</a><br />
                  Missions: <a href="mailto:missions@christlikeemissionaries.org" className="text-gold hover:text-yellow-400 transition">missions@christlikeemissionaries.org</a><br />
                  Support: <a href="mailto:support@christlikeemissionaries.org" className="text-gold hover:text-yellow-400 transition">support@christlikeemissionaries.org</a>
                </p>
              </div>

              <div className="border-l-4 border-gold pl-6">
                <h3 className="text-xl font-bold text-gold mb-2">Service Times</h3>
                <p className="text-navy-100">
                  Sunday Service: 9:00 AM<br />
                  Wednesday Bible Study: 7:00 PM<br />
                  Friday Youth Meeting: 6:00 PM<br />
                  Prayer Meetings: Daily (6:00 AM)
                </p>
              </div>

              <div className="border-l-4 border-gold pl-6">
                <h3 className="text-xl font-bold text-gold mb-2">Follow Us</h3>
                <p className="text-navy-100">
                  Facebook: @ChristLikeMissionaries<br />
                  Instagram: @CLM_Mission<br />
                  Twitter: @CLMissionaries
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-navy-500 to-navy-600 p-8 rounded-lg shadow-lg border-l-4 border-gold">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

            {submitted && (
              <div className="bg-gold text-gray-900 p-4 rounded mb-6 font-semibold">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-white mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:border-gold bg-navy-100 text-gray-900"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:border-gold bg-navy-100 text-gray-900"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:border-gold bg-navy-100 text-gray-900"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:border-gold bg-navy-100 text-gray-900"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:border-gold bg-navy-100 text-gray-900"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-gray-900 py-3 rounded-lg font-bold hover:bg-yellow-500 transition"
              >
                Send Message
              </button>
            </form>

            <p className="text-sm text-navy-200 mt-4 text-center">
              We typically respond within 24 hours
            </p>
          </div>
        </div>

        {/* Map Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Find Us</h2>
          <div className="bg-gradient-to-br from-navy-600 to-navy-700 rounded-lg overflow-hidden shadow-lg" style={{ height: '400px' }}>
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-navy-200 text-lg">Map Location Coming Soon</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
