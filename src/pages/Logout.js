import React from "react";

export default function Logout() {
  const origin = window.location.origin;
  return (
    <div>
      <h3>You logged out from the system.</h3>
      <h4 style={{ marginTop: 20 }}>
        You can <a href={origin}>login</a> here!
      </h4>
    </div>
  );
}
