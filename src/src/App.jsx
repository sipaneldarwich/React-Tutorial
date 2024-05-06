import "./App.css";
import { useState } from "react";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todoInputId, setTodoInputId] = useState(4);

  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  function addTodo() {
    if (todoInput.trim() === "") {
      return;
    }

    setTodos([
      ...todos,
      {
        id: todoInputId,
        title: todoInput,
        isComplete: false,
        isEditing: false,
      },
    ]);

    setTodoInputId((prevTodoInputId) => prevTodoInputId + 1);
  }

  function deleteTodo(id) {
    setTodos([...todos].filter((todo) => todo.id !== id));
  }

  function completeTodo(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function markAsEditing(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = true;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function updateTodo(event, id) {
    const title = event.target.value;

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = false;

        if (title.trim === "") {
          return todo;
        }

        todo.title = title;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function cancelEdit(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Finish React Series",
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: "Go Grocery",
      isComplete: true,
      isEditing: false,
    },
    {
      id: 3,
      title: "Take over world",
      isComplete: true,
      isEditing: false,
    },
  ]);

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addTodo}>
          <input
            type="text"
            value={todoInput}
            onChange={handleInput}
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={todo.id} className="todo-item-container">
              <div className="todo-item">
                <input
                  type="checkbox"
                  onChange={() => completeTodo(todo.id)}
                  checked={todo.isComplete ? true : false}
                />
                {!todo.isEditing ? (
                  <span
                    className={`todo-item-label ${
                      todo.isComplete ? "line-through" : ""
                    }`}
                    onDoubleClick={() => markAsEditing(todo.id)}
                  >
                    {todo.title}
                  </span>
                ) : (
                  <input
                    type="text"
                    onBlur={(event) => updateTodo(event, todo.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        updateTodo(event, todo.id);
                      } else if (event.key === "Escape") {
                        cancelEdit(todo.id);
                      }
                    }}
                    className="todo-item-input"
                    defaultValue={todo.title}
                    autoFocus
                  />
                )}
              </div>
              <button className="x-button" onClick={() => deleteTodo(todo.id)}>
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>3 items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
