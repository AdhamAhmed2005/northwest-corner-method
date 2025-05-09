import { useState } from "react";
import RowColumnSelect from "./components/rowColumnSelect";
import Table from "./components/table";
import "./styles/app.css";

function App() {
  const [rows, setRows] = useState(2);
  const [columns, setColumns] = useState(2);

  return (
    <div className="container">
      <h1>Transportation Problem Solver</h1>
      <h2>Using the Northwest Method</h2>
      <RowColumnSelect
        changeRows={(value) => setRows(parseInt(value) || 1)}
        changeColumns={(value) => setColumns(parseInt(value) || 1)}
      />
      <Table rows={rows} columns={columns} />
    </div>
  );
}

export default App;