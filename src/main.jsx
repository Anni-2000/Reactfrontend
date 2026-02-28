import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AllData from './Component/AllData.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './Component/Dashboard.jsx'
import Layout from './Component/Layout.jsx'
import Update from './Component/Update.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Layout/>} />
        <Route path="/dashboard" element={<><Layout/><Dashboard /></>} />
        <Route path="/AllData" element={<><Layout/><AllData /></>} />
           <Route path="/update/:id" element={<><Layout/><Update /></>} />
       

        

      </Routes>
</BrowserRouter>
  </StrictMode>,
)
