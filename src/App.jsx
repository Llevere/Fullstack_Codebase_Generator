import { useState } from "react";
import "./styles.css";
import getFrontendOptions from "./FrontendOptions/FrontendOptions.js";
import getBackendOptions from "./BackendOptions/BackendOptions.js";
import FeatureOptions from "./FeaturesOptions/FeaturesOptions.js";
import getDatabaseOptions from "./DatabaseOptions/DatabaseOptions.js";

import FeaturesOptions from "./FeaturesOptions/FeaturesOptions.js";
import { fetchAPI } from "./util/fetchAPI.js";

import { getBlob } from "./util/getBlobFromResponse.js";

export default function App() {
  const [frontend, setFrontend] = useState("");
  const [backend, setBackend] = useState("");
  const [features, setFeatures] = useState([]);
  const [database, setDatabase] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [canSubmit, setCanSubmit] = useState(false);
  //Checks to see if the user is on a mobile/tablet/desktop
  //const isDesktop = /Mobi|Android/i.test(navigator.userAgent);

  const handleFrontendChange = (event) => {
    setFrontend(event.target.value);

    setCanSubmit(backend.length);
  };

  const handleBackendChange = (event) => {
    setBackend(event.target.value);

    setCanSubmit(frontend.length);
  };

  const handleDatabaseChange = (event) => {
    setDatabase(event.target.value);

    setCanSubmit(frontend.length && backend.length);
  };

  const handleFeatureChange = (event) => {
    const { value, checked } = event.target;
    setFeatures((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );

    if (value.includes(FeaturesOptions.Options.DATABASE)) {
      if (checked) {
        setCanSubmit(false);
      } else {
        setDatabase("");
      }
    }
  };

  const handleClearSelection = () => {
    setFrontend("");
    setBackend("");
    setFeatures([]);
    setDatabase("");

    setCanSubmit(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const codebaseOptions = {
        Frontend: frontend,
        Backend: backend,
      };

      if (features.length > 0) {
        codebaseOptions.Features = features.map((feature) => {
          console.log("feature: " + feature);
          // const _featureKey = feature
          //   .replace(/ /g, "_") // Replace spaces with underscores
          //   .replace(/\//g, "") // Remove slashes
          //   .replace(/-/g, "_") // Remove hyphens
          //   .toLowerCase(); // Convert to lowercase

          // console.log("Key: " + _featureKey); // Debugging

          const featureObj = {};
          // Dynamically assign feature to correct object key based on transformed key
          featureObj[feature] = feature;
          return featureObj;
        });
      }

      if (database.length > 0) {
        const db = database.replace(/ /g, "");
        codebaseOptions.Database = { [db]: db };
      }
      try {
        const response = await fetchAPI(
          "https://localhost:7213/api/GenerateCodebase",
          "POST",
          codebaseOptions
        );
        getBlob(response);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <button className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <form className="box" onSubmit={handleSubmit}>
        <h2 className="select-stack">Select Stack</h2>
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

        <div className="section">
          <h3>Features</h3>
          {FeatureOptions.getFeatureOptions().map((feature) => (
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

        {features.includes(FeaturesOptions.Options.DATABASE) && (
          <div className="section">
            <h3>Select Database</h3>
            {getDatabaseOptions().map((db) => (
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

        <div className="buttons">
          <button
            className="clear-btn"
            onClick={handleClearSelection}
            type="button"
          >
            Clear Selection
          </button>
          <button className="submit-btn" type="submit" disabled={!canSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
