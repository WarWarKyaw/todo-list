import React from "react";

export default function Logout() {
  const origin = window.location.origin;
  return (
    <div>
      <h3>ログアウトになりました。</h3>
      <h4 style={{ marginTop: 20 }}>
        こちらに<a href={origin}>ログイン</a> できる!
      </h4>
    </div>
  );
}
