function getTodo(){
    let todoDiv = document.querySelector('#todo');
    axios.get('/todo').then((response) => {
        console.log(response);
        let todoList = response.data;
        todoDiv.innerHTML = '';
        for (let todo of todoList) {
            todoDiv.innerHTML += `
            
            `;
        }
    })
}

getTodo();