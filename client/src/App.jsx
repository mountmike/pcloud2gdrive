import './App.css';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { useEffect, useState } from 'react';
import { auth, db } from "./db/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";


function App() {
  const [authorizedUser] = useAuthState(auth);
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function getUserFromDb() {
      const userRef = doc(db, 'users', authorizedUser.uid);
      const docSnap = await getDoc(userRef);
  
      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        const usersRef = collection(db, "users");
        const newUser = await setDoc(doc(usersRef, authorizedUser.uid), {
          name: authorizedUser.displayName, 
          email: authorizedUser.email,
          uid: authorizedUser.uid,  
        });
        setUser(newUser)
      }
      
    }
    if (authorizedUser) {
      getUserFromDb()
    } 

    
  }, [authorizedUser])

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const signOut = () => {
    auth.signOut();
    setUser(null)
  };

  return (
    <div className="App">
      { user ?
      <HomePage user={user} onLogout={signOut}/>
      :
      <LoginPage onLogin={googleSignIn}/> 
      }
    </div>
  );
}

export default App;
