import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
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
import ForgotPassword from './pages/ForgotPassword'
import AdminDashboard from './pages/AdminDashboard'

import logo from './assets/logo.png'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
  }, [pathname])

  return null
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    window.location.href = '/'
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <Router>
  <ScrollToTop />

           <div className="min-h-screen w-full bg-navy-800 overflow-x-hidden"> 

        {/* Navigation */}
        <nav className="w-full bg-gradient-to-r from-navy-800 via-navy-700 to-navy-800 shadow-lg border-b border-navy-150">

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">

            {/* Main Navigation Bar */}
            <div className="flex justify-between items-center min-h-16 py-2">

              {/* Logo */}
              <Link
                to="/"
                onClick={closeMenu}
                className="flex items-center gap-2 min-w-0"
              >
                <img
                  src={logo}
                  alt="Christ-Like Missionaries Logo"
                  className="h-12 sm:h-14 w-auto flex-shrink-0"
                />

                <span className="text-sm sm:text-lg font-bold text-white hidden sm:inline truncate">
                  CHRIST-LIKE MISSIONARIES
                </span>
              </Link>


              {/* Desktop Navigation */}
              <div className="hidden lg:flex gap-5 items-center text-sm">

                <Link
                  to="/"
                  className="text-white hover:text-gold font-medium transition-colors duration-200"
                >
                  Home
                </Link>

                <Link
                  to="/about"
                  className="text-white hover:text-gold font-medium transition-colors duration-200"
                >
                  About
                </Link>

                <Link
                  to="/ministries"
                  className="text-white hover:text-gold font-medium transition-colors duration-200"
                >
                  Ministries
                </Link>

                <Link
                  to="/events"
                  className="text-white hover:text-gold font-medium transition-colors duration-200"
                >
                  Events
                </Link>

                <Link
                  to="/testimonials"
                  className="text-white hover:text-gold font-medium transition-colors duration-200"
                >
                  Testimonials
                </Link>

                <Link
                  to="/join"
                  className="text-white hover:text-gold font-medium transition-colors duration-200"
                >
                  Join
                </Link>

                <Link
                  to="/support"
                  className="text-white hover:text-gold font-medium transition-colors duration-200"
                >
                  Support
                </Link>

                <Link
                  to="/contact"
                  className="text-white hover:text-gold font-medium transition-colors duration-200"
                >
                  Contact
                </Link>

                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-white hover:text-gold font-medium transition-colors duration-200"
                    >
                      Dashboard
                    </Link>

                    <span className="text-navy-200 text-xs whitespace-nowrap">
                      Welcome, {user?.username}
                    </span>

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
                      className="bg-gold text-white px-3 py-1 rounded text-sm hover:bg-blue-500 transition-colors duration-200 font-semibold"
                    >
                      Register
                    </Link>
                  </>
                )}

              </div>


              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-white border border-navy-300 hover:bg-navy-600 transition-colors duration-200"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <span className="text-2xl leading-none">×</span>
                ) : (
                  <span className="text-2xl leading-none">☰</span>
                )}
              </button>

            </div>


            {/* Mobile Navigation Menu */}
            {menuOpen && (
              <div className="lg:hidden border-t border-navy-500 py-4">

                <div className="flex flex-col gap-1">

                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="text-white hover:text-gold hover:bg-navy-600 px-4 py-3 rounded-md font-medium transition-colors duration-200"
                  >
                    Home
                  </Link>

                  <Link
                    to="/about"
                    onClick={closeMenu}
                    className="text-white hover:text-gold hover:bg-navy-600 px-4 py-3 rounded-md font-medium transition-colors duration-200"
                  >
                    About
                  </Link>

                  <Link
                    to="/ministries"
                    onClick={closeMenu}
                    className="text-white hover:text-gold hover:bg-navy-600 px-4 py-3 rounded-md font-medium transition-colors duration-200"
                  >
                    Ministries
                  </Link>

                  <Link
                    to="/events"
                    onClick={closeMenu}
                    className="text-white hover:text-gold hover:bg-navy-600 px-4 py-3 rounded-md font-medium transition-colors duration-200"
                  >
                    Events
                  </Link>

                  <Link
                    to="/testimonials"
                    onClick={closeMenu}
                    className="text-white hover:text-gold hover:bg-navy-600 px-4 py-3 rounded-md font-medium transition-colors duration-200"
                  >
                    Testimonials
                  </Link>

                  <Link
                    to="/join"
                    onClick={closeMenu}
                    className="text-white hover:text-gold hover:bg-navy-600 px-4 py-3 rounded-md font-medium transition-colors duration-200"
                  >
                    Join Us
                  </Link>

                  <Link
                    to="/support"
                    onClick={closeMenu}
                    className="text-white hover:text-gold hover:bg-navy-600 px-4 py-3 rounded-md font-medium transition-colors duration-200"
                  >
                    Support Us
                  </Link>

                  <Link
                    to="/contact"
                    onClick={closeMenu}
                    className="text-white hover:text-gold hover:bg-navy-600 px-4 py-3 rounded-md font-medium transition-colors duration-200"
                  >
                    Contact
                  </Link>


                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={closeMenu}
                        className="text-white hover:text-gold hover:bg-navy-600 px-4 py-3 rounded-md font-medium transition-colors duration-200"
                      >
                        Dashboard
                      </Link>

                      <div className="px-4 py-3 text-navy-200 text-sm">
                        Welcome, {user?.username}
                      </div>

                      <button
                        onClick={handleLogout}
                        className="text-left bg-red-600 text-white px-4 py-3 rounded-md font-medium hover:bg-red-700 transition-colors duration-200"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2 pt-3 mt-2 border-t border-navy-500">

                      <Link
                        to="/login"
                        onClick={closeMenu}
                        className="text-center bg-navy-500 text-white px-4 py-3 rounded-md font-medium hover:bg-navy-400 transition-colors duration-200"
                      >
                        Login
                      </Link>

                      <Link
                        to="/register"
                        onClick={closeMenu}
                        className="text-center bg-gold text-white px-4 py-3 rounded-md font-semibold hover:bg-blue-500 transition-colors duration-200"
                      >
                        Register
                      </Link>

                    </div>
                  )}

                </div>

              </div>
            )}

          </div>
        </nav>


        {/* Routes */}
        <main className="w-full">
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

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route
  path="/admin-dashboard"
  element={<AdminDashboard />}
/>

            </Routes>
        </main>


        {/* Footer */}
        <footer className="w-full bg-gradient-to-b from-navy-700 to-navy-800 text-white mt-12 border-t border-navy-150">

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">

              {/* Footer Brand */}
              <div>

                <div className="flex items-center gap-2 mb-4">

                  <img
                    src={logo}
                    alt="Christ-Like Missionaries Logo"
                    className="h-12 w-auto"
                  />

                  <h4 className="font-bold text-lg text-gold">
                    CLM
                  </h4>

                </div>

                <p className="text-sm text-navy-150">
                  Restoring lives through the love of Christ
                </p>

              </div>


              {/* Quick Links */}
              <div>

                <h4 className="font-bold mb-4 text-gold">
                  Quick Links
                </h4>

                <ul className="space-y-2 text-sm">

                  <li>
                    <Link
                      to="/about"
                      className="text-navy-100 hover:text-gold transition-colors duration-200"
                    >
                      About Us
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/ministries"
                      className="text-navy-100 hover:text-gold transition-colors duration-200"
                    >
                      Ministries
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/events"
                      className="text-navy-100 hover:text-gold transition-colors duration-200"
                    >
                      Events
                    </Link>
                  </li>

                </ul>

              </div>


              {/* Get Involved */}
              <div>

                <h4 className="font-bold mb-4 text-gold">
                  Get Involved
                </h4>

                <ul className="space-y-2 text-sm">

                  <li>
                    <Link
                      to="/join"
                      className="text-navy-100 hover:text-gold transition-colors duration-200"
                    >
                      Join Us
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/support"
                      className="text-navy-100 hover:text-gold transition-colors duration-200"
                    >
                      Support Us
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/contact"
                      className="text-navy-100 hover:text-gold transition-colors duration-200"
                    >
                      Contact
                    </Link>
                  </li>

                </ul>

              </div>


              {/* Contact */}
              <div>

                <h4 className="font-bold mb-4 text-gold">
                  Contact
                </h4>

                <p className="text-sm text-navy-100 break-words">

                  <a
                    href="mailto:christlikemissionaries@gmail.com"
                    className="hover:text-gold transition-colors duration-200"
                  >
                    christlikemissionaries@gmail.com
                  </a>

                </p>

              </div>

            </div>


            {/* Copyright & Developer Credit */}
<div className="border-t border-navy-600 pt-8 text-center">

  <p className="text-sm text-navy-150">
    &copy; 2026 Christ-Like Missionaries. All rights reserved.
  </p>

  <p className="text-sm text-navy-150 mt-2">
    Developed by{' '}
    <a
      href="https://ka-sera.github.io/sheldon-portfolio/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gold hover:underline transition-colors duration-200"
    >
      Sheldon Kasera
    </a>
  </p>

</div>

          </div>

        </footer>

      </div>
    </Router>
  )
}

export default App