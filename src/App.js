import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { useState } from "react";
import { auth, onAuthStateChanged } from "./firebase-config";

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

  return (
    <div className="container" style={{ paddingTop: 10 }}>
      {!isLogin && window.location.pathname !== "/logout" ? (
        <Login />
      ) : (
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/update" element={<Update />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
