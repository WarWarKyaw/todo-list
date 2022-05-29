import { useState, useEffect } from "react";
import { db, collection, query, onSnapshot, doc, updateDoc, deleteDoc } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { orderBy } from "firebase/firestore";

function Home() {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [displayTasks, setDisplayTasks] = useState([]);
    const [activeLink, setActiveLink] = useState("all");

    useEffect(() => {
        const q = query(collection(db, "tasks"), orderBy("expected_date", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
            arr.push({...doc.data(), id: doc.id});
        });
        console.log("Current tasks: ", arr);
        setTasks(arr);
        setDisplayTasks(arr);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const completeTask = async (item) => {
        const taskRef = doc(db, "tasks", item.id);

        // Set the "is_completed" field of the task 'item.id'
        await updateDoc(taskRef, {
            is_completed: !item.is_completed,
            completed_date: !item.is_completed ? new Date() : ""
        });
    }

    const deleteTask = async (item) => {
        const isConfirm = window.confirm("Are you sure to delete the task?");
        if(isConfirm) {
            const taskRef = doc(db, "tasks", item.id);
            await deleteDoc(taskRef);
        }
    }

    const updateTask = item => {
        console.log('update Task');
        navigate("update", { state: {item} });
    }

    const changeLink = (data) => {
        setActiveLink(data);
        if (data === 'all') {
            setDisplayTasks(tasks);
        } else if (data === 'complete') {
            const arr = tasks.filter(item => item.is_completed === true);
            setDisplayTasks(arr);
        } else if (data === 'incomplete') {
            const arr = tasks.filter(item => item.is_completed === false);
            setDisplayTasks(arr);
        }
    }

    return (
      <div >
        <h1>Home Page</h1>
        <div className="btn-group" role="group">
            <button type="button" className={`btn btn-outline-primary ${activeLink === 'all' ? 'active' : ''}`} onClick={() => changeLink("all")}>All Tasks</button>
            <button type="button" className={`btn btn-outline-primary ${activeLink === 'complete' ? 'active' : ''}`} onClick={() => changeLink("complete")}>Completed Tasks</button>
            <button type="button" className={`btn btn-outline-primary ${activeLink === 'incomplete' ? 'active' : ''}`} onClick={() => changeLink("incomplete")}>Incompleted Tasks</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Expected Date</th>
                    <th>Completed Date</th>
                    <th>Priority</th>
                    <th>Operations</th>
                </tr>
            </thead>
            <tbody>
                {
                    displayTasks.map(item => {
                        return (
                            <tr key={item.id} className={item.is_completed ? 'line-through' : ''}>
                                <td onClick={() => completeTask(item)}><input type="checkbox" checked={item.is_completed} onChange={() => completeTask(item)} />{item.title}</td>
                                <td>{new Date(item.expected_date.seconds * 1000).toLocaleDateString('en-SG')}</td>
                                <td>{item.completed_date ? new Date(item.expected_date.seconds * 1000).toLocaleDateString('en-SG') : ""}</td>
                                <td>{item.priority}</td>
                                <td>
                                    <button onClick={() => updateTask(item)}>Update</button>
                                    <button onClick={() => deleteTask(item)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
      </div>
    );
  }
  
  export default Home;