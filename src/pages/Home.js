import { useState, useEffect } from "react";
import {
  db,
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { orderBy } from "firebase/firestore";
import LogoutBtn from "../components/LogoutBtn";
import Alert from "../components/Alert";

function Home() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompletedTasks, setIncompletedTasks] = useState([]);
  const [activeLink, setActiveLink] = useState("all");
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, orderBy("expected_date", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setTasks(arr);
      // setCompletedTasks(arr.filter((item) => item.is_completed === true));
      setIncompletedTasks(arr.filter((item) => item.is_completed === false));
      let sortedArr = [...arr];
      sortedArr = sortedArr.filter((item) => item.is_completed === true);
      sortedArr.sort(function (a, b) {
        return (
          new Date(b.completed_date.seconds * 1000) -
          new Date(a.completed_date.seconds * 1000)
        );
      });
      setCompletedTasks(sortedArr);
    });

    return () => {
      unsubscribe();
    };
  }, [activeLink]);

  const completeTask = async (item) => {
    const taskRef = doc(db, "tasks", item.id);

    // Set the "is_completed" field of the task 'item.id'
    await updateDoc(taskRef, {
      is_completed: !item.is_completed,
      completed_date: !item.is_completed ? new Date() : "",
    });
    !item.is_completed && setIsAlert(true);
    !item.is_completed && setTimeout(() => setIsAlert(false), 2000);
  };

  const deleteTask = async (item) => {
    const isConfirm = window.confirm("このタスクを削除しますか？");
    if (isConfirm) {
      const taskRef = doc(db, "tasks", item.id);
      await deleteDoc(taskRef);
    }
  };

  const updateTask = (item) => {
    navigate("update", { state: { item } });
  };

  const changeLink = (data) => {
    setActiveLink(data);
  };

  const remainTasks = (totalTasks) => {
    if (totalTasks === 0) return "タスクがありません。";
    return `${totalTasks} タスク`;
  };

  return (
    <div>
      <LogoutBtn />
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-outline-success btn-sm"
          onClick={() => navigate("/create")}
          style={{ width: 120 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          タスク登録
        </button>
      </div>
      {isAlert && <Alert />}
      <div className="btn-group" role="group" style={{ marginBottom: 8 }}>
        <button
          type="button"
          className={`btn btn-outline-primary ${
            activeLink === "all" ? "active" : ""
          }`}
          onClick={() => changeLink("all")}
        >
          全タスク
        </button>
        <button
          type="button"
          className={`btn btn-outline-primary ${
            activeLink === "complete" ? "active" : ""
          }`}
          onClick={() => changeLink("complete")}
        >
          完了タスク
        </button>
        <button
          type="button"
          className={`btn btn-outline-primary ${
            activeLink === "incomplete" ? "active" : ""
          }`}
          onClick={() => changeLink("incomplete")}
        >
          未完了タスク
        </button>
      </div>{" "}
      <h4>
        {remainTasks(
          activeLink === "all"
            ? tasks.length
            : activeLink === "complete"
            ? completedTasks.length
            : incompletedTasks.length
        )}
      </h4>
      <table>
        <thead className="text-white" style={{ backgroundColor: "#0D6EFD" }}>
          <tr>
            <th>タイトル</th>
            <th>予定日</th>
            <th>完了日</th>
            <th>優先度</th>
            <th>作用</th>
          </tr>
        </thead>
        <tbody>
          {activeLink === "all"
            ? tasks.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className={item.is_completed ? "line-through" : ""}
                  >
                    <td
                      onClick={() => completeTask(item)}
                      className="cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={item.is_completed}
                        onChange={() => completeTask(item)}
                      />
                      {item.title}
                    </td>
                    <td>
                      {new Date(
                        item.expected_date.seconds * 1000
                      ).toLocaleDateString("en-SG")}
                    </td>
                    <td>
                      {item.completed_date
                        ? new Date(
                            item.completed_date.seconds * 1000
                          ).toLocaleDateString("en-SG")
                        : ""}
                    </td>
                    <td>{item.priority}</td>
                    <td>
                      <button
                        onClick={() => updateTask(item)}
                        className="btn btn-outline-primary btn-sm"
                        style={{ marginRight: 5 }}
                      >
                        編集
                      </button>
                      <button
                        onClick={() => deleteTask(item)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                );
              })
            : activeLink === "complete"
            ? completedTasks.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className={item.is_completed ? "line-through" : ""}
                  >
                    <td onClick={() => completeTask(item)}>
                      <input
                        type="checkbox"
                        checked={item.is_completed}
                        onChange={() => completeTask(item)}
                      />
                      {item.title}
                    </td>
                    <td>
                      {new Date(
                        item.expected_date.seconds * 1000
                      ).toLocaleDateString("en-SG")}
                    </td>
                    <td>
                      {item.completed_date
                        ? new Date(
                            item.completed_date.seconds * 1000
                          ).toLocaleDateString("en-SG")
                        : ""}
                    </td>
                    <td>{item.priority}</td>
                    <td>
                      <button
                        onClick={() => updateTask(item)}
                        className="btn btn-outline-primary btn-sm"
                        style={{ marginRight: 5 }}
                      >
                        編集
                      </button>
                      <button
                        onClick={() => deleteTask(item)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                );
              })
            : incompletedTasks.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className={item.is_completed ? "line-through" : ""}
                  >
                    <td onClick={() => completeTask(item)}>
                      <input
                        type="checkbox"
                        checked={item.is_completed}
                        onChange={() => completeTask(item)}
                      />
                      {item.title}
                    </td>
                    <td>
                      {new Date(
                        item.expected_date.seconds * 1000
                      ).toLocaleDateString("en-SG")}
                    </td>
                    <td>
                      {item.completed_date
                        ? new Date(
                            item.completed_date.seconds * 1000
                          ).toLocaleDateString("en-SG")
                        : ""}
                    </td>
                    <td>{item.priority}</td>
                    <td>
                      <button
                        onClick={() => updateTask(item)}
                        className="btn btn-outline-primary btn-sm"
                        style={{ marginRight: 5 }}
                      >
                        編集
                      </button>
                      <button
                        onClick={() => deleteTask(item)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
