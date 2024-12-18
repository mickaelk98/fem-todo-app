import logo from "./assets/images/icon-sun.svg";
import cross from "./assets/images/icon-cross.svg";
import check from "./assets/images/icon-check.svg";
import { useState } from "react";
function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

  const itemLeft = todos.filter((todo) => todo.done === false).length;

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: crypto.randomUUID(),
      text: value,
      done: false,
    };
    setTodos((oldTodo) => [...oldTodo, newTodo]);
    setValue("");
  }

  function deleteTodo(todoId) {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  }

  function toogleTodo(todoId) {
    const newTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, done: !todo.done } : todo
    );
    setTodos(newTodos);
  }

  console.log("todos :", todos);

  return (
    <main className="main">
      <div className="container">
        <div className="head">
          <h1>Todo</h1>
          <img src={logo} alt="logo" />
        </div>
        <form className="add-todo" action="" onSubmit={handleSubmit}>
          <div className="circle"></div>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Create new todo..."
          />
        </form>
        <div className="todo-container">
          {todos.length > 0 &&
            todos.map((todo) => (
              <div key={todo.id} className="todo-item">
                <div>
                  <div
                    className={`circle item-circle ${
                      todo.done ? "circle-done" : ""
                    }`}
                  >
                    {todo.done && <img src={check} alt="check" />}
                  </div>
                  <p
                    className={todo.done ? "todo-done" : ""}
                    onClick={() => toogleTodo(todo.id)}
                  >
                    {todo.text}
                  </p>
                </div>
                <img
                  onClick={() => deleteTodo(todo.id)}
                  src={cross}
                  alt="cross"
                />
              </div>
            ))}

          <div>
            <p>{itemLeft} items left</p>
            <p>Clear Completed</p>
          </div>
        </div>
        <ul className="todo-filter">
          <li>All</li>
          <li>Active</li>
          <li>Completed</li>
        </ul>
        <p className="dndText">Drag and drop to reorder list</p>
      </div>
    </main>
  );
}
export default App;
