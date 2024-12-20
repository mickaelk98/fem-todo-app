import PropTypes from "prop-types";
import check from "../assets/images/icon-check.svg";
import cross from "../assets/images/icon-cross.svg";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TodoItem({ todo, toogleTodo, deleteTodo, id }) {
  const { theme } = useContext(ThemeContext);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div
      key={todo.id}
      className="todo-item"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div>
        <div
          className={`circle ${
            theme === "dark" ? "item-circle-dark" : "item-circle-light"
          } ${todo.done ? "circle-done" : ""}`}
        >
          {todo.done && <img src={check} alt="check" />}
        </div>
        <p
          style={{
            color:
              theme === "dark"
                ? "var(--darkGrayishBlue-dark)"
                : "var(--veryDarkGrayishBlue)",
          }}
          className={todo.done ? "todo-done" : ""}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => toogleTodo(todo.id)}
        >
          {todo.text}
        </p>
      </div>
      <img
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => deleteTodo(todo.id)}
        src={cross}
        alt="cross"
      />
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
  toogleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default TodoItem;
