const express = require('express');
const { derivative, simplify, parse, compile } = require('mathjs');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

/**
 * Utility function to compute the derivative and steps
 * @param {string} functionInput The function provided by the user
 * @returns An object with steps and the final result
 */
const getDerivativeSteps = (functionInput) => {
  const steps = [];
  const x = 'x'; // Variable with respect to which the function is differentiated

  // Parse the input expression
  const expression = parse(functionInput);
  
  // Add the initial function step
  steps.push(`1. Original function: ${functionInput}`);

  // Compute the derivative
  const derivativeResult = derivative(expression, x).toString();

  // Add the derivative step
  steps.push(`2. Take the derivative: ${derivativeResult}`);

  // Simplify the result
  const simplifiedResult = simplify(derivativeResult).toString();
  
  // Add the simplified result step
  steps.push(`3. Simplify the result: ${simplifiedResult}`);

  // Return steps and final result
  return {
    steps,
    finalResult: simplifiedResult,
  };
};

// Route to calculate derivative with steps
app.post('/api/derivative', (req, res) => {
  const { functionInput } = req.body;

  try {
    // Compute the derivative and steps
    const result = getDerivativeSteps(functionInput);

    // Send back the steps and final result
    res.json({
      success: true,
      steps: result.steps,
      finalResult: result.finalResult,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error in function input. Please provide a valid mathematical expression.',
    });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
