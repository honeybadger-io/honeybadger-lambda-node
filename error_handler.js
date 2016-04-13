const Honeybadger = require("honeybadger"),
      Promise = require("promise");

// Takes a handler function and returns a new function which reports errors to
// Honeybadger.
function makeHandler(handler, api_key) {
  const hb = new Honeybadger({
    apiKey: api_key,
    logger: console
  });

  function send(err, opts) {
    return new Promise(function(resolve, reject) {
      hb.once("error", reject).
        once("remoteError", reject).
        once("sent", resolve);
      hb.send(err, opts);
    });
  }

  return function errorHandler(event, context) {
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

module.exports = makeHandler;
