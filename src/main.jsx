import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <GoogleOAuthProvider clientId='453345107768-62oamer07figpo2hbe2un0sulnp5s7cb.apps.googleusercontent.com'>
        <App />
      </GoogleOAuthProvider>
    </HashRouter>
  </React.StrictMode>
)
