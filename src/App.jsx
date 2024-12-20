import { useContext, useState } from "react";
import Filter from "./components/Filter";
import TodoItem from "./components/TodoItem";
import ThemeContext from "./context/ThemeContext";
import TodoHead from "./components/TodoHead";
import TodoForm from "./components/TodoForm";
import TodoInformation from "./components/TodoInformation";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const itemLeft = todos.filter((todo) => todo.done === false).length;
  const { theme, toogleTheme } = useContext(ThemeContext);

  function addTodo(newTodo) {
    setTodos((oldTodo) => [...oldTodo, newTodo]);
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
        <TodoHead toogleTheme={toogleTheme} />
        <TodoForm addTodo={addTodo} />
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

          <TodoInformation
            itemLeft={itemLeft}
            clearTodos={clearTodos}
            filter={filter}
            setFilter={setFilter}
          />
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
