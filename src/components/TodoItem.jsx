import PropTypes from "prop-types";
import check from "../assets/images/icon-check.svg";
import cross from "../assets/images/icon-cross.svg";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

function TodoItem({ todo, toogleTodo, deleteTodo }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div key={todo.id} className="todo-item">
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
          onClick={() => toogleTodo(todo.id)}
        >
          {todo.text}
        </p>
      </div>
      <img onClick={() => deleteTodo(todo.id)} src={cross} alt="cross" />
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
};

export default TodoItem;
