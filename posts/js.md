---
title: Javascript
description: Reference notes on the js language
date: 2023-06-01
tags:
  - js
  - ecmascript
---
`Colt Steele: Modern Javascript` `Javascript tips from all over`

# Introduction

- ECMAScript, TC39
- Specification not implementation
- Browser compatibility - "Can I use" website


## Primitive Types

- Number, String, Boolean, Null and Undefined.
- typeof - check type of variable.
- String
  - strings are immutable.
  - indexed, zero indexed.
  - has a property called length.
  - string methods, .toUppercase(), .trim()
  - an chain methods, .trim().toUppercase()
  - some methods accept arguments, item.slice(), item.indexOf("args"), item.replace()

- Escape characters
- Template Literals use `You owe me ${9+0}`
- Null - intentional absence of value.
- Undefined - not intentional but absent still.
- Math object: math.random(), math.round(9.8), math.pow(), math.floor().
- parseInt(), parseFloat()
- NaN
 
## Variables

- store a value and give it a name.
- *let* 
- *const* - can't change value once declared.
- cannot redclare once declared.
- *var* - old way to declare.

```js

let hens = 72;

hens = heans + 1;

//also use unary operator
hens++;

//will not work due to redeclaration.
let hens = true;

//check lenght of string type
let checkmate = "Hii imeenda!";

checkmate.length

//positional access
checkmate[9]
 
const maigpies = 90;

```


## Program Logic

- Comparisons: 
 - { >, <, >=, <=, ==, !=} get boolean result.
 - Unicode characters.
 - ==, equality without caring about type of values.
 - *===, checks equality of value and type.

- Conditionals
 - if (sth here){this happens};
 - if (first condition), else if (other conditions){other thing happens}
 - else (when nothing else matches)
 - Nesting: one can nest conditionals.
 - Switching
 - Ternary operator.

- Truthy and Falsy value
 - all values ahave an inherent truthy or falsy boolean value.
 - falsy values: false, 0, empty string " ", null, undefined, NaN.

- Logical operators
 - AND: && : both sides must be true.
 - OR: || : either must be true. 
 - NOT: ! : opposite
 - operator precedence: NOT, AND, OR
 

````js

let rating = 2;

if (rating === 3) {
 console.log('You are a superstar!!');
}
else if (rating === 2) {
 console.log('Meets expectations!!');
}
//if nothing above ran
else {
 console.log('We tried though right!')
}

//switching

let day = 4;

switch (day) {
 case 1: 
   console.log("Monday");
   break;
 case 2: 
   console.log("Tuesday");
   break;
 case 3: 
   console.log("Wednesday");
   break;
 default:
   console.log("Try again!")

//ternary operator
condition ? expIfTrue: expIfFalse

```` 


## Arrays

- ordered collection of values
- also indexed like strings, 
- are mutable.
- can nest arrays in arrays

### Array Methods

- array.push(sth here). //add to end. mutates the array
- array.pop() //removes last item and returns it to you, mutates too
- array.unshift() //add to the beginning
- array.shift() //removes first el. returns it.
- array.concat(arr2) //merge arrays
- array.includes(item) //returns boolean
- array.indexOf() //returns index, -1 if not found
- array.join() // returns a single string of el. can join with . , #
- array.reverse() //reverse and array inplace
- array.slice(2,5) //returns part of array as specified. exclude upper limit
- array.splice(start, deletecount, replacement) //remove, replace array el's
- array.sort() //inplace sort by utf-8 string codes, pass compare functions


### Reference types

- Value type variable
 - strings

- Reference type variable 
 - arrays
 - const declaration can change contents not reference
 - objects

// compare a current assignment on new assignment trial???


````js
 
let shoppingList = ['cereal', 'mukimo', 'chocolate'];


//indexed
shoppingList[1]

//mutable
shoppingList[1] = "pumpkin";
````

## Objects

- collections of properties.   
- properties are a key-value pair.
- access data using keys rather than index
- {} - object literal
- nest objects too like arrays
- object equality, tied to reference location, hence not equal.


````js

const fitBitData = {
 totalMiles: 90,
 location: 'POPO',
 time: '3.3'
}

//access data out of object.
fitBitData.time

fitBitData['time']

//can load objects using same syntax

fitBitData['lunar'] = 'leo';

````

## Loops

- doing things repeatedly
- for(init: condition to run: operation: ){sth}
- 

````js

for (let i = 1; i<=10; i++ ){
 console.log('Hello', i)

}

````

- Loop over array, string using length as the index.
- Can nest loops 

- While loop
- ideal for checking against a certain condition.

```js

let j = 0;
while (j < 10) {
 console.log(j)

}

```

- for..of
- cleaner version of for loop
- Objects are ot iterable by default so need to access the Object.keys(objectname) to make it iterable.

- for..in
- loop over properties of an object

## Functions

- reusable procedures, modularise code.
- function statement
- can nest functions inside other functions

```js

function fname(){
 

}
fname()

const fname = function(){
 

}
```
- arguments vs parameters
- return statement, functions do not automatically have a return  value unless explicitly declared as a return value.
- return statement halt execution of a function.

- Function scope
- let/const and var have different scoping rules.
- lexical scope
- function expressions since functions are objects too.
- Higher order functions
 - functions that operate on other functions, accept functions as arguments and also return values
- Callback functions
 - function passed into another function as an argument, which is then invoked inside the outer function.
 - used commonly with anonymous functions
- Hoisting
 - let/const(does not) vs var(does) behaviour.
 - function declarations are hoisted vs function expressions are not.

### Array Callback Functions

- For...each
  - passed function is called for each element in the array.
- Map
  - creates a new array with the results of calling a callback on every element in the array  
- Find
  - finds and retrieves value of first result that matches provided testing function
- Filter
  - creates a new array with all elements that pass test implemented by passed function.
- Every
  - tests whether all elements in array pass the provided function, returns boolean value.
- Some
  - tests whethe any of the elements in array passes the provided function, also returns boolean.
- Sort
  - pass in a compare function,comp(a,b) result compared to 0
  - mutates array in place.
- Reduce
  - executes a reducer function on each element of the array
  - array.reduce((accumulator, currentValue) => {sum, max_value, min_value, }, init value)
  - can use an object as an initial value.

```js
//arrow functions

const arrow = (y) => {
  return y*y;
}

const arrow = y => y*y;

```


### More Js features

- Default values
  - function(a, b=1)
  - should come at the end.
- Spread
  - allows an iterable to be expanded in places where zero or more arguments or elements are expected.
  - used in function calls, array literals, object literals.
  - max(...num)
- Rest
  - same syntax as spread but different use.
  - collects all remaining arguments of the function call.
  - not an array-like object but a real array.
  - should be the last parameter, and can be used with arrow functions.
- Destructuring
  - capture elements from an iterable/compound element.
  - const [name, age, group] = data
  - array, objects, function definition
  
### Objects

- Shorthand syntax of naming variables as their result type.
- Computed properties
  - syntax: [user]: 'Admin'
- Methods
  - can add functions as properties on objects, this are called methods
  - dont have to add name to the key:value pair of object.
- Keyword THIS.
  - object reference to current execution scope.
  - variable declaration with var added to global window scope but not let and const.
  - value of this depends on invocation context of the function it is used in.
  - arrow functions don't get their own execution context
  - leftside.function_call()....leftside = context of this.
  - arrow functions get this context from the context right above.
  

## Asynchronous code

- Call Stack
- Js is single threaded.
- Browser via Cpp does the setInterval kind of operations.
- Callback Hell
- Promises
  - object representing the eventual completion or failure of an asynchronous operation.
  - creating promises
    - new Promise(resolve, reject) => {};
    - .then() is called when the promise resolves.
    - .catch() is called when the promise is rejected.
    - in-between those states the promise status is pending.
    - can create a function that returns a promise
    - can have data in resolve(data) that can be accessed on resolve/rejection
    - chaining .then() enabled if the first function returns a promise.
  - consuming promises
  
## Sending Requests

- AJAX
- XML
- JSON
  - data format
- XmlHttpRequest
- Fetch
  - promise based.
  - content of response is a readablestream.
  - only reject on network failure but never on status code i.e 404, 500
  - manually throw an error to activate .catch()
  
## Async Functions

- async functions always return a promise
  - promise resolves with the return value, else rejected i.e when exception thrown
- await keyword used inside the async function
- can use a try and catch block over it to catch errors or chain .catch() on the function call itself
- sequential vs parallel asyncs and awaits
- in parallel execution, use Promise.All() to resolve multiple promises.


### OOP Js

- prototypes are template objects which are shared among structures of the same type, used to share methods
  - array.prototype, string.prototype, object.prototype
- Factory functions
  - function build an object then returns it at the end
- Constructor function
  - define a function.
  - use the new keyword
    - creates a blank, plain javascript object
    - links (sets constructor of) this object to another object
    - passes newly created object from step 1 as the this context
    - retruns this if the functions does not return its own object
  - access the prototype object and add methods on it, dont use arrow functions
- Class syntax
  - check in code sample
  - simpler version implementation of constructor function
  - use of keyword `extends`
  - use also of super() keyword to re-use constructor function of extended class.


```js

async function make() {
  //this is a promise returning function
}

//class definition

class Car {
  constructor(args here){
    
  }
  
  greet(){
    
  }
  
  cook(){
    
  }
}

```

## How Js Works

### How Names work

### How Numbers work
  - Js has one number type.
  - Borrowed from the IEEE standard for Floating-point Arithmetic.
  - Js number is close to the Java double, its a 64 bit binary floating point type.
  - Contains a sign bit, 11 exponent bits and 53 significand bits.
  - NaN represents values that are not numbers although typeof(NaN) = number
  - NaN === NaN = false, to test for it use Number.isNaN(value) = true or Number.isFinite(value) = false.
  - Number is a function that makes numbers, don't use new keyword with Number as it returns a object.
  - Number is also a container of constants,(EPSILON, MAX_SAFE INTEGER, isInteger, MAX_VALUE, MIN_VALUE)
  - Js is capable of exact integer arithmetic so long as all values and results and intermediate results are integers that lie between -MSI and MSI.
  - Use Number.isSafeInteger(number) to check, Number.isInteger().
  - Number.MAX_VALUE() equal to max_safe integer * 2 ** 971 or 1 followed by 308.
  - Number.MIN_VALUE equal to 2 ** -1074.
  - Number.prototype is an object that all numbers inherit from and contains a set of methods.
  - Bitwise operators - operate on Js numbers by converting them to signed 32 bit ints, performing bitwise ops then converting them back.
  - Hazardous as prone to loosing 22 high order bits. Preferrable to operate on 54 bits
  - Math object contains all the functions that should have been built in Number: trunc, floor, min, max, random.
  - Js isbad at handling decimal fractions.
  - Floating point systems come with functions that convert between the internal binary representation and external decimal that we insist on using.
  - Fp: represent one number as two numbers: coefficient or mantissa contains the digits, the second number: exponent identifies where the decimal point should be inserted in the first number.
  - Try working as much as possible in the safe integer range(i.e convert money values into cents)

### How Big Integers work
  - *will revisit

### How Big Floating point works
  - *will revisit

### How Big Rationals work
  - *will revisit

### How Booleans work
  - Usually generated by the comparison operators, manipulated by the logical operators, and consumed by the ternary operator and the conditional part of if, do, for and while.
  - Avoid mixing types when doing comparisons, bring your own discipline on this don't rely on Js
  - Never use == or !=
  - Falsy values: false, null, undefined, "", 0, NaN, all others are truthy including empty objects, empty arrays and strings.

### How Arrays work
  - Ignoring performance issues, objects can do all that arrays do.
  - Js arrays are really objects.
  - Arrays differ slightly from objects in four ways
    - arrays have a magical length property.
    - Arrays inherit from the array.prototype which contains a much better collection of methods than object.prototype.
    - Arrays are produced using array literals []
    - JSON treats arrays and objects very different even though Js treats them the same.
  - Use the Array.isArray(value) as opposed to object to tell.
  - Initialize
    - []
    - new Array(integers).... can add conditions after this i.e new Array().fill()
  - Identical arrays are only equal if they are the same array.
  - Arrays have methods that act on an array as a stack, pop and push, shift and unshift
  - Searching
    - indexOf
    - lastIndexOf
    - includes()
  - Reducing
    - reduces an array into a single value, takes a function that takes two arguments, reduce calls that function with pairs of values until there is a single value.
    - initial value is always 0
    - *design a reduce function*  
  - Iterating
    - forEach(), calls function for each element of the array.
    - every, some, find, findIndex, filter, map
  - Sorting
    - sorts in place, harmful
    - default sort algorithm arranges values as strings, even if they are numbers.
    - pass in comparison function to sort()
  - Potpourri
    - Concat()
    - Join() - takes in an array of string and s separator string.
    - Split() - inverse of join()
    - Reverse() - reverses inplace
    - Slice() - makes copy of array

### How Objects work
  
  - Everything in javascript is an object except null and defined.
  - Container of properties, each having a name and value, name being a string and value being of any type.
  - In other languages called a hash table, map, record, struct, associative array, dictionary
  - {"name": value}
  - Object literal creates a value that can be stored in a variable, or object or array or passed to a function or returned to a function.
  - Access properties using name value i.e .name or using [] notation.
  - use delete operator removes specified property.
  - Complex data structures can be built out of objects because references to objects can be stored in objects....graphs and cyclic structures.
  - Matching of keys is case sensitive.
  - Object.assign function can copy the properties from an object to another, you can make a copy of an object by passing it an empty object. Object.assign({}, objName);
  - Objects can be made that inherit from other objects, Object.create(prototype) takes an existing object and returns a new object that inherits from the existing object.
  - Any object can be the prototype of a new object, and so on, prototype chain can be as long as needed.
  - Access of any property flows through the prototype chain till value or undefined, when assigning only top-most is changed.
  - Most popular use of prototype is to store functions even JS itself does this, when using object/array/string/function literals, that object inherits from their prototypes.
  - Because of prototype chain, there exists two types of properties, own(top-most) and inherited(chain).
  - obj.hasOwnProperty(value) check if exists and if owned.
  - JSON.stringify(obj) return the object as a string as opposed to the .toString
  - Object.keys(obj)  takes all the keys of the own and not the inherited and returns them as a string.
  - Object.freeze(obj) makes object immutable, top level freeze and not deep freeze.
  - Object.freeze(obj) works different to the const keyword...operate on values vs on variables, check assigments across.
  - Prototypes and freezing do not mix.
  - Weakmap - object that allows objects as keys but not strings. new Weakmap()
  - Weakmap has better security and memory leak protection that Map.
  
### How Strings work
  
  - Mapping of characters onto integers was one of the important advances in computer tech.
  - Immutable array of 16 bit unsigned integers from 0 to 65535.
  - Made with the String.fromCharCode(ints)
  - Strings are immutable/ frozen
  - Concat using the + operator
  - Template string literals
  - Tokenization: editors, code decorators, static analyzers, macro processors, minifiers
  - Js is very difficult to tokenize due to nested literals.

### How Bottom values work
  
  - Special values that indicate end of a recurisve data structure or the absence of a value.
  - i.e Nil, Null, Nothing
  - Js has two, null and undefined. also NaN.
  - Js seems to prefer undefined, an uninitialized var is undefined, passing less args into functions, non property of an object, array element too.
  
### How Statements Work
  
  - We can sort many PLs into expression languages and statement languages, statement language has both an expression only has expressions.
  - Js is a statement language
  - Js: let, const, function
  - Let declares a new variable in the new scope, allows destructuring.
  - Function declarations get hoisted, hence should not be placed inside a block i.e conditionals.
  - const has to be initialized, works on variables(references to values) and not values.
  - Js expression types: assignments, invocations and delete.
  - Js allows any epxression to appear in a statement position.
  - An object can be used as an alternative to the switch statement.
  - Branching: if, else, switch
  - Looping:  for, while(checks condition at the top), do(checks at the bottom)
  - The best way to write loops is to use tail recursion.
  - Disruption: alter control flow, break, continue, throw and return.

### How Functions Work
  
  - Grace Murray Hopper developed a routine called A-0
  - Function takes a parameter list and a body, which is a list of statements.
  - Excess arguments igonored, missing are undefined.
  - ...spread, in argument list, ...rest in parameter list.
  - Activation object is created on function call, its a hidden data structure that holds the information and bindings that function needs to execute
    and the return address of the activation of the calling function.
  - As opposed to C which allocates activation objects on a stack, Js uses a heap.
  - They are not automatically deactivated when functions return, instead the activation object can survive as long as there is a reference to it until GC kicks in.
  - Activation object contains:
    - A reference to the function object
    - A reference to the activation object of the caller, used by return to give control back.
    - Resumption information used to continue execution after a call, usually the address of the instruction that is immediately after a function call.
    - The parameters of the function, initialized with arguments.
    - The variables of the function, initialized with undefined.
    - Temporary variables that the function uses to evaluate complex expressions.
    - this, might be reference to the object of interest if the function object was called as a method.
  - A function object is like ordinary mutable objects in that it can be a container of properties, ideally should be immutable.
  - A function object also contains two hidden properties
    - A reference to the functions' executable code.
    - A reference to the activation object that was active at the time the function object was created, this is what makes closure possible,
      a function can use that hidden property to access the variables of the function that created it.
  - Free variables(outside function) vs bound variables(inside function)
  - Functions can be nested, with inner containing reference to activation object of outer. Closure
  
### How Generators Work
  
  - What the code does is very different from how the code looks.
  - They produce a function object that produces an object that contains a next method that is made of the function* body.
  - It ahs a yield operator that resembles a return statement, but it doesnt produce the expected value, instead produces an object that contains a value property
    that contains the expected value.
  - Outer fn is factory, inner is generator

### How Exceptions Work
  
  - Failure is signalled by a throw statement
  - try {yes} catch {no}
  - Every statement in a function could have its own try and its own catch.
  - Exception management does not impose a perf penalty on correctly running programs.
  - Js compiler produces a catchmap for every function that it compiles.
  - If not catchmap doesnot match anything on the call stack it throws an uncaught exception.
  - Exceptions should be used for problems not anticipated, not communicate normal results.
   
### How Programs Work
  
  - Js is delivered to execution site in source form.
  - There are objects and functions made available automatically to every source unit: Number, Array, Object, String, Math
  - Global scope vs Module scope.
  - Module should export one thing, typically a function or object full of functions, an exportation is an interface, should be simple and clean.
  - A good module hides its implementation.
  - Cohesion and coupling
  - References
    - Structured design

### How `this` Works
  
  - Reference Smalltalk's dialect Self implementation of prototypes. 
  - Prototypes are objects.
  - Access on the value of a property an object does not have is undefined unless inherited from a prototype which is then that prototype's property value.
  - Most common use of prototypes is as a store of methods.
  - How does a function in a prototype know which object to work on, enter `this`.
  - A method call is a ternary operator using .,() or .,[]
    - object of interest
    - method name
    - argument list
  - *Try to program this free in Js. 

### How Class free Works
  
  - Think of a method name and its arguments as a message, calling the method sends message to the object.
  - Each object has its own behaviour that is triggered when it receives particular messages.
  - Polymorphism: every obejct that recognises a particular message is eligible to receive it.
  - Inheritance is good for simple objects, anything else tight coupling erodes advantages.
  - Classes tend to be bad modules
  - `types are like weight loss diets, gets credit for weight lost, not that weight that goes back on and increases`.
  - Do type costs exceed the weight??
  - A constructor is a function that returns a object, constructor's parameters and variables become the private properties of the object.
  - Constructors inner functions become the object's methods, they close over the private properties.
  - Two types of objects
    - Hard objects containing only methods. defend integrity of data held in closure, giving us polymorphism and encapsulation.
    - Soft data objects containing only data. no behaviour. collections that an be manipulated by functions. 
  - Constructor composition
  
### How Tail Calls Work
  
  - A tail call happens when the last thing a function does is return the result of calling a function.
  - Its a optimisation in that one instruction, jmp replaces the call and return instructions.
  - A tail call is like a goto with arguments but without any of the dangers of the goto.
  - Big difference is that If the A.O is big enough, we do not need to allocate for another, we can reuse the current A.O
  - The reduction of time in memory allocation and garbage collection can be significant.
  - With tail call optimization, recursive function can be as fast as loops.
  - *write a tail recursive function
  - Recursive functions will generally be more elegant, passing updated state in parameters and return values instead of using assignments.
  - A call is a tail call if the value a function returns is returned.
  - A tail call in a try block can not be optimized as it might send control back to this invocation's catch and for that the references need to be maintained not optimized away.
  - Debugging can be optimized to either accomodate or complement the tail call features.

### How Purity Works
  
  - Purity is corrupted by mutation  
  - A pure functions result is determined only by its inputs.
  - Pure functions have extremely loose coupling, strong cohesion and are very composable.
  - They are much easier to test.
  - Since they have no side effects and no external dependencies or influences, its easy to assemble them into larger, more complex functions that can be pure and composable as well.
  - Pure functions can make threads safe and efficient.
  - *Parallelization of pure functions is the feature we all need in JS*.
  - Impurities in Js
  
### How Eventual Programming Works

  - In the beginning there was sequential programming.
  - Typical feature of sequential programming was blocking input and output, FOTRAN i/o model.
  - Concurrency: ability to do multiple things at once.
  - Homogeneous concurrency: provide support for many similar operations happening at the same time.
  - Heterogeneous concurrency: supports the cooperation of specialized processes that each has a different responsibility, but that all work as a team.
  - Threads  
  - Computational load can change the interleaving of instructions, leading to temporary bugs in threads.(tests and types do not help)
  - An eventual function is a function that returns immediately, possibly before the work that is requested of it is finished.
  - The result will be communicated eventually in the future through a callback function or message send, but not as immediate return value.
  - This allows management of lots of activity without exposing applications to threads.
  - Built on two ideas: callback functions and a processing loop.
  - Callback: function that is called in the future when sth interesting happens.
  - It is passed to a function that is starting or monitoring an activity.
  - In more primitive systems, callback function is attached to an object that represents an activity.
  - In web browsers, a callback fn is attached to a node by assigning the callback to a particular property of the DOM node or by calling an event registration method on the object.
  - Processing loop is also called event loop or the message loop.
  - The law of turns: never wait. never block. finish fast.
  - Callback hell vs Promises vs Async/Await
  - All three have a tight coupling of logic and control flow leading to poor cohesion.
  - Dijsktra invented mutual exclusion, i.e semaphores.
  - Synchronous means to operate on the same clock.
  
### How Date Work

  - *

### How JSON Work

  - "name" to work around the ES3 restricted keyword list.  
  - mime type: application/json
  - Influence of Lisp and Rebol languages' textual representations
  - Js supports JSON using two functions: parse and stringify
  - Parse takes a JSON text and decodes it into Js data.
  - Stringify takes a value and encodes it into a JSON text.

### How Testing Work
  
  - Testing can be used to show the presence of bug but never the absence of them.
  - Thomas Alva Edison came up with the word bug, when developing the phonograph
  - JSCheck tool.


### How Optimizing Works

  - Scale of problem can grow faster than capacity.
  - Optimize your optimizing.
  - Choose language features that give us programs that are readable and maintainable.
  - Measure, then cut, then measure again.
  - Most optimizations add complexity to the code by adding alternate paths and removing generality, making code bigger, harder to maintain and test adequately.
  - Biggest Time sucks in programs
    - Failure to parallelize
    - Violating the law of turns
    - Weak cohesiveness.
    - Tight coupling
    - Wrong Algorithms
    - Thrashing
    - Bloat
    - Other people's code.
  - One of the best optimization investments is the language engine.

### How Transpiling Works

  - Special form of compiling where one language is transformed into another, treating it as a compilation target.
  - Try and avoid transpilers in production.
  - 

*Stopped here to go implement the NEO language that follows in the book*
    

  
## From Browser Implementations

- Always initialise your objects in the same way, so they dont end up having different shapes.
- Don't mess with property attributes of array elements, so they can be stored and operated on efficiently.



## Javascript Algorithms
ref:`Frontend Masters`

- Space(memory) and Time(primitive operations) complexity
- WRT input size
- constant(O(1)) -> logarithmic(O(logn)) -> linear(O(n)) -> Quadratic(O(n^2)) -> exponential(O(k^n))
- drop the constants.
- caching vs memoization 
- memoization is saving the result of function call.
- memoization with closures, privatise the cache object inside the function.

## Recursion

- when a function calls itself
- identify base case
- identify the recursive case
- return where appropriate
- turn loops into recursion and vice versa
- formats
  - wrapper functions
  - accumulator - result is passed down into each recursion.
- closure is a function that is called inside another function.

## Divide and Conquer

- Binary Search
  - cut in half
  - sorted
- Linear search
  - time complexity is linear
- Comparison sorts
  - Naive sorts
    - keep looping and comparing values until the list is sorted.
      - Bubble sort
        - compare adjacent items and swapping till sorted
      - Insertion sort
      - Selection sort
  - Divide and Conquer sort
    - recursively divide lists and sort smaller parts of the list until entire list is sorted
      - Mergesort
        - recusively merge sorted sub-lists
      - Quicksort

### Greedy Algorithms

- making the locally optimal choice.

### Brute Force 

- alternate to greedy where you go through all the combination of possible solutions

### Dynamic Programming

- cache values to avoid repeated calculations.
- top-down recursive technique
- bottom-up iterative technique
- memoised called are constant time look-up.
- correctly identify the subproblems, memoize the results, if need to solve again, look up the results.
- subproblem dependencies should be acyclic otherwise one gets infinite algorithms. 
- when cyclic, make graph acyclic, this however increases number of subproblems.
- time = # of problems + time per problem
- you can incorporate space complexity by deleting all but last 2 when computing another one.
- Shortest paths problem: guessing technique
- 5 general steps in DP
  - Define subproblems, count them too
  - Guess(part of the solution), # choices for guesses
  - Relate subproblems solutions, time/subproblem
  - Recurse and Memoize or build DP table bottom-up, check subprob recurrence is acyclic, has topological order.
  - Solve original problem, combining may take some time.
- Look into text justification problem.
- Parent pointers: remember what guess was the best