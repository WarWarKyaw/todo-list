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
      <form
        onSubmit={submit}
        style={{ width: 500, margin: "auto", marginTop: 10 }}
      >
        <h3>タスクを登録</h3>
        <div className="form-group">
          <label htmlFor="title">タイトル</label>
          <input
            id="title"
            type="text"
            required
            placeholder="タイトルを入力してください。"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            className="form-control"
          />
        </div>
        <div className="form-group" style={{ marginTop: 10, marginBottom: 10 }}>
          <label htmlFor="expectedDate">予定日</label>
          <input
            id="expectedDate"
            type="date"
            required
            onChange={(event) => setExpectedDate(event.target.value)}
            value={expectedDate}
            className="form-control"
          />
        </div>
        <label>優先度</label> <br />
        <input
          type="radio"
          id="low"
          name="priority"
          value="low"
          required
          onChange={(event) => setPriority(event.target.defaultValue)}
        />{" "}
        <label htmlFor="low" style={{ marginRight: 20 }}>
          低
        </label>
        <input
          type="radio"
          id="medium"
          name="priority"
          value="medium"
          onChange={(event) => setPriority(event.target.defaultValue)}
        />{" "}
        <label htmlFor="medium" style={{ marginRight: 20 }}>
          中
        </label>
        <input
          type="radio"
          id="high"
          name="priority"
          value="high"
          onChange={(event) => setPriority(event.target.defaultValue)}
        />{" "}
        <label htmlFor="high">高</label>
        <br />
        <input
          type="submit"
          value="登録"
          disabled={loading}
          className="btn btn-primary"
          style={{ marginTop: 20 }}
        />
      </form>
    </div>
  );
}

export default Create;
