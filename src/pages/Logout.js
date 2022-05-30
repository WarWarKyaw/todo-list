import React from "react";

export default function Logout() {
  const origin = window.location.origin;
  return (
    <div>
      <h2>You logged out from the system.</h2>
      You can <a href={origin}>login</a> here!
    </div>
  );
}
