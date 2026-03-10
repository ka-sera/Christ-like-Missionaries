import React, { useState } from 'react'

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: [],
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const interests = [
    'Evangelism & Missions',
    'Bible Study & Discipleship',
    'Youth Fellowship',
    'Prayer & Intercession',
    'Community Outreach',
    'Health Ministry'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckbox = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', interests: [], message: '' })
    }, 3000)
  }

  return (
    <div className="bg-navy-800 py-12 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">Join Us / Partner With Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Why Join Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Why Join Christ-Like Missionaries?</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-navy-500 to-navy-600 p-4 rounded-lg border-l-4 border-gold shadow-md">
                <h3 className="font-bold text-white mb-2">Purpose</h3>
                <p className="text-navy-100">Be part of a movement bringing the gospel and transformation to communities.</p>
              </div>
              <div className="bg-gradient-to-br from-navy-400 to-navy-500 p-4 rounded-lg border-l-4 border-gold shadow-md">
                <h3 className="font-bold text-white mb-2">Community</h3>
                <p className="text-navy-150">Join a committed fellowship of believers dedicated to Christ's mission.</p>
              </div>
              <div className="bg-gradient-to-br from-navy-500 to-navy-600 p-4 rounded-lg border-l-4 border-gold shadow-md">
                <h3 className="font-bold text-white mb-2">Growth</h3>
                <p className="text-navy-100">Develop spiritually through discipleship, Bible study, and mentorship.</p>
              </div>
              <div className="bg-gradient-to-br from-navy-400 to-navy-500 p-4 rounded-lg border-l-4 border-gold shadow-md">
                <h3 className="font-bold text-white mb-2">Impact</h3>
                <p className="text-navy-150">Make a real difference in people's lives and advance God's Kingdom.</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-gradient-to-br from-navy-500 to-navy-600 p-8 rounded-lg shadow-lg border-l-4 border-gold">
            <h2 className="text-2xl font-bold text-white mb-6">Get Started</h2>
            
            {submitted && (
              <div className="bg-gold text-gray-900 p-4 rounded mb-6 font-semibold">
                Thank you! We'll be in touch soon.
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
                <label className="block text-sm font-bold text-white mb-2">Email</label>
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
                <label className="block text-sm font-bold text-white mb-2">Phone</label>
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
                <label className="block text-sm font-bold text-white mb-3">Areas of Interest</label>
                <div className="space-y-2">
                  {interests.map((interest) => (
                    <label key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleCheckbox(interest)}
                        className="mr-3"
                      />
                      <span className="text-navy-100">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:border-gold bg-navy-100 text-gray-900"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-gray-900 py-3 rounded-lg font-bold hover:bg-yellow-500 transition"
              >
                Join Us
              </button>
            </form>
          </div>
        </div>

        {/* Partnership Section */}
        <section className="bg-gradient-to-r from-navy-700 to-navy-800 text-white p-8 rounded-lg border-b border-navy-300 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Partnership Opportunities</h2>
          <p className="mb-6">
            Are you an organization, business, or individual interested in partnering with us to advance 
            Christ's Kingdom? We welcome partnerships in:
          </p>
          <ul className="grid md:grid-cols-2 gap-4 mb-6">
            <li>Organizing mission outreach programs</li>
            <li>Sponsoring community projects</li>
            <li>Supporting health and wellness initiatives</li>
            <li>Funding educational programs</li>
            <li>Providing resources for discipleship</li>
            <li>Hosting events and gatherings</li>
          </ul>
          <p>
            <strong>Contact us:</strong> <a href="mailto:partners@christlikeemissionaries.org" className="underline hover:text-gold">partners@christlikeemissionaries.org</a>
          </p>
        </section>
      </div>
    </div>
  )
}
