import { useState } from "react";
import { db, collection, addDoc } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "../components/LogoutBtn";

function Create() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    console.log("submit...");
    setLoading(true);
    const data = { title, expectedDate, priority };

    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        title: data.title,
        priority: data.priority,
        expected_date: new Date(data.expectedDate),
        is_completed: false,
      });
      setLoading(false);
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
      setExpectedDate("");
      setPriority("");
      navigate("/");
    } catch (e) {
      setLoading(false);
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <LogoutBtn />
      <h1>Create Page</h1>
      <form onSubmit={submit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          required
          placeholder="Enter Title"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />{" "}
        <br />
        <label htmlFor="expectedDate">Expected Date</label>
        <input
          id="expectedDate"
          type="date"
          required
          onChange={(event) => setExpectedDate(event.target.value)}
          value={expectedDate}
        />{" "}
        <br />
        <label>Priority</label> <br />
        <input
          type="radio"
          id="low"
          name="priority"
          value="low"
          required
          onChange={(event) => setPriority(event.target.defaultValue)}
        />{" "}
        <label htmlFor="low">Low</label>
        <input
          type="radio"
          id="medium"
          name="priority"
          value="medium"
          onChange={(event) => setPriority(event.target.defaultValue)}
        />{" "}
        <label htmlFor="medium">Medium</label>
        <input
          type="radio"
          id="high"
          name="priority"
          value="high"
          onChange={(event) => setPriority(event.target.defaultValue)}
        />{" "}
        <label htmlFor="high">High</label>
        <br />
        <input type="submit" disabled={loading} />
      </form>
    </div>
  );
}

export default Create;
