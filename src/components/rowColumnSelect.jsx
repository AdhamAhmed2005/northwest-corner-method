import { useState } from "react";
import "../styles/rowColumnSelect.css";

export default (props) => {
  const [rowNum, setRowNum] = useState("");
  const [colNum, setColNum] = useState("");

  return (
    <div className="input-container">
      <label htmlFor="row-input" className="label">
        Number of Sources
      </label>
      <input
        id="row-input"
        type="number"
        className="input"
        value={rowNum}
        autoFocus
        placeholder="Enter number of sources"
        min="1"
        onChange={(e) => {
          const value = e.target.value;
          setRowNum(value);
          props.changeRows(value);
        }}
      />

      <label htmlFor="column-input" className="label">
        Number of Destinations
      </label>
      <input
        id="column-input"
        type="number"
        className="input"
        value={colNum}
        placeholder="Enter number of destinations"
        min="1"
        onChange={(e) => {
          const value = e.target.value;
          setColNum(value);
          props.changeColumns(value);
        }}
      />
    </div>
  );
};