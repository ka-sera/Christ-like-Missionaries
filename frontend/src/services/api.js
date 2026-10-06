import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add authentication token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Token ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export const authAPI = {
  register: (userData) =>
    api.post('/users/register/', userData),

  login: (username, password) =>
    api.post('/api-token-auth/', {
      username,
      password,
    }),

  getProfile: () =>
    api.get('/profiles/my_profile/'),

  changePassword: (oldPassword, newPassword) =>
    api.post('/users/change_password/', {
      old_password: oldPassword,
      new_password: newPassword,
    }),
}

export const missionaryAPI = {
  getAll: (params) =>
    api.get('/missionaries/', { params }),

  getById: (id) =>
    api.get(`/missionaries/${id}/`),

  create: (data) =>
    api.post('/missionaries/', data),

  update: (id, data) =>
    api.put(`/missionaries/${id}/`, data),

  delete: (id) =>
    api.delete(`/missionaries/${id}/`),

  getMissions: (id) =>
    api.get(`/missionaries/${id}/missions/`),
}

export const missionAPI = {
  getAll: (params) =>
    api.get('/missions/', { params }),

  getById: (id) =>
    api.get(`/missions/${id}/`),

  create: (data) =>
    api.post('/missions/', data),

  update: (id, data) =>
    api.put(`/missions/${id}/`, data),

  delete: (id) =>
    api.delete(`/missions/${id}/`),

  getActive: () =>
    api.get('/missions/active/'),

  getCompleted: () =>
    api.get('/missions/completed/'),

  getDonations: (id) =>
    api.get(`/missions/${id}/donations/`),

  getStatistics: (id) =>
    api.get(`/missions/${id}/statistics/`),
}

export const donationAPI = {
  getAll: (params) =>
    api.get('/donations/', { params }),

  getById: (id) =>
    api.get(`/donations/${id}/`),

  create: (data) =>
    api.post('/donations/', data),

  getMyDonations: () =>
    api.get('/donations/my_donations/'),

  getStatistics: () =>
    api.get('/donations/statistics/'),
}

export const contactAPI = {
  sendMessage: (data) =>
    api.post('/contact/', data),
}

export const prayerAPI = {
  sendRequest: (data) =>
    api.post('/prayer-requests/', data),
}

export const adminAPI = {
  getDashboard: () =>
    api.get('/admin/dashboard/'),
}

export default api