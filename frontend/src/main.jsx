import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Handle GitHub Pages redirects for React Router
const params = new URLSearchParams(window.location.search)
const redirect = params.get('redirect')

if (redirect) {
  window.history.replaceState(
    null,
    '',
    decodeURIComponent(redirect)
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
