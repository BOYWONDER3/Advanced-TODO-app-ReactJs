import { createContext, useEffect, useReducer, useState } from "react";
import "./styles.css";
import { TodoItem } from "./TodoItem";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import { TodoFilterForm } from "./TodoFilterForm";

const LOCAL_STORAGE_KEY = "TODOS";
const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
};

function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        { name: payload.name, completed: false, id: crypto.randomUUID() },
      ];
    case ACTIONS.TOGGLE:
      return todos.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, completed: payload.completed };
        }

        return todo;
      });
    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== payload.id);
    default:
      throw new Error(`No action found for ${type}.`);
  }
}

export const TodoContext = createContext;

function App() {
  const [filterName, setFilterName] = useState("");
  const [hideCompletedFilter, setHideCompletedFilter] = useState(false);
  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (value == null) return initialValue;

    return JSON.parse(value);
  });

  const filteredTodos = todos.filter((todo) => {
    if(hideCompletedFilter && todo.completed) return false 
    return todos.name.includes(filterName);
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addNewTodo(name) {
    dispatch({ type: ACTIONS.ADD, payload: { name } });
  }

  function toggleTodo(todoId, completed) {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id: todoId, completed } });
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE, payload: { id: todoId } });
  }

  return (
    <TodoContext.provider
      value={{
        todos: filteredTodos,
        addNewTodo,
        toggleTodo,
        deleteTodo,
      }}
    >
      <TodoFilterForm
        namee={filterName}
        setName={setFilterName}
        hideCompleted={hideCompletedFilter}
        setHideCompleted={setHideCompletedFilter}
      />
      <TodoList />
      <NewTodoForm />
    </TodoContext.provider>
  );
}

export default App;
