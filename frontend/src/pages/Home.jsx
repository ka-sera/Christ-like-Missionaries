import React from 'react'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-deepblue-700 to-deepblue-600 text-white rounded-lg p-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Christ-Like Missionaries</h1>
        <p className="text-xl mb-8">
          Dedicated to spreading faith, hope, and charity across the world
        </p>
        <button className="bg-deepblue-400 text-white px-6 py-3 rounded font-bold hover:bg-deepblue-300">
          View Missions
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To serve communities in need and spread the message of Christ's love globally.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-2">Impact</h3>
          <p className="text-gray-600">
            Thousands of lives changed through education, healthcare, and spiritual growth.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-2">Community</h3>
          <p className="text-gray-600">
            Join a global community of missionaries dedicated to making a difference.
          </p>
        </div>
      </div>
    </div>
  )
}
