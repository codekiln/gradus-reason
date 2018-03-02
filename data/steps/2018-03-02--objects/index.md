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

## Records Vs Objects - Syntax

```reason
/* declare a record type */
type contactRecord = {
    name: string,
    email: string
};
  
/* 
instantiate a record with type contactRecord
(note: the type annotation is optional)
*/
let contactRec: contactRecord = {
    name: "Donald Knuth"
    email: "taocp@cs.stanford.edu"
};

Js.log(contactRec.name ++ " has/had email " ++ contactRec.email);

/* declare a "closed" object type - note the single period {. */
type contactObj = {.
    name: string,
    twitter: string
};

/* instantiate a closed object type */
let contactObj: contactObject = {
name: "Cheng Lou",
twitter: "@_chenglou"
};

Js.log(contactObj.name ++ " has/had twitter " ++ contactObj.twitter);
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

_[Edit this post here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2018-03-02--objects/index.md)_
