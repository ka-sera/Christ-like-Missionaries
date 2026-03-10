import React from 'react'

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>

      <div className="bg-white p-8 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
          Christ-Like Missionaries began with a simple vision: to empower individuals to live out their faith
          through meaningful missionary work around the world.
        </p>
        <p className="text-gray-700 mb-4">
          Founded in 2020, our organization has grown to support over 100 active missionaries across 30 countries.
          Each missionary is dedicated to making a positive impact in their communities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-4">Our Values</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Faith in Jesus Christ</li>
            <li>✓ Compassion for all people</li>
            <li>✓ Integrity and transparency</li>
            <li>✓ Excellence in service</li>
            <li>✓ Community engagement</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-4">Our Team</h3>
          <p className="text-gray-700">
            Our team consists of passionate individuals from diverse backgrounds, united by a common goal:
            to serve others with Christ-like love and dedication.
          </p>
        </div>
      </div>
    </div>
  )
}
