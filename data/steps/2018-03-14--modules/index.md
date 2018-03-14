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
`module <name> : <signature> = <implementation>;`. Here the signature
is optional, much like the type annotation in a [`let binding`](https://reasonml.github.io/docs/en/type.html#annotations): `let <variable name here> [: optionalTypeAnnotation] = "concreteValue"`.

Here is an example of a Module which stores unique details about a contact.

```reason
module type ID = {
  type t;
  let of_string: string => t;
  let to_string: t => string;
};

module String_id = {
  type t = string;
  let of_string = (x) => x;
  let to_string = (x) => x;
};

module Int_id = {
  type t = int;
  let of_string = (x) => int_of_string(x);
  let to_string = (x) => string_of_int(x);
};

module Username: ID = String_id;

module Phone: ID = Int_id;

type contact_info = {
  username: Username.t,
  phone: Phone.t
};

let users: list(contact_info) = [
  {
    username: "LisaRGibbons",
    phone: 2085805336
  },
  {
    username: "AdamLPetty@dayrep.com",
    phone: 2085805336
  }
];
```

## Modules - Links

-   [ReasonML docs for `Module`](https://reasonml.github.io/docs/en/module.html)
-   [Basic Modules from _Exploring ReasonML_ Book by Dr. Axel Rauschmayer](http://reasonmlhub.com/exploring-reasonml/ch_basic-modules.html)
-   [_Chapter 4. Files, Modules, and Programs_from _Real World OCaml Book_](https://realworldocaml.org/v1/en/html/files-modules-and-programs.html)
-   [OCaml tutorial on Modules](https://ocaml.org/learn/tutorials/modules.html)


Image Credit: [_Port Birch South - street 1_ by cimddwc on Flickr](https://www.flickr.com/photos/cimddwc/16037999946/in/album-72157649784716806/)

_[Edit this post here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2018-03-14--modules/index.md)_
