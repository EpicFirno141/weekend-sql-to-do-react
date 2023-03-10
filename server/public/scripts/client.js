function getTodo(){
    let todoDiv = document.querySelector('#todoList');
    axios.get('/todo').then((response) => {
        console.log(response);
        let todoList = response.data;
        console.log(todoList);
        todoDiv.innerHTML = '';
        for (let todo of todoList) {
            if(todo.status === 'Incomplete'){
                todoDiv.innerHTML += `
                <div id="todoBox" style="border-color: gray">
                <h3 id="taskName">${todo.task}</h3>
                <div id="taskDescription">${todo.description}</div>
                <div id="buttonDiv">
                    <button id="completeButton" onClick="completeTask(${todo.id})">Completed</button> <button id="deleteButton" onClick="deleteButton(${todo.id})">Delete</button>
                </div>
                </div>
                `;
            }
            else if(todo.status === 'Complete'){
                todoDiv.innerHTML += `
                <div id="todoBox" style="border-color: green">
                <h3 id="taskName">${todo.task}</h3>
                <div id="taskDescription">${todo.description}</div>
                <div id="buttonDiv" style="text-align: center">
                    <button id="deleteButton" onClick="deleteButton(${todo.id})" style="float: none">Delete</button>
                </div>
                </div>
                `;
            }
        }
    }).catch((error) => {
        console.log(error);
    })
}

function addButton() {
    Swal.fire({
        title: 'Add Task Here',
        html:
          `<p><label for="taskInput">Task:</label>
          <input id="taskInput" class="swal2-input"></p>` +
          `<p><label for="descriptionInput">Description:</label>
          <input id="descriptionInput" class="swal2-input"></p>`,
        focusConfirm: false,
        preConfirm: () => {
            addTask(document.getElementById('taskInput').value, document.getElementById('descriptionInput').value);
          }
    });
      
}

function deleteButton(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "The task will be permanently deleted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTask(id);
                Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
                );
            }
        }
    );
}

function addTask(task, description){
    let todo = {task: task, description: description};
    console.log(todo);
    axios.post('/todo', todo).then((response) => {
        console.log(response);
        getTodo();
    }).catch((error) => {
        console.log(error);
    });
}

function deleteTask(index){
    axios.delete(`/todo/${index}`).then((response) => {
        console.log(response);
        getTodo();
    }).catch((error) => {
        console.log(error);
    });
}

function completeTask(index){
    axios.put(`/todo/status/${index}`).then((response) => {
        console.log(response);
        getTodo();
    }).catch((error) => {
        console.log(error);
    });
}

getTodo();