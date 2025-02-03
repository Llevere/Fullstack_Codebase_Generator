import { useState, useEffect } from "react";
import "./styles.css";
import getFrontendOptions from "./Frontend/FrontendOptions.js";
import getBackendOptions from "./Backend/BackendOptions.js";
import getFeatureOptions from "./Features/FeaturesOptions.js";
export default function App() {
  const [frontend, setFrontend] = useState("");
  const [backend, setBackend] = useState("");
  const [features, setFeatures] = useState([]);
  const [database, setDatabase] = useState("");
  const [cicd, setCicd] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [allCheckBoxesFilled, setAllCheckBoxesFilled] = useState(true);

  const [isDesktop, setIsDesktop] = useState("");

  useEffect(() => {
    console.log(navigator.mediaDevices, navigator.userAgent);

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    console.log(isMobile ? "Mobile/Tablet" : "Desktop");
    setIsDesktop(isMobile ? "Mobile/Tablet" : "Desktop");
  }, [frontend, backend, features, darkMode]);

  const handleFrontendChange = (event) => {
    setFrontend(event.target.value);

    //Set to true if at least 1 box is checked in each section
    setAllCheckBoxesFilled(!(backend.length > 0 && features.length > 0));
  };

  const handleBackendChange = (event) => {
    setBackend(event.target.value);

    //Set to true if at least 1 box is checked in each section
    setAllCheckBoxesFilled(!(frontend.length > 0 && features.length > 0));
  };

  const handleDatabaseChange = (event) => {
    setDatabase(event.target.value);
  };

  const handleCICDChange = (event) => {
    setCicd(event.target.value);
  };

  const handleFeatureChange = (event) => {
    const { value, checked } = event.target;
    setFeatures((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleClearSelection = () => {
    setFrontend("");
    setBackend("");
    setFeatures([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(frontend, backend, features.join(", "));
  };

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <button className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <form className="box" onSubmit={() => handleSubmit()}>
        <h2>Select Stack</h2>
        <p>{isDesktop}</p>
        {/* Frontend Section */}
        <div className="section">
          <h3>Frontend</h3>
          {getFrontendOptions().map((tech) => (
            <label key={tech}>
              <input
                type="radio"
                name="frontend"
                value={tech}
                checked={frontend === tech}
                onChange={handleFrontendChange}
              />
              {tech}
            </label>
          ))}
        </div>

        {/* Backend Section */}
        <div className="section">
          <h3>Backend</h3>
          {getBackendOptions().map((tech) => (
            <label key={tech}>
              <input
                type="radio"
                name="backend"
                value={tech}
                checked={backend === tech}
                onChange={handleBackendChange}
              />
              {tech}
            </label>
          ))}
        </div>

        {/* Features Section */}
        <div className="section">
          <h3>Features</h3>
          {getFeatureOptions().map((feature) => (
            <label key={feature}>
              <input
                type="checkbox"
                value={feature}
                checked={features.includes(feature)}
                onChange={handleFeatureChange}
              />
              {feature}
            </label>
          ))}
        </div>

        {/* Database Selection (Only if Database ORM is checked) */}
        {features.includes("Database ORM") && (
          <div className="section">
            <h3>Select Database</h3>
            {["MySQL", "PostgreSQL", "MongoDB", "SQLite"].map((db) => (
              <label key={db}>
                <input
                  type="radio"
                  name="database"
                  value={db}
                  checked={database === db}
                  onChange={handleDatabaseChange}
                />
                {db}
              </label>
            ))}
          </div>
        )}

        {/* CI/CD Selection (Only if CI/CD Integration is checked) */}
        {features.includes("CI/CD Integration") && (
          <div className="section">
            <h3>Select CI/CD Method</h3>
            {["GitHub Actions", "Jenkins", "GitLab CI/CD", "CircleCI"].map(
              (method) => (
                <label key={method}>
                  <input
                    type="radio"
                    name="cicd"
                    value={method}
                    checked={cicd === method}
                    onChange={handleCICDChange}
                  />
                  {method}
                </label>
              )
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="buttons">
          <button className="clear-btn" onClick={handleClearSelection}>
            Clear Selection
          </button>
          <button
            className="submit-btn"
            type="submit"
            disabled={allCheckBoxesFilled}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
