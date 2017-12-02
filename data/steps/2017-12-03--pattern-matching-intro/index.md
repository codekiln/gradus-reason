---
title: Pattern Matching Intro
createdDate: "2017-12-03"
updatedDate: "2017-12-03"
author: "Myer Nore"
tags:
  - pattern_matching
  - variants
image: default.jpg
draft: true
---

## Pattern Matching / Switch

In the [last post](https://codekiln.github.io/gradus-reason/steps/2017-11-19--names-and-functions/),
recall the `factorial` function:

    Reason # let rec factorial = (a) =>
      a === 1 ? 1 : a * factorial(a - 1);
    let factorial: (int) => int;                                                              
    Reason # factorial(2);
    - : int = 2                                                                                       
    Reason # factorial(3);
    - : int = 6                                                                                       
    Reason # factorial(4);
    - : int = 24                                                                                      

While an if/else or ternary expression works just fine for two branches, there is another way to express this 
in Reason using a [`switch statement`](https://reasonml.github.io/guide/language/pattern-matching/#usage):

    Reason # let rec factorial = (a) =>
      switch a {
      | 1 => 1
      | _ => a * factorial (a - 1)
      };
    let factorial: (int) => int;                                                               
    Reason # factorial(4);
    - : int = 24

As you can see, the final case of the `switch` can be `_`, which is Reason OCaml's 
syntax for a throwaway variable.

Continuing also from the [last post](https://codekiln.github.io/gradus-reason/steps/2017-11-19--names-and-functions/), 
consider the function we wrote to determine if a character is a vowel:

    Reason # let isvowel = (c) =>
      c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u';
    let isvowel: (char) => bool;                                                              
    Reason # isvowel('a');
    - : bool = true                                                                                   
    Reason # isvowel('b');
    - : bool = false

Let's convert this to using the switch statement:

    Reason # let isvowel = (c) =>
      switch c {
      | 'a' => true
      | 'e' => true
      | 'i' => true
      | 'o' => true
      | 'u' => true
      | _ => false
      };
    let isvowel: (char) => bool;                                                               
    Reason # isvowel('a');
    - : bool = true                                                                                    
    Reason # isvowel('b');
    - : bool = false

Consider the [Fibonacci series](https://en.wikipedia.org/wiki/Fibonacci_number), 
`1, 1, 2, 3, 5, 8, 13...`, where each number is the sum of the prior two numbers.
To write a function that gives the _n_th Fibonacci number, one can use of pattern matching.
This shows that one doesn't need to discard the default case and can reuse it as a variable 
in a subsequent function call:

    Reason # let rec fib = (n) => {
      switch n {
      | 0 => 0
      | 1 => 1
      | n => fib(n-2) + fib(n-1)
      };
    };
    let fib: (int) => int;                                                                     
    Reason # fib(1);
    - : int = 1                                                                                        
    Reason # fib(2);
    - : int = 1                                                                                        
    Reason # fib(3);
    - : int = 2                                                                                        
    Reason # fib(4);
    - : int = 3                                                                                        
    Reason # fib(5);
    - : int = 5                                                                                        
    Reason # fib(6);
    - : int = 8

## Variants / Synonyms

The complement of pattern matching is [variants](https://reasonml.github.io/guide/language/variant). 
Variants are synonyms or equivalence classes that are constructed with the single bar character: (`|`) 

    Reason # let scrabbleLetterScore = (c) => {
      switch c {
      | ('a' | 'e' | 'i' | 'o' | 'u' | 'l' | 'n' | 's' | 't') => 1
      | ('d' | 'g') => 2
      | ('b' | 'c' | 'm' | 'p') => 3
      | ('f' | 'h' | 'v' | 'w' | 'y') => 4
      | 'k' => 5
      | ('j' | 'x') => 8
      | ('q' | 'z') => 10
      | _ => 0
      };
    };
    let scrabbleLetterScore: (char) => int;                                                    
    Reason # scrabbleLetterScore('a');
    - : int = 1                                                                                        
    Reason # scrabbleLetterScore('c');
    - : int = 3                                                                                        
    Reason # scrabbleLetterScore('k');
    - : int = 5                                                                                        
    Reason # scrabbleLetterScore('q');
    - : int = 10

Both pattern matching and variants are much more important to Reason than we've let on here.
Before we touch on that we need to introduce more data structures. Hopefully this post gives 
a taste of what it's like to use `switch` to do make clear paths in code.

_[Edit this post here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2017-12-03--pattern-matching-intro/index.md)_
