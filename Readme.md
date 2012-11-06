# condense

[![Build Status](https://secure.travis-ci.org/Gozala/condense.png)](http://travis-ci.org/Gozala/condense)

This library is a manifestation against so much hated
`Array.prototype.slice.call(arguments)`. Library provides decorator function
that can be used to condense all the rest parameters of a function into a
last one:

```js
var condense = require("condense")
var apply = condense(function(f, params) {
  "use strict";
  return f.apply(f, params)
})
```

Which is basically an alternative to writing this:

```js
var apply = function(f) {
  "use strict";
  var params = Array.prototype.slice.call(arguments, 1)
  return f.apply(f, params)
}
```

Also desugared version of upcoming [rest parameters][] feature (that hopefully
will kill `arguments`):


```js
function apply(f, ...args) {
  "use strict";
  return f.apply(f, args)
}
```

Now install this library and never ever write
`Array.prototype.slice.call(arguments)` again! And yes it's slower but if it's
highly unlikely to be a bottlneck in you program and if it will turn out to
be you can always optimize by replacing back to you know what.


## Install

    npm install condense

[rest parameters]:http://wiki.ecmascript.org/doku.php?id=harmony:rest_parameters
