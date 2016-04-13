var assert = require("assert")
var nock = require("nock")

var errorHandler = require("../error_handler")
var sampleEvent = require("./sample_event.json")

describe("errorHandler", function() {
  it("should notify Honeybadger of exceptions", function(done) {
    var api = nock("https://api.honeybadger.io")
      .post("/v1/notices")
      .reply(201, '{"id":"1a327bf6-e17a-40c1-ad79-404ea1489c7a"}')

    var context = {
      succeed: function() {
        done("should never succeed.");
      },
      fail: function(err) {
        api.done();
        done();
      }
    };

    var handler = errorHandler(function() {
      throw new Error("Badgers!");
    }, 'fake api key');

    handler(sampleEvent, context);
  });

  it("should notify Honeybadger of async exceptions", function(done) {
    var api = nock("https://api.honeybadger.io")
      .post("/v1/notices")
      .reply(201, '{"id":"1a327bf6-e17a-40c1-ad79-404ea1489c7a"}')

    var context = {
      succeed: function() {
        done("should never succeed.");
      },
      fail: function(err) {
        api.done();
        done();
      }
    };

    var handler = errorHandler(function() {
      setTimeout(function() {
        throw new Error("Badgers!");
      }, 0);
    }, 'fake api key');

    handler(sampleEvent, context);
  });
});
