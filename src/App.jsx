import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { ChatSide } from './Components/ChatSide'
import ChatScreen from './Components/ChatScreen'
import { Login } from './Components/Login'

function App() {
  return (
    <div className='container'>
      {/* <h1>Glume Chat</h1> */}
      <ChatSide/>
      <ChatScreen/>
      {/* <Login/> */}
    </div>
  )
}


export default App
