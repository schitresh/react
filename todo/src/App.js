import React, {useState, useRef, useEffect} from 'react';
import Todolist from './Todolist'

function App() {
  const [todos, setTodos] = useState([])
  const todoName = useRef()

  const LOCAL_STORAGE_KEY = 'todoAPP.todos'

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function clearTodos(){
    const notCompleted = todos.filter(todo => !todo.complete)
    setTodos(notCompleted)
  }

  function addTodo(e){
    const name = todoName.current.value
    if(name === '') return
    setTodos(prevTodos => {
      let lastId = (prevTodos.length ? prevTodos.slice(-1)[0].id : 1)
      return [...prevTodos, {id: lastId + 1, name: name, complete: false}]
    })
    todoName.current.value = null
  }
  return (
    <>
      <input ref={todoName} type="text"></input>
      <button onClick={addTodo}>Add</button>
      <button onClick={clearTodos}>Clear completed</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div> 
      <Todolist todos={todos} toggleTodo={toggleTodo} />
    </>
  );
}

export default App;
