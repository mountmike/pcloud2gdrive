import './App.css';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

import { useState } from 'react';


function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="App">
      { user ?
      <HomePage user={user}/>
      :
      <LoginPage onLogin={setUser}/> 
      }
    </div>
  );
}

export default App;
