---
title: Objects
createdDate: "2018-03-02"
updatedDate: "2018-03-02"
author: "Myer Nore"
tags:
  - objects
  - records
  - json
image: objects_by_kim_anh_on_flickr.jpg
draft: false
---

## Records Vs Objects - Basic Example

```reason
/* Part 1 ----- Records Example ----- */
/* declare a record type */
type contactRecord = {
  name: string,
  twitter: option(string)
};

let printContactRec = (contact: contactRecord) =>
  switch contact.twitter {
  | Some(tw) => Js.log(contact.name ++ " has twitter " ++ tw)
  | None => Js.log(contact.name ++ " doesn't have a twitter")
  };

/*
 instantiate a record with type contactRecord
 (note: the type annotation is optional)
 */
let contactRec: contactRecord = {
  name: "Donald Knuth",
  twitter: None
};

printContactRec(contactRec);

/* Part 2 ---- Objects Example ----- */
/* declare a "closed" object type - note the single period {. */
type contactObj = {
  .
  name: string,
  twitter: option(string)
};

let printContactObj = (contact: contactObj) =>
  switch contact#twitter {
  | Some(tw) => Js.log(contact#name ++ " has twitter " ++ tw)
  | None => Js.log(contact#name ++ " doesn't have a twitter")
  };

let myContact: contactObj = {
  pub name = "Kehinde Wiley";
  pub twitter = Some("@kehindewileyart")
};

printContactObj(myContact);
```

## Objects - Intro

Many people do not know what leeks are good for in cooking, so there is a
proverb: _"An onion too strong, a chive too weak? Don't be afraid to use a leek."_
Similarly, in ReasonML, many people don't quite know what to do with Reason Objects.

[_A History of OCaml_](https://ocaml.org/learn/history.html),
reports that OCaml was originally CAML, or _Categorical Abstract Machine Language_, and
a variant called emerged in 1996 called _Objective Caml_ that, in 2011,
became known as _OCaml_. Objects were added to OCaml / ReasonML to bring
Object Oriented Programming / OOP into the language.

Like Records and Tuples, and they group attributes into a data structure.
Unlike Records, they have a concept of private and public methods, and
can hide state inside. Unlike Tuples, the attributes are named and unordered.
Perhaps we should say,
_"A record too rigid, a tuple too direct? Don't be afraid to use an object."_

## Object - Links

-   [Reason Docs on Objects](https://reasonml.github.io/docs/en/object.html)
-   [Real World OCaml on Objects](https://realworldocaml.org/v1/en/html/objects.html)

Image Credit: [_Objects_ by kim anh on Flickr](https://www.flickr.com/photos/kim-anh-doan/10067272885/in/faves-74885459@N00/)

_[Edit this post here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2018-03-02--objects/index.md)_
