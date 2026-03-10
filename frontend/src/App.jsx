import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import useAuthStore from './stores/authStore'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MinistriesPage from './pages/MinistriesPage'
import EventsPage from './pages/EventsPage'
import TestimonialsPage from './pages/TestimonialsPage'
import JoinPage from './pages/JoinPage'
import SupportPage from './pages/SupportPage'
import ContactPage from './pages/ContactPage'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <Router>
      <div className="min-h-screen bg-navy-800">
        {/* Navigation - Multi-layered blue with depth */}
        <nav className="bg-gradient-to-r from-navy-800 via-navy-700 to-navy-800 shadow-lg border-b border-navy-150">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center gap-2">
                <img 
                  src="/logo.png" 
                  alt="Christ-Like Missionaries Logo" 
                  className="h-14"
                />
                <span className="text-lg font-bold text-white hidden sm:inline">
                  CHRIST-LIKE MISSIONARIES
                </span>
              </Link>

              <div className="flex gap-6 items-center text-sm">
                <Link to="/" className="text-white hover:text-gold font-medium transition-colors duration-200">
                  Home
                </Link>
                <Link to="/about" className="text-white hover:text-gold font-medium transition-colors duration-200">
                  About
                </Link>
                <Link to="/ministries" className="text-white hover:text-gold font-medium transition-colors duration-200">
                  Ministries
                </Link>
                <Link to="/events" className="text-white hover:text-gold font-medium transition-colors duration-200">
                  Events
                </Link>
                <Link to="/testimonials" className="text-white hover:text-gold font-medium transition-colors duration-200">
                  Testimonials
                </Link>
                <Link to="/join" className="text-white hover:text-gold font-medium transition-colors duration-200">
                  Join
                </Link>
                <Link to="/support" className="text-white hover:text-gold font-medium transition-colors duration-200">
                  Support
                </Link>
                <Link to="/contact" className="text-white hover:text-gold font-medium transition-colors duration-200">
                  Contact
                </Link>

                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="text-white hover:text-gold font-medium transition-colors duration-200">
                      Dashboard
                    </Link>
                    <span className="text-navy-200 text-xs">Welcome, {user?.username}</span>
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="bg-navy-500 text-white px-3 py-1 rounded text-sm hover:bg-navy-400 transition-colors duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-gold text-white- px-3 py-1 rounded text-sm hover:bg-blue-500 transition-colors duration-200 font-semibold"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ministries" element={<MinistriesPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        {/* Footer - Deep navy with layered styling */}
        <footer className="bg-gradient-to-b from-navy-700 to-navy-800 text-white mt-12 border-t border-navy-150">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <img 
                    src="/logo.png" 
                    alt="Logo" 
                    className="h-12"
                  />
                  <h4 className="font-bold text-lg text-gold">CLM</h4>
                </div>
                <p className="text-sm text-navy-150">Restoring lives through the love of Christ</p>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-gold">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="text-navy-100 hover:text-gold transition-colors duration-200">About Us</Link></li>
                  <li><Link to="/ministries" className="text-navy-100 hover:text-gold transition-colors duration-200">Ministries</Link></li>
                  <li><Link to="/events" className="text-navy-100 hover:text-gold transition-colors duration-200">Events</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-gold">Get Involved</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/join" className="text-navy-100 hover:text-gold transition-colors duration-200">Join Us</Link></li>
                  <li><Link to="/support" className="text-navy-100 hover:text-gold transition-colors duration-200">Support Us</Link></li>
                  <li><Link to="/contact" className="text-navy-100 hover:text-gold transition-colors duration-200">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-gold">Contact</h4>
                <p className="text-sm text-navy-100">
                  <a href="mailto:info@christlikeemissionaries.org" className="hover:text-gold transition-colors duration-200">info@christlikeemissionaries.org</a>
                </p>
              </div>
            </div>
            <div className="border-t border-navy-600 pt-8 text-center">
              <p className="text-sm text-navy-150">&copy; 2026 Christ-Like Missionaries. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
