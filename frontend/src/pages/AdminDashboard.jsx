
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthStore from '../stores/authStore'
import { adminAPI } from '../services/api'

export default function AdminDashboard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)

  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboard()
    }
  }, [isAuthenticated])

  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await adminAPI.getDashboard()

      setDashboard(response.data)
    } catch (err) {
      console.error('Admin dashboard error:', err)

      if (err.response?.status === 403) {
        setError('You do not have administrator permissions.')
      } else if (err.response?.status === 401) {
        setError('Your session has expired. Please log in again.')
      } else {
        setError('Unable to load the admin dashboard.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B2545] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FFC857] border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

          <p className="text-white text-lg">
            Loading admin dashboard...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B2545] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">

          <h1 className="text-2xl font-bold text-[#0B2545] mb-3">
            Access Denied
          </h1>

          <p className="text-gray-600 mb-6">
            {error}
          </p>

          <a
            href="/"
            className="inline-block bg-[#0B2545] text-white px-6 py-3 rounded-lg font-semibold"
          >
            Return Home
          </a>

        </div>
      </div>
    )
  }

  const statistics = dashboard?.statistics || {}
  const recentUsers = dashboard?.recent_users || []

  return (
    <div className="min-h-screen bg-[#F5F7FA]">

      {/* Header */}
      <div className="bg-[#0B2545] text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          <p className="text-[#FFC857] uppercase tracking-widest text-sm font-bold mb-2">
            Christ-Like Missionaries
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-gray-300 mt-2">
            Welcome, {user?.username || 'Administrator'}
          </p>

        </div>

      </div>

      {/* Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Statistics */}
        <section className="mb-10">

          <h2 className="text-2xl font-bold text-[#0B2545] mb-6">
            Overview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <p className="text-sm font-semibold text-gray-500 uppercase">
                Total Users
              </p>

              <p className="text-4xl font-bold text-[#0B2545] mt-3">
                {statistics.total_users ?? 0}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <p className="text-sm font-semibold text-gray-500 uppercase">
                Active Users
              </p>

              <p className="text-4xl font-bold text-[#0B2545] mt-3">
                {statistics.active_users ?? 0}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <p className="text-sm font-semibold text-gray-500 uppercase">
                Staff / Admins
              </p>

              <p className="text-4xl font-bold text-[#0B2545] mt-3">
                {statistics.staff_users ?? 0}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <p className="text-sm font-semibold text-gray-500 uppercase">
                New Users
              </p>

              <p className="text-4xl font-bold text-[#0B2545] mt-3">
                {statistics.new_users ?? 0}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Last 7 days
              </p>
            </div>

          </div>

        </section>

        {/* Users */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="px-6 py-6 border-b border-gray-100">

            <h2 className="text-2xl font-bold text-[#0B2545]">
              Recent Registered Users
            </h2>

            <p className="text-gray-500 mt-1">
              Latest members registered on the platform.
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                    Username
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                    Email
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                    Role
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                    Joined
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {recentUsers.map((member) => (

                  <tr
                    key={member.id}
                    className="hover:bg-gray-50"
                  >

                    <td className="px-6 py-5 font-semibold text-[#0B2545]">
                      {member.username}
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {member.email}
                    </td>

                    <td className="px-6 py-5">

                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm capitalize">
                        {member.role || 'supporter'}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      {member.is_active ? (

                        <span className="text-green-700 font-semibold">
                          ● Active
                        </span>

                      ) : (

                        <span className="text-red-600 font-semibold">
                          ● Inactive
                        </span>

                      )}

                    </td>

                    <td className="px-6 py-5 text-gray-600">

                      {member.date_joined
                        ? new Date(member.date_joined).toLocaleDateString()
                        : '—'}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        {/* Management */}
        <section className="mt-10">

          <h2 className="text-2xl font-bold text-[#0B2545] mb-6">
            Management
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-[#0B2545] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold text-[#FFC857]">
                Members
              </h3>

              <p className="text-gray-300 mt-2">
                Manage registered members and accounts.
              </p>
            </div>

            <div className="bg-[#12345A] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold text-[#FFC857]">
                Missions
              </h3>

              <p className="text-gray-300 mt-2">
                Manage missions and missionaries.
              </p>
            </div>

            <div className="bg-[#0B2545] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold text-[#FFC857]">
                Donations
              </h3>

              <p className="text-gray-300 mt-2">
                Monitor donations and financial activity.
              </p>
            </div>

            <div className="bg-[#12345A] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold text-[#FFC857]">
                Events
              </h3>

              <p className="text-gray-300 mt-2">
                Manage events and mission activities.
              </p>
            </div>

          </div>

        </section>

      </main>

    </div>
  )
}
