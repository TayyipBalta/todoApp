const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('.new-todo');
const todoList = document.querySelector('.todo-list');
const toggleAlls = document.querySelector('#toggleAll');

const counti = document.querySelector('#item-count');

let count = 0;

let data = [];
loadData();
function saveData() {
  localStorage.setItem("data", todoList.innerHTML);
}

function itemCount(){
    if(todoList.innerHTML === ""){
    
        return;
    }

    else if(todoList.innerHTML !== ""){

        counti.innerText = count;
    }
}

function addTodo(event) {
    event.preventDefault();

    if (todoInput.value === '') {
        alert('boş bırakılamaz');
        return;
    }

    todoList.innerHTML += `<li>
        <div class="view">
        <input class="toggle" type="checkbox">
        <label class="dodoLabel">${todoInput.value}</label>
        <button class="destroy"></button>
        </div>
        <input class="edit" value="${todoInput.value}">
    </li>`;
    count++;

    saveData();
    todoInput.value = '';
    bindClicks();
}

todoForm.addEventListener('submit', addTodo);

for (const filter of document.querySelectorAll('.filters input')) {
    filter.addEventListener('click', function(){
        // todoList.dataset.filter = this.value;

        todoList.classList.value = 'todo-list ' + this.value;
    });
}

function markTodo() {
    if(this.parentElement.parentElement.classList.toggle('completed')){
        count--;
        itemCount();
        saveData();
    }
    else if(this.parentElement.parentElement.classList.toggle(!'completed')){

        count++;
        itemCount();
        saveData();
    }
}

function removeTodo() {
    this.parentElement.parentElement.remove();
    count--;
    itemCount();
    saveData();
}

function showTodoEdit() {
    this.parentElement.classList.add('editing');

    const currValue = this.nextElementSibling.value;
    this.nextElementSibling.value = '';
    this.nextElementSibling.value = currValue;
    this.nextElementSibling.focus();
    saveData();
}

function showTodoEdit2(element) {
    element.parentElement.parentElement.classList.add('editing');
    saveData();
}

function editTodo(e) {
    if(e.keyCode === 13) {
        if(this.value === ""){
            this.parentElement.remove();
        }
        this.previousElementSibling.querySelector('label').innerText = this.value;
        this.parentElement.classList.remove('editing');
        saveData();
    }
}

// 1- yeni eleman eklendiginde eventleri baglamak -- en mantiksiz olan bu
// 2- delegate etmek -- her kosulda calisir
// 3- create element ile olusturmak -- bunun saglikli calismasi icin mutlaka bir data havuzuna baglanmasi lazim

// event delegation
// todoList.addEventListener('click', delegateClick);
// function delegateClick(e) {
//     const targetEl = e.target;

//     if(targetEl.classList.contains('destroy')) {
//         removeTodo(targetEl);
//     }

//     if(targetEl.classList.contains('toggle')) {
//         markTodo(targetEl);
//     }
// }

todoList.addEventListener('dblclick', delegateDblClick);
function delegateDblClick(e) {
    const targetEl = e.target;

    if(targetEl.classList.contains('dodoLabel')) {
        showTodoEdit2(targetEl);
        saveData();
    }
    if(targetEl.parentElement.classList.contains('editing')){
        this.classList.remove();
        saveData();
    }
}

// bind --> baglamak
function bindClicks() {
    for (const btn of document.querySelectorAll('.destroy')) {
        btn.addEventListener('click', removeTodo);

        count--;
        itemCount();
        saveData();
    }

    for (const btn of document.querySelectorAll('.toggle')) {
        btn.addEventListener('click', markTodo);
        count++;
        saveData();
    }

    itemCount();

    //document.querySelectorAll('.view').forEach(x => x.addEventListener('dblclick', showTodoEdit));

    document.querySelectorAll('.edit').forEach(x => x.addEventListener('keydown', editTodo));
    
    document.querySelectorAll('#toggleAll').forEach(x => x.addEventListener('click' , toggleAllsChoice ));
}

let toggleAllsChoice = () => {
    for(const complateAll of document.querySelectorAll('.view')){

        if(complateAll.parentElement.classList.contains('completed')){
            complateAll.parentElement.classList.remove('completed');
            saveData();
        }
        else{
            complateAll.parentElement.classList.add('completed');
            saveData();
        }
    }
}

function loadData() {
    todoList.innerHTML = localStorage.getItem("data");
   }


