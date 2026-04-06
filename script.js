// select DOM elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// load todos from localStorage
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

// save todos
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 🎯 helper: update UI style
function updateStyle(li, completed) {
    li.style.textDecoration = completed ? 'line-through' : 'none';
    li.style.opacity = completed ? '0.6' : '1'; // optional smooth UX
}

// create todo node
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    // checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    // text
    const textspan = document.createElement('span');
    textspan.textContent = " " + todo.text;

    // apply initial style
    updateStyle(li, todo.completed);

    // toggle completion
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        saveTodos();
        updateStyle(li, todo.completed);
    });

    // delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        saveTodos();
        render();
    });

    // append elements
    li.appendChild(checkbox);
    li.appendChild(textspan);
    li.appendChild(deleteBtn);

    return li;
}

// render todos
function render() {
    list.innerHTML = '';

    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });
}

// add todo
function addTodo() {
    const text = input.value.trim();

    if (text) {
        todos.push({ text, completed: false });
        saveTodos();
        render();
        input.value = '';
    }
}

// events
addBtn.addEventListener('click', addTodo);

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// initial render
render();