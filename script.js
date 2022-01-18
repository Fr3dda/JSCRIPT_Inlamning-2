const form = document.querySelector('#todoForm')
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');






let todos = [];

const fetchTodos = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await res.json()
    todos = data;


 listTodos();
}

fetchTodos();

const validateText = (input) => {
    if(input.value.trim() === '') { 
      setError(input, 'Name can\'t be empty')
      return false;
    }

    }
    


const listTodos = () => {
    output.innerHTML = ''
    todos.forEach(todo => {
        output.appendChild(createTodoElement(todo))
    })
}

    const createTodoElement = todo => {
        let card = document.createElement('div');
        card.classList.add('todo');

        let title = document.createElement('p')
        title.classList.add('todo-title');
        title.innerText = todo.title

        let button = document.createElement('button');
        button.classList.add('btn', 'btn-danger', 'btn-sm');
        button.innerText ='X'


        card.appendChild(title);
        card.appendChild(button);

        button.addEventListener('click', () => removeTodo(todo.id, card))
        return card;

    }

    function validateForm() {
        let input = document.forms["todoForm"]["todoInput"].value;
        if (input == "") {
          alert("Name must be filled out");
          return false;
        }
      }




function removeTodo(id, todo) {
    todos = todos.filter(todo => todo.id !== id )
    listTodos()

    console.log(todos)
}

const setError = (input, textMessage) => {
    const parent = input.parentElement;
    parent.classList.add('is-invalid');
    parent.querySelector('.invalid-input').innerText = textMessage;
  }
const validate = input => {
    switch(input.type) {
      case 'text': return validateText(input)
      default:
        break;
    }
}
    

const createNewTodo = title => {
    fetch ('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            title,
            completed: false
        })
    })
    .then(res => res.json())
    .then(data => {
        todos.unshift(data);
        listTodos()
    })
}





form.addEventListener('submit', e => {
    e.preventDefault();

    validateText(todoInput)
    if(input.value !== '') {
      createNewTodo(input.value);
      input.value = '';
      input.focus()

  
    }
  })