import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/bfhl",
        JSON.parse(jsonInput)
      );

      setResponse(res.data);
    } catch (error) {
      console.error("Error in API call", error);
    }
  };

  const handleFilterChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFilter(value);
  };

  const filteredResponse = () => {
    if (!response) return null;
    let result = {};
    if (filter.includes("Numbers")) result.numbers = response.numbers;
    if (filter.includes("Alphabets")) result.alphabets = response.alphabets;
    if (filter.includes("Highest Lowercase Alphabet"))
      result.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    return result;
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON here"
      />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <div>
          <select multiple={true} onChange={handleFilterChange}>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest Lowercase Alphabet">
              Highest Lowercase Alphabet
            </option>
          </select>

          <div>
            <h2>Filtered Response</h2>
            <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
