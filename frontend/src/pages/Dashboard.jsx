import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthStore from '../stores/authStore'
import { authAPI, donationAPI } from '../services/api'

export default function Dashboard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)
  const [profile, setProfile] = useState(null)
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData()
    }
  }, [isAuthenticated])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const profileRes = await authAPI.getProfile()
      setProfile(profileRes.data)

      const donationsRes = await donationAPI.getMyDonations()
      setDonations(donationsRes.data || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-600">Loading dashboard...</div>
  }

  return (
    <div className="min-h-screen bg-navy-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Dashboard</h1>

        {/* Profile Section */}
        <div className="bg-gradient-to-br from-navy-500 to-navy-600 p-8 rounded-lg shadow-lg mb-8 border-l-4 border-gold">
          <h2 className="text-2xl font-bold mb-4 text-white">My Profile</h2>
          {profile && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-navy-200 font-semibold">Username</label>
                <p className="text-lg font-semibold text-white">{user?.username}</p>
              </div>
              <div>
                <label className="text-navy-200 font-semibold">Email</label>
                <p className="text-lg font-semibold text-white">{user?.email}</p>
              </div>
              <div>
                <label className="text-navy-200 font-semibold">Role</label>
                <p className="text-lg font-semibold text-white">{profile.role}</p>
              </div>
              <div>
                <label className="text-navy-200 font-semibold">Phone</label>
                <p className="text-lg font-semibold text-white">{profile.phone || 'Not provided'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-navy-200 font-semibold">Bio</label>
                <p className="text-lg text-navy-100">{profile.bio || 'No bio provided'}</p>
              </div>
            </div>
          )}
        </div>

        {/* Donations Section */}
        <div className="bg-gradient-to-br from-navy-500 to-navy-600 p-8 rounded-lg shadow-lg border-l-4 border-gold">
          <h2 className="text-2xl font-bold mb-6 text-white">My Donations</h2>

          {donations.length === 0 ? (
            <p className="text-navy-150">You haven't made any donations yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-navy-700">
                    <th className="px-6 py-3 text-left font-semibold text-white">Mission</th>
                    <th className="px-6 py-3 text-left font-semibold text-white">Amount</th>
                    <th className="px-6 py-3 text-left font-semibold text-white">Date</th>
                    <th className="px-6 py-3 text-left font-semibold text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation.id} className="border-b border-navy-400 hover:bg-navy-700 transition">
                      <td className="px-6 py-3 text-navy-100">{donation.mission}</td>
                      <td className="px-6 py-3 font-semibold text-gold">${donation.amount}</td>
                      <td className="px-6 py-3 text-navy-150">{new Date(donation.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-3">
                        <span className="bg-emerald-600 text-white px-3 py-1 rounded text-sm font-semibold">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
