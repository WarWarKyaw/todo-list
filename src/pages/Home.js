import { useState, useEffect } from "react";
import { db, collection, query, onSnapshot } from "../firebase-config";

function Home() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "tasks"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
            arr.push({...doc.data(), id: doc.id});
        });
        console.log("Current tasks: ", arr);
        setTasks(arr);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    return (
      <div >
        <h1>Home Page</h1>
        <h3>All Tasks</h3>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Expected Date</th>
                    <th>Completed Date</th>
                    <th>Priority</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{new Date(item.expected_date.seconds * 1000).toLocaleDateString()}</td>
                                <td>{item.title}</td>
                                <td>{item.priority}</td>
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