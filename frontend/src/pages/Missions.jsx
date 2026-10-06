import React, { useState, useEffect } from 'react'
import { missionAPI } from '../services/api'

export default function Missions() {
  const [missions, setMissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchMissions()
  }, [filter])

  const fetchMissions = async () => {
    try {
      setLoading(true)
      let response
      if (filter === 'active') {
        response = await missionAPI.getActive()
      } else if (filter === 'completed') {
        response = await missionAPI.getCompleted()
      } else {
        response = await missionAPI.getAll()
      }
      setMissions(response.data.results || response.data)
    } catch (error) {
      console.error('Error fetching missions:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Our Missions</h1>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${
            filter === 'all' ? 'bg-deepblue-600 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          All Missions
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded ${
            filter === 'active' ? 'bg-deepblue-600 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded ${
            filter === 'completed' ? 'bg-deepblue-600 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          Completed
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading missions...</div>
      ) : missions.length === 0 ? (
        <div className="text-center text-gray-600">No missions found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missions.map((mission) => (
            <div key={mission.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
              {mission.image && (
                <img src={mission.image} alt={mission.title} className="w-full h-48 object-cover rounded-t-lg" />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{mission.title}</h3>
                <p className="text-gray-600 mb-3">{mission.missionary_name}</p>
                <p className="text-gray-700 mb-4">{mission.description?.substring(0, 100)}...</p>

                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">${mission.total_donated}</span>
                    <span className="text-sm text-gray-500">${mission.target_amount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-deepblue-600 h-2 rounded-full"
                      style={{ width: `${mission.progress_percentage || 0}%` }}
                    ></div>
                  </div>
                </div>

                <span
                  className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                    mission.status === 'active'
                      ? 'bg-deepblue-100 text-deepblue-800'
                      : mission.status === 'completed'
                      ? 'bg-deepblue-100 text-deepblue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {mission.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
