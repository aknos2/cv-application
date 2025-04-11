import React from "react";
import Button from "./Button";
import { useState, useEffect } from "react";

export default function Header({ onPreviewCV, showPreviewButton = true }) {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkTheme);
  }, [darkTheme]);

  const toggleDarkTheme = (e) => {
    e.preventDefault();
    setDarkTheme((prev) => !prev);
  };

  return (
    <header>
      <div className="header-wrap">
        <h1>Job Application Form</h1>
        <div className="header-links">
          {showPreviewButton ? (
            <Button
              onClick={onPreviewCV}
              className="preview-btn"
              text="Preview CV"
            />
          ) : (
            <h2>Preview mode</h2>
          )}
          <Button
            text={darkTheme ? "Light Mode" : "Dark Mode"}
            onClick={toggleDarkTheme}
            aria-label="Toggle dark mode"
            className="theme-toggle-btn"
          />
        </div>
      </div>
    </header>
  );
}
