---
title: Modules
createdDate: "2018-03-14"
updatedDate: "2018-03-14"
author: "Myer Nore"
tags:
  - modules
  - functors
image: Port_Birch_South_street_1_by_cimddwc_on_flickr.jpg
draft: false
---

## What are Modules?

Modules group methods and types, and give us an ability to
engineer private worlds of logic that snap together and 
hide their internals. This gives us the ability to change the internals
later on, because clients can only use the published interface.

## Module Syntax - Basic Example

In contrast to `type`s like variants and records,
a `module` must begin with a capital letter. A variable that begins
with a capital letter often indicates it is a `module`.

A module declaration looks generally like this:
`module <CapitalizedName> : <signature> = <implementation>;`. The `signature`
is optional as it is in Reason's type annotation
[in a `let binding`](https://reasonml.github.io/docs/en/type.html#annotations):
`let <variable name here> [: optionalTypeAnnotation] = "concreteValue"`.

Here is a basic example of a Person Module:

```reason
/* First, we define an interface that callers will use.
 * This is like a "whitelist"; only things in the `module type` are
 * accessible outside the module. If you are familiar with Java, 
 * this is similar to the Interface for a Class. 
 */
module type PersonType = {
  type t;
  let make: (~name: string) => t;
  let toString: t => string;
};

/* This is an implementation of the PersonType interface defined above.
 * We can put things in here that are not in the interface, 
 * and the compiler will hide them from client code.
 */
module Person: PersonType = {
  
  /* in this implementation, we use a record for the module type */
  type t = {name: string};
  
  /* the make function returns a record type `t` we've defined above */
  let make = (~name: string) => {name: name};
  
  /* the toString function takes a record type `t` we've defined above
   * and prints it out
   */
  let toString = t => "name: " ++ t.name;
};

let p1 = Person.make(~name="Jason Hickey");

Js.log(Person.toString(p1));
```

This example is meant to illustrate the syntax of `module type` and 
`module` expressions; it does not yet illustrate what is interesting about 
modules and what they are good for.

## Modules - Exercises

### Fraction Module - Advanced

*This exercise is [Steffen Smolka's](https://github.com/smolkaj), taken from 
[Cornell's CS 3110 Lecture 7 Lab](http://www.cs.cornell.edu/courses/cs3110/2018sp/l/07-modules/lab.html).*

Write a module implementing the following `Fraction` module type:

```reason
module type Fraction = {
  /* A fraction is a rational number p/q, where q != 0.*/
  type t;
  /* [make n d] is n/d. Requires d != 0. */
  let make: (int, int) => t;
  let numerator: t => int;
  let denominator: t => int;
  let toString: t => string;
  let toReal: t => float;
  let add: (t, t) => t;
  let mul: (t, t) => t;
};
```

Your module should ensure that `make`, `add`, and `mul` return numbers
in [reduced form](https://en.wikipedia.org/wiki/Irreducible_fraction)
where the denominator is positive. See the *Gradus Reason* step 
[Names and Functions](/steps/2017-11-19--names-and-functions/)
for a sample implementation of Euclid's Algorithm.

## Modules - Links

-   [ReasonML docs for `Module`](https://reasonml.github.io/docs/en/module.html)
-   [Basic Modules from _Exploring ReasonML_ Book by Dr. Axel Rauschmayer](http://reasonmlhub.com/exploring-reasonml/ch_basic-modules.html)
-   [_Chapter 4 - Files Modules and Programs_ from _Real World OCaml_](https://realworldocaml.org/v1/en/html/files-modules-and-programs.html)
-   [OCaml tutorial on Modules](https://ocaml.org/learn/tutorials/modules.html)
-   [_Chapter 2 The Module System_ from _The OCaml Manual_](https://caml.inria.fr/pub/docs/manual-ocaml/moduleexamples.html)
-   [_Modules and Abstract Data Types_, lecture from Princeton's COS 326 by David Walker](https://www.cs.princeton.edu/courses/archive/fall17/cos326/lec/15-modules.pdf)
-   [_Modules_, lecture notes in Cornell's 2018 CS 3110](http://www.cs.cornell.edu/courses/cs3110/2018sp/l/07-modules/notes.html)
-   [_Modules_, code examples in Cornell's 2018 CS 3110](http://www.cs.cornell.edu/courses/cs3110/2018sp/l/07-modules/code.ml)
-   [_Modules_, lecture slides in Cornell's 2018 CS 3110](http://www.cs.cornell.edu/courses/cs3110/2018sp/l/07-modules/lec.pdf)
-   [_Introduction to Objective Caml_ by Jason Hickey, Chapters 11 and 12](http://www.nuprl.org/documents/Hickey/02caltech-ocaml.pdf)

Image Credit: [_Port Birch South - street 1_ by cimddwc on Flickr](https://www.flickr.com/photos/cimddwc/16037999946/in/album-72157649784716806/)

_[Edit this post here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2018-03-14--modules/index.md)_
