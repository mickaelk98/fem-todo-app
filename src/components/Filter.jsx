import PropTypes from "prop-types";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

function Filter({ filter, setFilter, other }) {
  const { theme } = useContext(ThemeContext);
  return (
    <ul
      style={{
        background:
          theme === "dark"
            ? "var(--veryDarkDesaturatedBlue)"
            : "var(--veryLightGrayishBlue)",
        color:
          theme === "dark"
            ? "var(--darkGrayishBlue-dark)"
            : "var(--darkGrayishBlue)",
      }}
      className={`todo-filter ${other}`}
    >
      <li
        className={`${filter === "all" ? "filter" : ""} ${
          theme === "light" ? "filter-item-light" : ""
        }`}
        onClick={() => setFilter("all")}
      >
        All
      </li>
      <li
        className={`${filter === "active" ? "filter" : ""} ${
          theme === "light" ? "filter-item-light" : ""
        }`}
        onClick={() => setFilter("active")}
      >
        Active
      </li>
      <li
        className={`${filter === "completed" ? "filter" : ""} ${
          theme === "light" ? "filter-item-light" : ""
        }`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </li>
    </ul>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  other: PropTypes.string.isRequired,
};

export default Filter;
