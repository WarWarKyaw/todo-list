import { auth, signInWithEmailAndPassword } from "../firebase-config";
import { useState } from "react";
import Loading from "../components/Loading";

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: 450,
          backgroundColor: "#EBF2FA",
          padding: 50,
          paddingTop: 30,
          marginTop: -150,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
              }}
              className="bg-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                className="bi bi-lock"
                viewBox="0 0 16 16"
                style={{ color: "white" }}
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
              </svg>
            </div>
            {/* </div> */}
            <h4 style={{ marginBottom: 20, marginTop: 10 }}>ログイン</h4>
          </div>

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
          <div
            className="form-group mt-2 mb-3"
            style={{ paddingTop: 10, paddingBottom: 10 }}
          >
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
            style={{ width: "100%", margin: "auto", display: "block" }}
            onClick={signin}
            disabled={loading}
          >
            {loading ? <Loading /> : "ログイン"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
