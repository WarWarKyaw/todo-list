import React from "react";

export default function Alert() {
  return (
    <div
      className="alert alert-success"
      style={{ width: 300, position: "absolute", top: 0 }}
    >
      Task is completed!
    </div>
  );
}
