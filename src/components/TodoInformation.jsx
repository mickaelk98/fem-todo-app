import PropTypes from "prop-types";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import Filter from "./Filter";

function TodoInformation({ itemLeft, clearTodos, filter, setFilter }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        color:
          theme === "dark"
            ? "var(--darkGrayishBlue-dark)"
            : "var(--darkGrayishBlue)",
      }}
      className="todo-filter-content"
    >
      <p className={`${theme === "light" ? "todo-filter-content-light" : ""}`}>
        {itemLeft} items left
      </p>
      <Filter filter={filter} setFilter={setFilter} other={"tabletPc"} />
      <p
        className={`${theme === "light" ? "todo-filter-content-light" : ""}`}
        onClick={() => clearTodos()}
      >
        Clear Completed
      </p>
    </div>
  );
}

TodoInformation.propTypes = {
  clearTodos: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  itemLeft: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
};

export default TodoInformation;
