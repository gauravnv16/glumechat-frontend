import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Chat from './Chat'
import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Register } from './Components/Register'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/chat" element={<Chat />}/>
      <Route path="*" element={<h1>404 Not Found</h1>}/>
    </Routes>
  </BrowserRouter>,
)
