---
title: Pattern Matching Intro
createdDate: "2017-12-03"
updatedDate: "2017-12-03"
author: "Myer Nore"
tags:
  - pattern-matching
  - variants
image: wall_by_nigel_appleton_flickr.jpg
draft: false
---

## Pattern Matching / Switch

In the [last post](https://codekiln.github.io/gradus-reason/steps/2017-11-19--names-and-functions/),
recall the `factorial` function:

```reason
let rec factorial = (a) =>
  a === 1 ? 1 : a * factorial(a - 1);

for (i in 1 to 4) {
  Js.log(factorial(i))
};
```

While an if/else or ternary expression works just fine for two branches, there is another way to express this 
in Reason using a [`switch statement`](https://reasonml.github.io/guide/language/pattern-matching/#usage):

```reason
let rec factorial = (a) =>
  switch a {
  | 1 => 1
  | _ => a * factorial (a - 1)
  };

Js.log(factorial(4));
```

As you can see, the final case of the `switch` can be `_`, which is Reason OCaml's 
syntax for a throwaway variable.

Continuing also from the [last post](https://codekiln.github.io/gradus-reason/steps/2017-11-19--names-and-functions/), 
consider the function we wrote to determine if a character is a vowel:

```reason
let isvowel = (c) =>
  c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u';

Js.log(isvowel('a'));
Js.log(isvowel('b'));
```

Let's convert this to using the switch statement:

```reason
let isVowel = (c) =>
  switch c {
  | 'a' => true
  | 'e' => true
  | 'i' => true
  | 'o' => true
  | 'u' => true
  | _ => false
  };
  
let myWord = "mississippi";

for (i in 0 to String.length(myWord) - 1) {
  let c = myWord.[i];
  let cString = String.make(1, c) ++ ": is vowel? ";
  Js.log(cString ++ string_of_bool(isVowel(c)));
}
```

Consider the [Fibonacci series](https://en.wikipedia.org/wiki/Fibonacci_number), 
`1, 1, 2, 3, 5, 8, 13...`, where each number is the sum of the prior two numbers.
To write a function that gives the \_n_th Fibonacci number, one can use of pattern matching.
This shows that one doesn't need to discard the default case and can reuse it as a variable 
in a subsequent function call:

```reason
let rec fib = (n) => {
  switch n {
  | 0 => 0
  | 1 => 1
  | n => fib(n-2) + fib(n-1)
  };
};

for (i in 1 to 10) {
  Js.log(fib(i))
};
```

## Variants / Synonyms

The complement of pattern matching is [variants](https://reasonml.github.io/guide/language/variant). 
Variants are synonyms or equivalence classes that are constructed with the single bar character: (`|`) 

```reason
let scrabbleLetterScore = (c) => {
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
Js.log(scrabbleLetterScore('q'))
```

Both pattern matching and variants are much more important to Reason than we've let on here.
Before we touch on that we need to introduce more data structures. Hopefully this post gives 
a taste of what it's like to use `switch` to do make clear code paths.

## Explorations

Use pattern matching to write a function that ...

1.  returns the sum of integers 1 through _n_
2.  computes _x_ to the power of _n_

<sup><quote>Image Credit: [_Wall_ by Nigel Appleton on Flickr](https://www.flickr.com/photos/nigelappleton/1464768432/in/photolist-3erjC9-PTSC9K-4nJkdk-n5aMvJ-3gHgr3-R8vP8v-EcfmZ8-9xykkt-8aNEsQ-8Cm7Ds-qoqvAX-98kGGt-8ZgtEA-pq7JYs-qV78yB-QyhbF1-QUmEbW-TYaiKG-5Nku1X-3KGy9w-PRa3Fh-QWYhSP-4Gmc7R-djCNth-PTTz7v-QWYf3F-5LPGCh-XFcT4N-aa7itJ-boqf9z-qaDy2n-PRai3y-6MfKzG-sn4PAc-PRbEih-e4haW1-p6YGQ-f4hQxr-nBveGm-4fuunE-9xWtdU-PTU3jX-EvivH-9z4MMk-9xWsCC-9bQW8-zBV5G-4Gy1QA-8Zf2o6-QWWZDT)</quote></sup>

_[Edit this post here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2017-12-03--pattern-matching-intro/index.md)_
