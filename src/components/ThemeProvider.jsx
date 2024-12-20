import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ThemeContext from "../context/ThemeContext";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  function toogleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  const toogleBg = () => {
    const bg = document.querySelector("#bg");
    const isMobile = window.innerWidth < 375;
    const deviceType = isMobile ? "mobile" : "desktop";
    const themeType = theme === "dark" ? "dark" : "light";

    bg.classList.remove(
      "bg-image-dark-mobile",
      "bg-image-light-mobile",
      "bg-image-dark-desktop",
      "bg-image-light-desktop"
    );
    document.body.classList.remove("bg-dark", "bg-light");

    bg.classList.add(`bg-image-${themeType}-${deviceType}`);
    document.body.classList.add(`${theme === "dark" ? "bg-dark" : "bg-light"}`);
  };

  useEffect(() => {
    toogleBg();
  });

  useEffect(() => {
    window.addEventListener("resize", toogleBg);

    return () => window.removeEventListener("resize", toogleBg());
  });

  return (
    <ThemeContext.Provider value={{ theme, toogleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
