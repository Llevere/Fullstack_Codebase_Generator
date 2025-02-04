import { useState } from "react";
import "./styles.css";
import getFrontendOptions from "./FrontendOptions/FrontendOptions.js";
import getBackendOptions from "./BackendOptions/BackendOptions.js";
import FeatureOptions from "./FeaturesOptions/FeaturesOptions.js";
import getDatabaseOptions from "./DatabaseOptions/DatabaseOptions.js";
import getCICDOptions from "./CICD_Options/CicdOptions.js";

import { FeaturesOptions } from "./FeaturesOptions/FeaturesOptions.js";
import { fetchAPI } from "./util/fetchAPI.js";

export default function App() {
  const [frontend, setFrontend] = useState("");
  const [backend, setBackend] = useState("");
  const [features, setFeatures] = useState([]);
  const [database, setDatabase] = useState("");
  const [cicd, setCicd] = useState("");
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

  const handleCICDChange = (event) => {
    setCicd(event.target.value);

    // Check if the frontend and backend are selected
    const baseOptions = frontend.length && backend.length;

    // Validate if the selected database exists in the FeatureOptions
    const isValidDatabase =
      database.length && FeatureOptions.databases.includes(database);

    // Set canSubmit to true if both frontend, backend, and a valid database (if applicable) are selected
    setCanSubmit(baseOptions && isValidDatabase);
  };

  const handleFeatureChange = (event) => {
    const { value, checked } = event.target;
    setFeatures((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );

    if (value.includes(FeaturesOptions.DATABASE)) {
      if (checked) {
        //User clicked on DB feature, only set to true when they select a DB option
        setCanSubmit(false);
      } else {
        //User unchecked DB
        setDatabase("");
      }
    }

    if (value.includes(FeaturesOptions.CICD)) {
      if (checked) {
        //User clicked on CICD feature, only set to true when they select a CICD option
        setCanSubmit(false);
      } else {
        //User unchecked CICD
        setCicd("");
      }
    }
  };

  const handleClearSelection = () => {
    setFrontend("");
    setBackend("");
    setFeatures([]);
    setDatabase("");
    setCicd("");

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
          // Replace ' ', '/', and '-' in the feature key to form the key name for the object
          const _featureKey = feature
            // .replace(/ /g, "")
            .replace(/\//g, "");
          console.log(_featureKey);

          const featureObj = {};
          // Dynamically assign feature to correct object key based on transformed key
          featureObj[_featureKey] = _featureKey;
          return featureObj;
        });
      }

      if (database.length > 0) {
        const db = database.replace(/ /g, "");
        codebaseOptions.Database = { [db]: db };
      }
      if (cicd.length > 0) {
        const _cicd = cicd.replace(/ /g, "").replace(/\//g, "");
        codebaseOptions.CICD = {
          [_cicd]: _cicd,
        };
      }

      await fetchAPI(
        "https://localhost:7213/api/GenerateCodebase",
        "POST",
        codebaseOptions
      );
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

        {features.includes(FeaturesOptions.DATABASE) && (
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

        {features.includes(FeaturesOptions.CICD) && (
          <div className="section">
            <h3>Select CI/CD Method</h3>
            {getCICDOptions().map((method) => (
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
