// Configure they API key for your Honeybadger project.
const HONEYBADGER_API_KEY = "change me";

const Honeybadger = require("@honeybadger-io/js");

Honeybadger.configure({
  reportData: true,
  apiKey: HONEYBADGER_API_KEY,
});

console.log("Loading function");

const handler = async function handler(event, context) {
  console.log("Event:", event);
  console.log("Context:", context);
  throw new Error("Something went wrong.");
  console.log("Shouldn't make it here.");
}

exports.handler = Honeybadger.lambdaHandler(handler);
