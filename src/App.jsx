import './App.css'
import { Login } from './Components/Login'
import { UserContext } from './Components/UserContext'

function App() {
  return (
    <div className='container'>
      <UserContext>
        <Login/>
      </UserContext>
    </div>
  )
}


export default App
