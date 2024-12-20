import { useContext, useState } from "react";
import Filter from "./components/Filter";
import sun from "./assets/images/icon-sun.svg";
import moon from "./assets/images/icon-moon.svg";
import TodoItem from "./components/TodoItem";
import ThemeContext from "./context/ThemeContext";
function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("all");
  const itemLeft = todos.filter((todo) => todo.done === false).length;
  const { theme, toogleTheme } = useContext(ThemeContext);

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
          <img
            onClick={() => toogleTheme()}
            src={theme === "dark" ? sun : moon}
            alt="logo"
          />
        </div>
        <form
          style={{
            background:
              theme === "dark"
                ? "var(--veryDarkDesaturatedBlue)"
                : "var(--veryLightGrayishBlue)",
          }}
          className="add-todo"
          action=""
          onSubmit={handleSubmit}
        >
          <div className="circle"></div>
          <input
            style={{
              color:
                theme === "dark"
                  ? "var(--darkGrayishBlue-dark)"
                  : "var(--veryDarkGrayishBlue)",
            }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Create new todo..."
          />
        </form>
        <div
          style={{
            background:
              theme === "dark"
                ? "var(--veryDarkDesaturatedBlue)"
                : "var(--veryLightGrayishBlue)",
          }}
          className={`todo-container ${
            theme === "dark" ? "dark-shadow" : "light-shadow"
          }`}
        >
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

          <div
            style={{
              color:
                theme === "dark"
                  ? "var(--darkGrayishBlue-dark)"
                  : "var(--darkGrayishBlue)",
            }}
            className="todo-filter-content"
          >
            <p
              className={`${
                theme === "light" ? "todo-filter-content-light" : ""
              }`}
            >
              {itemLeft} items left
            </p>
            <Filter filter={filter} setFilter={setFilter} other={"tabletPc"} />
            <p
              className={`${
                theme === "light" ? "todo-filter-content-light" : ""
              }`}
              onClick={() => clearTodos()}
            >
              Clear Completed
            </p>
          </div>
        </div>
        <Filter
          filter={filter}
          setFilter={setFilter}
          other={`mobile ${theme === "dark" ? "dark-shadow" : "light-shadow"}`}
        />
        <p
          style={{
            color:
              theme === "dark"
                ? "var(--darkGrayishBlue-dark)"
                : "var(--veryDarkGrayishBlue)",
          }}
          className="dndText"
        >
          Drag and drop to reorder list
        </p>
      </div>
    </main>
  );
}
export default App;
