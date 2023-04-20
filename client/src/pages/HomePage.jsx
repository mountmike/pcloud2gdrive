import Header from '../components/Header'
import TaskNav from '../components/TaskNav'
import Aside from '../components/Aside'
import Main from '../components/Main'
import { useState } from 'react';

const defaultPageState = [
  { name: "currentTaskPage",
    isActive: true 
  },
  { name: "addTaskPage",
    isActive: false 
  },
  { name: "addCloudPage",
    isActive: false 
  },
]


function HomePage({ user }) {
  const [currentPage, setCurrentPage] = useState(defaultPageState)

  return (
    <div className="App">
      <Header user={user}/>
      <TaskNav setCurrentPage={setCurrentPage} />
      <section className="bottom-wrapper">
        <Aside setCurrentPage={setCurrentPage} />
        <Main currentPage={currentPage} />
      </section>
    </div>
  );
}

export default HomePage;
