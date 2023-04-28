# js-utils
## Utility methods in JavaScript language

### arrayToMap
Converts an array of objects into an object, using the value of the given property as key of the new object. Can receive a function to transform the new object values on the root level.

### assoc
Sets or overwites the given key(s) with the respective given value(s).

### assocIf
Sets or overwites the given key(s) with the respective given value(s), if the value is not null nor undefined.

### bind
Binds the given arguments to the given function, using the function as context.

### compose
Performs right-to-left composition of the given functions.

### constantly
Returns a function that always returns the given value.

### dissoc
Deletes the given property(ies) of the given object.

### evolve
Executes the functions of the given evolution map, on the values of the given object.

### evolveAll
Executes the given transformation function in every value of the given item that is not an array nor an object, if the value passes the given filter function. Iterate on arrays and objects, and dive deep into nested objects, to repeat the logic into deep level values.

### filterSelect
Returns a new object with the given keys and respective values of the given object, if the found value passes the given filter function.

### get
Returns the value of the given key, or dive deep into the given keys to return the respective value.

### invokeAndBypass
Invokes the given function with the given value, and after returns the same value.

### isIn
Checks if the given value is present on the given list.

### merge
Merges one object into another, setting new keys and overwriting already existing ones, on root and deep levels.

### pipe
Performs left-to-right composition of the given functions.

### select
Returns a new object with the given keys and respective values of the given object.

### typeOf
Returns the type of the given value.