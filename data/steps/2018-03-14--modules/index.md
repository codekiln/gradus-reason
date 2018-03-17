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

Modules serve a purpose similar to packages in Java or Python.
A Module groups methods and types, and gives us an ability to
engineer modular, private worlds of logic that snap together and protect
internals from tampering.


## Module Syntax

In contrast to `type`s like variants and records,
a `module` must begin with a capital letter, and a variable that begins
with a capital letter often indicates that it is a `module`.

A module declaration looks generally like this:
`module <CapitalizedName> : <signature> = <implementation>;`. The `signature`
is optional as it is in Reason's type annotation
[in a `let binding`](https://reasonml.github.io/docs/en/type.html#annotations):
`let <variable name here> [: optionalTypeAnnotation] = "concreteValue"`.

Here is an example of a Module which abstracts away details about a
person.

```reason
/**
 * We're going to implement a Person module below that will define
 * the Person type and group it with its associated functions.
 * First, though we define an interface that callers will use.
 * This is like a "whitelist"; only things in the `module type` are
 * accessible outside the module. This is similar to an interface
 * in Java, if you are familiar with that.
 */
module type PersonType = {
  type t;
  let make: (~name: string) => t;
  let toString: t => string;
};

/**
 * This is an implementation of the PersonType interface defined above.
 * We can put things in here that are not in the interface, and
 * the compiler will hide them from .
 **/
module BasicPerson: PersonType = {
  type t = {name: string};
  let make = (~name: string) => {name: name};
  let toString = t => "name: " ++ t.name;
};

let p1 = BasicPerson.make(~name="Jason Hickey");

Js.log(BasicPerson.toString(p1));
```

## Modules - Links

-   [ReasonML docs for `Module`](https://reasonml.github.io/docs/en/module.html)
-   [Basic Modules from _Exploring ReasonML_ Book by Dr. Axel Rauschmayer](http://reasonmlhub.com/exploring-reasonml/ch_basic-modules.html)
-   [_Chapter 4. Files, Modules, and Programs_from _Real World OCaml Book_](https://realworldocaml.org/v1/en/html/files-modules-and-programs.html)
-   [OCaml tutorial on Modules](https://ocaml.org/learn/tutorials/modules.html)
-   [_Chapter 2 The Module System_ from _The OCaml Manual_](https://caml.inria.fr/pub/docs/manual-ocaml/moduleexamples.html)
-   [_Modules and Abstract Data Types_, lecture notes from COS 326, David Walker, Princeton](https://www.cs.princeton.edu/courses/archive/fall17/cos326/lec/15-modules.pdf)
-   [_Modules_, a lecture in Cornell's CS3110](http://www.cs.cornell.edu/courses/cs3110/2016fa/l/07-modules/notes.html)
-   [_Introduction to Objective Caml_ by Jason Hickey, Chapters 11 and 12](http://www.nuprl.org/documents/Hickey/02caltech-ocaml.pdf)

Image Credit: [_Port Birch South - street 1_ by cimddwc on Flickr](https://www.flickr.com/photos/cimddwc/16037999946/in/album-72157649784716806/)

_[Edit this post here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2018-03-14--modules/index.md)_
