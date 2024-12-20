import { useContext, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
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

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTodos((prevTodo) => {
        const oldIndex = prevTodo.findIndex((todo) => todo.id === active.id);
        const newIndex = prevTodo.findIndex((todo) => todo.id === over.id);
        return arrayMove(prevTodo, oldIndex, newIndex);
      });
    }
  };

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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToParentElement]}
          >
            <SortableContext
              items={todos}
              strategy={verticalListSortingStrategy}
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
                      id={todo.id}
                      todo={todo}
                      toogleTodo={toogleTodo}
                      deleteTodo={deleteTodo}
                    />
                  ))}
            </SortableContext>
          </DndContext>

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
