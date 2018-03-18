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

Modules group related methods, exceptions and types into a package. In 
addition, Reason provides module interfaces that make it easier to swap out 
one module for another module that fulfills the same interface.

## Module Syntax - Basic Example

In contrast to `type`s like variants and records,
a `module` must begin with a capital letter. A variable that begins
with a capital letter often indicates it is a `module`.

A module declaration looks generally like this:
`module <CapitalizedName> : <ModuleInterfaceType> = <implementation>;`. 
The `ModuleInterfaceType` is optional as it is in Reason's type annotation
[in a `let binding`](https://reasonml.github.io/docs/en/type.html#annotations):
`let <variable name here> [: optionalTypeAnnotation] = "concreteValue"`.

Here is a basic example of a Person Module:

```reason
/* First, we define an interface type that clients will use.
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

## What problem do Modules solve?

In software, requirements evolve over time with feedback 
from a product's owner(s).  It often happens that a system needs a new feature 
that the original engineers did not anticipate. This becomes 
especially complicated in large projects. For example, if you need to modify
components A and B to provide a new feature, and components C-M depend on A while 
components G-Z depend on B, it can become difficult to figure out what will break 
if the engineers that built A and B are no longer around. This problem gets worse 
if clients rely on direct implementation details. 

One strategy to is to ensure you can always swap out a component 
with another "of roughly the same size and shape," that is, with a 
component that fulfills the contract it currently guarantees its clients. 
As long as the interface that a component's clients use stays the same, 
the implementation is free to change.

<iframe src="https://giphy.com/embed/MS0fQBmGGMaRy" width="480" height="253" 
        frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

### Hypothetical example of why you should use interfaces
Let's say you are an engineer for a social networking site. Your product's 
component A used the Google Maps API to display a map of where users are 
logged in right now. It didn't use an interface and instead exposed the 
Google Maps data structures to its downstream  components. Other coders 
ended up using Google Maps' data structures directly in the components they wrote,
since that was the easiest thing to do. Then your product owner decided to extend 
your product's prescence in China, [where Google Maps API doesn't work](https://developers.google.com/maps/faq#china_ws_access).
Now you have to go into all of those downstream components and re-engineer how 
they are storing data ... ouch. Instead, you should have used an interface hiding how
the information was stored, and if you need to switch out a different API provider, 
you won't have to change as many of your components.

## Reason Type Checks and Modules

ReasonML's type checking ensures two things about the relationship between 
`module` and `module type` expressions: 

1. **interface enforcement**: if a `module type` declares a method, type or 
   other entity, then the `module` that conforms to that interface must implement 
   that entity.
2. **encapsulation**: if it's not in the `module type` for a module, 
   clients can't see that part of the implementation.

*In the context of ReasonML, the terms interface, 
signature, and module type are all used interchangeably.*

### Example - module type enforcement
```reason
/* Make a new module type S1, e.g. interface for a module */
module type S1 = {
  let x: int; 
  let y: int;
};

/* We've declared module M1 to be of module type S1. */ 
module M1: S1 = {
  let x = 42;
};

/**
 The above won't compile; Reason throws this error: 
 Line 2, 17: Signature mismatch: ... The value `y` is required but not provided
 **/
```

Everything in the `module type` must also be in the `module`. We left out `y` from 
the module M1, and it wouldn't compile.

### Example - module type encapsulation
```reason
module type S2 = {
  let x: int;
};

module M2: S2 = {
  let x = 42;
  let y = 7;
};

Js.log(M2.y)

/**
The above won't compile; Reason throws this error:
Line 4, 15: Unbound value M2.y
**/
```

By declaring `M2` to conform to interface `S2`, then everything not in 
`S2` is "private" to the inside `M2`. Here, we tried to get the "private"
property `y` outside of `M2`'s closure, so Reason threw a compile time error.

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
