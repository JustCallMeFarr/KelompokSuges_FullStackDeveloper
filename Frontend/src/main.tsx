import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './styles/index.css' // Pastikan ini mengarah ke file tailwind kamu

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)