import axios from 'axios';
import Swal from 'sweetalert2';

function TodoOptions({fetchTasks}) {
    const addTask = () => {
        Swal.fire({
            title: 'Add Task Here',
            html:
              `<p><label for="taskInput">Task:</label>
              <input id="taskInput" class="swal2-input"></p>` +
              `<p><label for="descriptionInput">Description:</label>
              <input id="descriptionInput" class="swal2-input"></p>`,
            focusConfirm: false,
            preConfirm: () => {
                let todoItem = {
                    task: document.getElementById('taskInput').value,
                    description: document.getElementById('descriptionInput').value
                }
                axios.post('/todo', todoItem).then((response) => {
                    fetchTasks();
                }).catch((error) => {
                    console.log(error);
                    alert('Something went wrong.');
                });
            }
        });
    }

    const clearTask = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "All tasks will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete them!'
            }).then((result) => {
                if (result.isConfirmed) {
                    clearAll();
                    Swal.fire(
                    'Deleted!'
                    );
                }
            }
        );
    }

    const clearAll = () => {
        axios.delete('/todo/clear').then((response) => {
            fetchTasks();
        }).catch((error) => {
            console.log(error);
            alert('Something went wrong.');
        });
    }

    const revertTasks = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "All tasks will turn incomplete!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, I'm sure!`
            }).then((result) => {
                if (result.isConfirmed) {
                    revertAll();
                    Swal.fire(
                    'Reverted!'
                    );
                }
            }
        );
    }

    const revertAll = () => {
        axios.put('/todo/revert').then((response) => {
            fetchTasks();
        }).catch((error) => {
            console.log(error);
            alert('Something went wrong.');
        });
    }

    return(
        <div id="options">
            <button className="optionButton" onClick={addTask}>Add Task</button>
            <button className="optionButton" onClick={clearTask}>Clear Tasks</button>
            <button className="optionButton" onClick={revertTasks}>Revert Completion</button>
        </div>
    );
}

export default TodoOptions;