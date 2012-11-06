"use strict";

var condense = require("../condense")

exports["test more arguments"] = function(assert) {
  var sum = condense(function(a, b, rest) {
    return a + b + rest.reduce(function(a, b) {
      return a + b
    }, 0)
  })

  assert.equal(sum(1, 2), 3, "works with two args")
  assert.equal(sum(1, 2, 3), 6, "works with variadic args")
}

exports["test all condense"] = function(assert) {
  var f = condense(function(rest) {
    return rest
  })

  assert.deepEqual(f(), [], "works with no args")
  assert.deepEqual(f(1, 2, 3), [1, 2, 3], "works multiple args")
}

exports["test nothing to condense"] = function(assert) {
  var f = condense(function(a, b, rest) {
    return [a, b, rest]
  })

  assert.deepEqual(f(), [void(0), void(0), []], "no args -> rest is empty")
  assert.deepEqual(f(1), [1, void(0), []], "one args -> rest is empty")
  assert.deepEqual(f(1, 2), [1, 2, []], "two args -> rest is empty")
  assert.deepEqual(f(1, 2, 3), [1, 2, [3]], "three args -> rest captures third")
  assert.deepEqual(f(1, 2, 3, 4, 5, 6, 7, 8, 9, 0),
                   [1, 2, [3, 4, 5, 6, 7, 8, 9, 0]],
                   "if many rest is condensed")
}

require("test").run(exports)
