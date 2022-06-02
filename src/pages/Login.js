import { auth, signInWithEmailAndPassword } from "../firebase-config";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        // Signed in
        // need to save userCredential if you want to display userInfo or something
        // ...
      })
      .catch((error) => {
        setLoading(false);
        alert("Email and Password do not match!");
        console.log(error.code);
        console.log(error.message);
      });
  };

  return (
    <div style={{ width: 400, margin: "auto" }}>
      <h3>システムにログインする</h3>
      <div className="form-group">
        <label htmlFor="email">ログインID:</label>
        <input
          type="text"
          className="form-control"
          id="email"
          placeholder="ログインIDを入力してください。"
          required
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
      </div>
      <div className="form-group mt-2 mb-3">
        <label htmlFor="password">パスワード:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="パスワードを入力してください。"
          required
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </div>
      <button
        className="btn btn-primary"
        style={{ width: 150, margin: "auto", display: "block" }}
        onClick={signin}
        disabled={loading}
      >
        ログイン
      </button>
    </div>
  );
}

export default Login;
