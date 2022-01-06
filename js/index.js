
const todoText = document.getElementById('todo')
const todoList = document.getElementById('todo-list')

var todoStore = [] // Array para almacenar las tareas


const todoItemIdColumn = (id, status) => {
    let div = document.createElement('div')
    div.className = 'col-sm-1 col-md-1'

    let check = document.createElement('input')
    check.setAttribute('type', 'checkbox')
    check.checked = status
    check.className = 'form-check-input me-1'
    check.onclick = (event) => checkTarea(event)

    let span = document.createElement('span')
    span.className = 'fw-normal d-none'
    span.setAttribute('id', 'todoID')
    span.innerHTML = id

    div.appendChild(check)
    div.appendChild(span)
    return div
}

const todoItemTextColumn = (text, status) => {
    let div = document.createElement('div')
    div.className = 'col-sm-12 col-md-9'

    let span = document.createElement('span')
    span.className = (status) ? 'text-decoration-line-through' : 'fw-normal'
    span.setAttribute('id', 'todoText')
    span.innerHTML = text

    div.appendChild(span)
    return div

}

const todoItemAction = () => {
    let div = document.createElement('div')
    div.className = 'col-sm-12 col-md-2 d-grid'

    let buttonIcon = document.createElement('span')
    buttonIcon.className = 'bi bi-trash-fill'

    let button = document.createElement('button')
    button.className = 'btn btn-danger'
    button.innerHTML = ' Eliminar'
    button.prepend(buttonIcon)
    button.onclick = (event) => eliminarTarea(event)

    div.appendChild(button)
    return div
}


const todoItem = (todo) => {
    let row = document.createElement('div')
    row.className = 'row'

    let colId = todoItemIdColumn(todo.id, todo.status)
    let colText = todoItemTextColumn(todo.text, todo.status)
    let colAction = todoItemAction()

    row.appendChild(colId)
    row.appendChild(colText)
    row.appendChild(colAction)

    /* console.log(todoStore) */
    return row
}

const appendTodo = (todo) => {
    let li = document.createElement('li')
    li.className = 'list-group-item'

    li.appendChild(todoItem(todo))
    todoList.appendChild(li)

}


if (localStorage.getItem('todos') !== null) {
    todoStore = JSON.parse(localStorage.getItem('todos'))

    todoStore.forEach(todo => {
        appendTodo(todo)
    });

}

// funciones
const checkTarea = (event) => {
    let todoItem = event.target.parentNode.parentNode // Obtener el nodo padre
    let todoID = todoItem.querySelector('#todoID')
    let todoText = todoItem.querySelector('#todoText')

    todoStore.map(todo => {
        if (todo.id == todoID.innerHTML) {
            todo.status = event.target.checked
        }
    })

    if (event.target.checked) {
        todoText.classList.add('text-decoration-line-through')
    } else {
        todoText.classList.remove('text-decoration-line-through')
    }

    localStorage.setItem('todos', JSON.stringify(todoStore))
}

const eliminarTarea = (event) => {
    //var btnText = event.target.textContent || event.target.innerText
    let todoItem = event.target.parentNode.parentNode.parentNode // Obtener el nodo padre
    let todoID = todoItem.querySelector('#todoID').innerHTML // Obtener el valor del ID del span

    todoStore = todoStore.filter(item => item.id != todoID)
    todoItem.remove()

    localStorage.setItem('todos', JSON.stringify(todoStore))
}


todoText.addEventListener('keyup', (event) => {
    if (event.code === 'Enter' && !!event.target.value) {
        let todo = { 'id': Date.now(), 'text': todoText.value, 'status': false }
        appendTodo(todo)
        todoText.value = ''

        todoStore = [...todoStore, todo]
        localStorage.setItem('todos', JSON.stringify(todoStore))
    }
})

function addTodoToList(todo) {
    if (!!todoText.value) {
        let todo = { 'id': Date.now(), 'text': todoText.value, 'status': false }
        appendTodo(todo)
        todoText.value = ''

        todoStore = [...todoStore, todo]
        localStorage.setItem('todos', JSON.stringify(todoStore))
    }
}