import Table from "react-bootstrap/Table";
import { useState } from "react";
import "../styles/table.css";

function ResponsiveExample(props) {
  const [unitPrice, setUnitPrice] = useState({});
  const [number, setNumber] = useState({});
  const [columnInputs, setColumnInputs] = useState({});
  const [rowInputs, setRowInputs] = useState({});
  const [optimalSolution, setOptimalSolution] = useState(null);
  const [steps, setSteps] = useState([])

  const rows = props.rows || 1;
  const columns = props.columns || 1;

  function northWest() {
    let rowSupply = Array.from({ length: rows }, (_, i) => parseInt(rowInputs[i], 10) || 0);
    let columnDemand = Array.from({ length: columns }, (_, i) => parseInt(columnInputs[i], 10) || 0);

    const totalSupply = rowSupply.reduce((sum, num) => sum + num, 0);
    const totalDemand = columnDemand.reduce((sum, num) => sum + num, 0);

    if (totalSupply !== totalDemand) {
      alert("⚠️ Total supply does not match total demand.");
      return;
    }

    let currentRow = 0;
    let currentColumn = 0;
    let totalCost = 0;
	let stepsStr = [];

    while (currentRow < rowSupply.length && currentColumn < columnDemand.length) {
      const supply = rowSupply[currentRow];
      const demand = columnDemand[currentColumn];
      const allocation = Math.min(supply, demand);

      handleCenterInputChange(currentRow, currentColumn, allocation);

      const unit = parseFloat(unitPrice[`${currentRow}-${currentColumn}`]) || 0;
      totalCost += unit * allocation;
	
	  stepsStr.push(`Move ${allocation} Products From Supply ${currentRow + 1} To Consumer ${currentColumn + 1}`)
	  

      rowSupply[currentRow] -= allocation;
      columnDemand[currentColumn] -= allocation;

      if (rowSupply[currentRow] === 0 && columnDemand[currentColumn] === 0) {
        currentRow++;
        currentColumn++;
      } else if (rowSupply[currentRow] === 0) {
        currentRow++;
      } else {
        currentColumn++;
      }
    }

    setOptimalSolution(totalCost);
	setSteps(stepsStr)
  }

  const handleCornerInputChange = (rowIndex, colIndex, value) => {
    setUnitPrice((prev) => ({
      ...prev,
      [`${rowIndex}-${colIndex}`]: value,
    }));
  };

  const handleCenterInputChange = (rowIndex, colIndex, value) => {
    setNumber((prev) => ({
      ...prev,
      [`${rowIndex}-${colIndex}`]: value,
    }));
  };

  const handleColumnInputChange = (colIndex, value) => {
    setColumnInputs((prev) => ({
      ...prev,
      [colIndex]: value,
    }));
  };

  const handleRowInputChange = (rowIndex, value) => {
    setRowInputs((prev) => ({
      ...prev,
      [rowIndex]: value, // Use rowIndex here
    }));
  };

  return (
    <div className="container">
      <div className="table-responsive">
        <Table bordered variant="dark" className="table">
          <thead>
            <tr>
              <th className="no-border"></th>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <th key={colIndex}>
                  <input
                    type="number"
                    onChange={(e) => handleColumnInputChange(colIndex, e.target.value)}
                    value={columnInputs[colIndex] || ""}
                    className="column-input"
                    placeholder={`Dest ${colIndex + 1}`}
                    min="0"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td className="no-border">
                  <input
                    type="number"
                    onChange={(e) => handleRowInputChange(rowIndex, e.target.value)}
                    value={rowInputs[rowIndex] || ""}
                    className="row-input"
                    placeholder={`Source ${rowIndex + 1}`}
                    min="0"
                  />
                </td>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="table-cell">
                    <input
                      type="number"
                      onChange={(e) => handleCornerInputChange(rowIndex, colIndex, e.target.value)}
                      value={unitPrice[`${rowIndex}-${colIndex}`] || ""}
                      className="corner-input"
                      placeholder={`C${rowIndex + 1}${colIndex + 1}`}
                      min="0"
                    />
                    <input
                      type="number"
                      onChange={(e) => handleCenterInputChange(rowIndex, colIndex, e.target.value)}
                      value={number[`${rowIndex}-${colIndex}`] || ""}
                      className="center-input"
                      placeholder={`X${rowIndex + 1}${colIndex + 1}`}
                      min="0"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="button-container">
        <button className="btn btn-success" onClick={northWest}>
          Calculate Solution
        </button>
      </div>

      {optimalSolution !== null && (
        <div className="text-center">
          <div className="solution-alert">
            <strong>Feasible Solution:</strong> {optimalSolution}
			<hr/>
			<div>
		  {steps.map((step, index) => {
			return (
				<div key={index}>{step}</div> // Wrap step in a valid JSX element
			)
		  })}
		  </div>
          </div>
		  
        </div>
      )}
    </div>
  );
}

export default ResponsiveExample;