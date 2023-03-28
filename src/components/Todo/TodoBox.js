import axios from 'axios';
import Swal from 'sweetalert2';

function TodoBox({todo, fetchTasks}) {
    const completeTask = () => {
        axios.put(`/todo/status/${todo.id}`).then((response) => {
            fetchTasks();
        }).catch((error) => {
            console.log(error);
            alert('Something went wrong.');
        });
    }

    const deleteTask = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This task will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteHere();
                    Swal.fire(
                    'Deleted!'
                    );
                }
            }
        );
    }

    const deleteHere = () => {
        axios.delete(`/todo/${todo.id}`).then((response) => {
            fetchTasks();
        }).catch((error) => {
            console.log(error);
            alert('Something went wrong.');
        });
    }

    if(todo.status === "Incomplete"){
        return(
            <div className="todoBox" style={{borderColor: 'gray'}}>
                <h3 id="taskName">{todo.task}</h3>
                <div id="taskDescription">{todo.description}</div>
                <div id="buttonDiv">
                    <button id="completeButton" onClick={completeTask}>Complete</button> <button id="deleteButton" onClick={deleteTask}>Delete</button>
                </div>
            </div>
        );
    } else {
        return(
            <div className="todoBox" style={{borderColor: 'green'}}>
                <h3 id="taskName">{todo.task}</h3>
                <div id="taskDescription">{todo.description}</div>
                <div id="buttonDiv">
                    <button id="deleteButton" onClick={deleteTask}>Delete</button>
                </div>
            </div>
        );
    }
    
}

export default TodoBox;