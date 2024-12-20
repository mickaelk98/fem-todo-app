import PropTypes from "prop-types";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import sun from "../assets/images/icon-sun.svg";
import moon from "../assets/images/icon-moon.svg";

function TodoHead({ toogleTheme }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="head">
      <h1>Todo</h1>
      <img
        onClick={() => toogleTheme()}
        src={theme === "dark" ? sun : moon}
        alt="logo"
      />
    </div>
  );
}

TodoHead.propTypes = {
  toogleTheme: PropTypes.func.isRequired,
};

export default TodoHead;
