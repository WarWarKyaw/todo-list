import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { db, doc, updateDoc } from "../firebase-config";
import LogoutBtn from "../components/LogoutBtn";

function Update() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { item } = state;
  const [title, setTitle] = useState(item.title);
  const date = new Date(item.expected_date.seconds * 1000);
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  const dateString = `${year}-${month}-${day}`;
  const [expectedDate, setExpectedDate] = useState(dateString);
  const [priority, setPriority] = useState(item.priority);
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    console.log("submit...");
    const isConfirm = window.confirm("Are you sure to update the task?");
    console.log("isConfirm ", isConfirm);
    if (isConfirm) {
      setLoading(true);

      const taskRef = doc(db, "tasks", item.id);

      try {
        // Set the "is_completed" field of the task 'item.id'
        console.log("expe ", expectedDate);
        await updateDoc(taskRef, {
          title,
          priority,
          expected_date: new Date(expectedDate),
        });
        setLoading(false);
        navigate("/");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <LogoutBtn />
      <form
        onSubmit={submit}
        style={{ width: 500, margin: "auto", marginTop: 10 }}
      >
        <h3>Update Task</h3>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            required
            placeholder="Enter Title"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            className="form-control"
          />
        </div>
        <div className="form-group" style={{ marginTop: 10, marginBottom: 10 }}>
          <label htmlFor="expectedDate">Expected Date</label>
          <input
            id="expectedDate"
            type="date"
            required
            onChange={(event) => setExpectedDate(event.target.value)}
            value={expectedDate}
            className="form-control"
          />
        </div>
        <label>Priority</label> <br />
        <input
          type="radio"
          checked={priority === "low"}
          id="low"
          name="priority"
          value="low"
          required
          onChange={(event) => setPriority(event.target.defaultValue)}
        />{" "}
        <label htmlFor="low" style={{ marginRight: 20 }}>
          Low
        </label>
        <input
          type="radio"
          checked={priority === "medium"}
          id="medium"
          name="priority"
          value="medium"
          onChange={(event) => setPriority(event.target.defaultValue)}
        />{" "}
        <label htmlFor="medium" style={{ marginRight: 20 }}>
          Medium
        </label>
        <input
          type="radio"
          checked={priority === "high"}
          id="high"
          name="priority"
          value="high"
          onChange={(event) => setPriority(event.target.defaultValue)}
        />{" "}
        <label htmlFor="high">High</label>
        <br />
        <input
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ marginTop: 20 }}
        />
      </form>
    </div>
  );
}

export default Update;
