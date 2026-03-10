import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="bg-navy-800">
      {/* Hero Section - Rich gradient with depth */}
      <section className="bg-gradient-to-r from-navy-800 via-navy-700 to-navy-900 text-white py-24 px-4 border-b-2 border-navy-300">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Restoring Lives Through the Love of Christ
          </h1>
          <p className="text-lg md:text-xl text-navy-100 mb-8 leading-relaxed drop-shadow">
            Christ-Like Missionaries is a gospel mission group devoted to preaching Christ, 
            nurturing disciples, and serving different communities with love, humility and faith
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/join" className="bg-navy-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-navy-400 transition-all duration-200 border-2 border-gold shadow-lg">
              Join Us
            </Link>
            <Link to="/support" className="bg-navy-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-navy-400 transition-all duration-200 border-2 border-gold shadow-lg">
              Support Us
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Section - Layered blue card */}
      <section className="py-20 px-4 bg-navy-800">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-navy-500 to-navy-600 rounded-lg shadow-xl p-8 border border-navy-300">
            <h2 className="text-3xl font-bold text-white mb-6">Welcome to Christ-Like Missionaries</h2>
            <p className="text-lg text-navy-100 leading-relaxed">
              We are Christ-centred gospel mission committed to living out the life of Jesus Christ. 
              Our calling is to reach souls with the saving gospel, build believers in faith, and 
              reflect Christ's love through service to humanity.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links / Focus Areas - Multi-shade layering */}
      <section className="py-20 px-4 bg-navy-850">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-14">Our Focus Areas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/ministries" className="group bg-gradient-to-br from-navy-500 to-navy-600 rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:translate-y-2 border border-navy-300 hover:border-gold">
              <h3 className="text-2xl font-bold text-navy-50 mb-4 group-hover:text-gold transition-colors">Our Ministries</h3>
              <p className="text-navy-150 group-hover:text-navy-100 transition-colors">Serving God, transforming lives, and advancing the Kingdom through various ministries.</p>
            </Link>
            <Link to="/events" className="group bg-gradient-to-br from-navy-400 to-navy-500 rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:translate-y-2 border border-navy-200 hover:border-gold">
              <h3 className="text-2xl font-bold text-navy-50 mb-4 group-hover:text-gold transition-colors">Events & Missions</h3>
              <p className="text-navy-100 group-hover:text-navy-50 transition-colors">Upcoming gospel crusades, outreach programs, and mission activities.</p>
            </Link>
            <Link to="/testimonials" className="group bg-gradient-to-br from-navy-500 to-navy-600 rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:translate-y-2 border border-navy-300 hover:border-gold">
              <h3 className="text-2xl font-bold text-navy-50 mb-4 group-hover:text-gold transition-colors">Testimonials</h3>
              <p className="text-navy-150 group-hover:text-navy-100 transition-colors">Stories of transformation and God's work through Christ-Like Missionaries.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )

}
