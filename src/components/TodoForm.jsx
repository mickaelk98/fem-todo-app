import PropTypes from "prop-types";
import { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");
  const { theme } = useContext(ThemeContext);

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: crypto.randomUUID(),
      text: value,
      done: false,
    };
    addTodo(newTodo);
    setValue("");
  }

  return (
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
  );
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoForm;
