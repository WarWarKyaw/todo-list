import React from "react";

export default function Logout() {
  const origin = window.location.origin;
  return (
    <div style={{ backgroundColor: "#E9ECEF", padding: 30, borderRadius: 5 }}>
      <h4 style={{ fontSize: 35 }}>ログアウトになりました。</h4>
      <h5 style={{ marginTop: 20, fontSize: 20 }}>
        こちらに<a href={origin}>ログイン</a> できる!
      </h5>
    </div>
  );
}
