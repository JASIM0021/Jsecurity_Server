import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import logo from './jasim0021.png'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <div
        className="bg-gray-100 min-h-screen relative"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundRepeat: 'repeat',
          opacity: '0.7',
        }}
      >

<App />

      </div>
    
    </BrowserRouter>
  </React.StrictMode>,
)
