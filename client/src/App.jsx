import './App.css';
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import TaskNav from './components/TaskNav'
import Aside from './components/Aside'
import MainPage from './pages/MainPage'
import { useState } from 'react';


function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="App">
      <Header />
      <TaskNav />
      <section className="bottom-wrapper">
        <Aside />
        <MainPage />
      </section>
    </div>
  );
}

export default App;
