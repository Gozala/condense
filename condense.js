"use strict";

var slicer = Array.prototype.slice

module.exports = condense
function condense(f) {
  /**
  Decorator function can be used to condense rest arguments into a last
  argument of the function.

      var foo = condense(function(a, b, rest) {
        Array.isArray(rest) // => true
        // ...
      })

  This is basically an alternative to:

      var foo = function(a, b) {
        var rest = Array.prototype.slice.call(arguments, 2)
        Array.isArray(rest) // => true
        // ...
      }
  **/
  var position = f.length - 1
  return function condensed() {
    // Make array of arguments
    var args = slicer.call(arguments, 0)
    // Condense rest arguments into last one.
    args[position] = args.slice(position)
    // Delegate to a wrapped function.
    return f.apply(this, args)
  }
}
