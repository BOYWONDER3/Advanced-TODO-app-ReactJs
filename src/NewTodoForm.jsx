import { useRef } from "react";

export function NewTodoForm({addNewTodo}) {
  
  const nameRef = useRef;

  function handleSumbit(e) {
    e.preventDefault();
    if(nameRef.current.value === '') return

    // add new Todo
    addNewTodo(nameRef.current.value)

    nameRef.current.value = ''
  }

  return (
    <form onSubmit={handleSumbit} id="new-todo-form">
      <label htmlFor="todo-input">New Todo</label>
      <input type="text" id="todo-input" ref={nameRef} />
      <button>Add Todo</button>
    </form>
  );
}
