console.log("Loading function");


// Change to your Honeybadger.io API key.
const HB_API_KEY = 'your api key';

// Your handler function.
function handler(event, context) {
  console.log("Event:", event);
  console.log("Context:", context);
  throw new Error("Something went wrong.");
  console.log("Shouldn't make it here.");
}


// Takes a handler function and returns a new function which reports errors to
// Honeybadger.
function makeHandler(handler) {
  var Honeybadger = require("honeybadger"),
      Promise = require("promise");

  var hb = new Honeybadger({
    apiKey: HB_API_KEY,
    logger: console
  });

  var send = function(err, opts) {
    return new Promise(function(resolve, reject) {
      hb.once("error", reject).
         once("remoteError", reject).
         once("sent", resolve);
      hb.send(err, opts);
    });
  };

  return function(event, context) {
    try {
      handler.apply(this, arguments);
    } catch(err) {
      send(err, { context: { event: event } }).then(function() {
        context.fail(err);
      }).catch(function(sendErr) {
        console.error("Unable to report error to Honeybadger:", sendErr)
        context.fail(err);
      });
    }
  }
}

// Build and export the function.
exports.handler = makeHandler(handler);
