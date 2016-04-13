var assert = require("assert")
var nock = require("nock")

var index = require("../index")
var sampleEvent = require("./sample_event.json")

describe("logplex", function() {
  describe("#handler()", function() {
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

      index.handler(sampleEvent, context);
    });
  });
});
