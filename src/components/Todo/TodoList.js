import TodoOptions from "./TodoOptions";
import TodoBox from "./TodoBox";
import { useState, useEffect } from "react";
import axios from "axios";

function TodoList() {
    const [taskList, setTaskList] = useState([]);

    const fetchTasks = () => {
        axios.get('/todo').then((response) => {
            setTaskList(response.data);
        }).catch((error) => {
            console.log(error);
            alert('Something went wrong.');
        });
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return(
        <div>
            <TodoOptions 
                fetchTasks = {fetchTasks}
            />
            <div id="todoList">
                {taskList.map((todo) => (
                    <TodoBox key={todo.id}
                        todo = {todo}
                        fetchTasks = {fetchTasks}
                    />
                ))}
            </div>
        </div>
    );
}

export default TodoList;