import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ThemeContext from "../context/ThemeContext";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toogleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  const toogleBg = () => {
    const isMobile = window.innerWidth < 375;
    const deviceType = isMobile ? "mobile" : "desktop";
    const themeType = theme === "dark" ? "dark" : "light";

    // Supprimer toutes les classes possibles
    document.body.classList.remove(
      "body-bg-dark-mobile",
      "body-bg-light-mobile",
      "body-bg-dark-desktop",
      "body-bg-light-desktop"
    );

    // Ajouter uniquement la classe correspondante
    document.body.classList.add(`body-bg-${themeType}-${deviceType}`);
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
