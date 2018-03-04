---
title: Objects
createdDate: "2018-03-02"
updatedDate: "2018-03-02"
author: "Myer Nore"
tags:
  - objects
  - records
  - json
image: default.jpg
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

There is a proverb in cooking lore: _"An onion too strong, a chive too weak? Don't be 
afraid to use a leek."_ This saying points to how many people don't quite know what
to use leeks for in cooking. We have a similar situation in Reason about objects;
it's not always clear what to do with an object.

They are a bit more flexible than Records, and yet they still group attributes
in a way that's named, unlike a tuple. Perhaps we should say, _"A record too rigid, 
a tuple too direct? Don't be afraid to use an object."_ 

## 

## Object - Links

-   [Reason Docs on Objects](https://reasonml.github.io/docs/en/object.html)
-   [Real World OCaml on Objects](https://realworldocaml.org/v1/en/html/objects.html)

_[Edit this post here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2018-03-02--objects/index.md)_
