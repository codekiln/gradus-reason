---
title: Names and Functions
createdDate: "2017-11-19"
updatedDate: "2017-11-19"
author: "Myer Nore"
tags:
  - functions
  - rtop
image: default.jpg
draft: false
---

When getting started writing functions, it is very helpful to use 
rtop locally, which is Reason's **R**ead **E**val **P**rint **L**oop (REPL). Please 
see the [previous post](https://codekiln.github.io/gradus-reason/steps/2017-11-12--getting-started/) 
to install it and get started.

## `Let myvar = "something"`

In Reason, variables are declared with the [`let` keyword](https://reasonml.github.io/guide/language/let-binding)
using the equals sign (`=`):

    Reason # let favoriteFruit = "orange";
    let favoriteFruit: string = "orange";                                                              
    Reason # favoriteFruit;
    - : string = "orange"

## Making functions: `(x) => x * 2;`

The basic ([syntax for a function in the Reason Docs here](https://reasonml.github.io/guide/language/function)). 
A function is constructed with parentheses `()` and a "fat arrow" or "rocket" `=>`:

    Reason # let cube = (x) => x * x * x;
    let cube: (int) => int = <fun>;                                                                    
    Reason # cube;
    - : (int) => int = <fun>                                                                           
    Reason # cube(3);
    - : int = 27                                                                                       

Reason interpreted the function to take an integer parameter and return an integer:
`(int) => int = <fun>`. The first part of this, `(int) => int` is the "type signature" of
the function, which identifies the types it takes and the types it returns.  

Let's look at a function that returns true if a provided int is negative and 
returns false otherwise:

    Reason # let neg = (x) => if (x < 0) {true} else {false};
    let neg: (int) => bool = <fun>;                                                                   
    Reason # neg(2);
    - : bool = false                                                                                  
    Reason # neg(-2);
    - : bool = true                                                                                   
    Reason # neg(true);
    Error: This expression has type bool but an expression was expected of type int

Here's a function which takes a char and returns true if it is a vowel. 
This uses referential equality, which is documented in 
[the reason docs for Boolean](https://reasonml.github.io/guide/language/boolean):

    Reason # let isvowel = (c) =>
      c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u';
    let isvowel: (char) => bool = <fun>;                                                              
    Reason # isvowel('a');
    - : bool = true                                                                                   
    Reason # isvowel('b');
    - : bool = false

Here's a function that takes two parameters `a` and `b`, and returns 
true if they add to ten:

    Reason # let addtoten = (a, b) =>
      a + b === 10;
    let addtoten: (int, int) => bool = <fun>;                                                         
    Reason # addtoten(6, 4);
    - : bool = true                                                                                   
    Reason # addtoten(5, 7);
    - : bool = false

Here's a recursive function, which computes the factorial
of a provided integer: 

    Reason # let rec factorial = (a) =>
      a === 1 ? 1 : a * factorial(a - 1);
    let factorial: (int) => int = <fun>;                                                              
    Reason # factorial(2);
    - : int = 2                                                                                       
    Reason # factorial(3);
    - : int = 6                                                                                       
    Reason # factorial(4);
    - : int = 24                                                                                      

Finally, here's a recursive function that computes the greatest common divisor
of two integers, using the `mod` operator:

    Reason # let rec gcd = (a, b) =>
      b === 0 ? a : gcd(b, a mod b);
    let gcd: (int, int) => int = <fun>;                                                               
    Reason # gcd(120, 60);
    - : int = 60                                                                                      
    Reason # gcd(120, 64);
    - : int = 8                                                                                       

## Explorations

This step has given the broad strokes of functions in Reason. Further things 
to explore in the REPL: 

1.  Write a function which, given integer `n`, returns the sum of `0 ... n`
2.  Write a function which, given integer `n` and power `p`, returns `n` raised to the power `p`.
3.  What happens if you try `factorial(-1);`? How can this be prevented?
4.  Write a function `isconsonant(c)` which returns true if a char is a consonant.

_[Edit this post here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2017-11-19--names-and-functions/index.md)_

## TODO

-   [ ] Replace default.jpg image for this step
-   [ ] Write an awesome article
-   [ ] Remove these todos
-   [ ] `git add ./data/steps/2017-11-19--names-and-functions; git commit -m "Added Names and Functions step"`
-   [ ] PR to [gradus-reason](https://github.com/codekiln/gradus-reason)
