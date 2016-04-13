const Honeybadger = require('honeybadger');

Honeybadger.configure({
  // Change to your Honeybadger.io API key.
  apiKey: 'your api key'
});

console.log("Loading function");

// Your handler function.
function handler(event, context) {
  console.log("Event:", event);
  console.log("Context:", context);
  throw new Error("Something went wrong.");
  console.log("Shouldn't make it here.");
}

// Build and export the function.
exports.handler = Honeybadger.lambdaHandler(handler);
