import { auth, signInWithEmailAndPassword } from '../firebase-config';
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('login suceess...')
            console.log('cre ', userCredential)
            // ...
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    return (
      <div>
        <h1>Login Page</h1>
        <div>
            <input type="email" placeholder="Enter username" required onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
            <input type="password" placeholder="Enter password" required onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button onClick={signin}>Login</button>
      </div>
    );
  }
  
  export default Login;