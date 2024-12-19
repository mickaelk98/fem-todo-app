import PropTypes from "prop-types";

function Filter({ filter, setFilter, device }) {
  return (
    <ul className={`todo-filter ${device}`}>
      <li
        className={filter === "all" ? "filter" : ""}
        onClick={() => setFilter("all")}
      >
        All
      </li>
      <li
        className={filter === "active" ? "filter" : ""}
        onClick={() => setFilter("active")}
      >
        Active
      </li>
      <li
        className={filter === "completed" ? "filter" : ""}
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
  device: PropTypes.string.isRequired,
};

export default Filter;
