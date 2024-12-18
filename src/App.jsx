import { useState } from "react";
import Filter from "./components/Filter";
import logo from "./assets/images/icon-sun.svg";
import TodoItem from "./components/TodoItem";
function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("all");
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

  function clearTodos() {
    setTodos([]);
  }

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
            todos
              .filter((todo) => {
                switch (filter) {
                  case "all":
                    return true;
                  case "active":
                    return !todo.done;
                  case "completed":
                    return todo.done;
                }
              })
              .map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toogleTodo={toogleTodo}
                  deleteTodo={deleteTodo}
                />
              ))}

          <div>
            <p>{itemLeft} items left</p>
            <p onClick={() => clearTodos()}>Clear Completed</p>
          </div>
        </div>
        <Filter filter={filter} setFilter={setFilter} />
        <p className="dndText">Drag and drop to reorder list</p>
      </div>
    </main>
  );
}
export default App;
