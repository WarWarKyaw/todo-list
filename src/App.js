import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home';
import Create from './pages/Create';
import Update from './pages/Update';
import Login from './pages/Login';
import { useState } from "react";
import { auth, onAuthStateChanged } from './firebase-config';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      setIsLogin(true);
    } else {
      // User is signed out
      setIsLogin(false);
    }
  });

  const signOut = () => {
    auth.signOut();
  }

  return (
    <div>
      <button onClick={signOut}>Log out</button>
      {
        !isLogin ? <Login /> 
        : 
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/update" element={<Update />} />
          </Routes>
        </Router>
      }
    </div>
  );
}

export default App;
