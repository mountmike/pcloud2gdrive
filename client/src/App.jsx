import './App.css';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { getUser } from "./utils/users_service"
import { useState } from 'react';


function App() {
  const [user, setUser] = useState(getUser())

  const login = data => {
    setUser(data)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <div className="App">
      { user ?
      <HomePage user={user} onLogout={logout}/>
      :
      <LoginPage onLogin={setUser}/> 
      }
    </div>
  );
}

export default App;
