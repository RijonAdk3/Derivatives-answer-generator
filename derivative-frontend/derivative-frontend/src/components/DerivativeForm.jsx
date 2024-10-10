import React, { useState } from 'react';
import axios from 'axios';

const DerivativeForm = () => {
  const [functionInput, setFunctionInput] = useState('');
  const [steps, setSteps] = useState([]);
  const [finalResult, setFinalResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSteps([]);
    setFinalResult('');

    try {
      // Send the input to the backend to calculate the derivative
      const response = await axios.post('http://localhost:5000/api/derivative', {
        functionInput,
      });

      // Display the steps and result from the backend response
      setSteps(response.data.steps);
      setFinalResult(response.data.finalResult);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div>
      <h2>Step-by-Step Derivative Calculator</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={functionInput}
          onChange={(e) => setFunctionInput(e.target.value)}
          placeholder="Enter function (e.g., x^2 + 3x)"
        />
        <button type="submit">Calculate Derivative</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {steps.length > 0 && (
        <div>
          <h3>Steps:</h3>
          {steps.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
          <h3>Final Result:</h3>
          <p>{finalResult}</p>
        </div>
      )}
    </div>
  );
};

export default DerivativeForm;
