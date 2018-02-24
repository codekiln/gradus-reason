---
title: Records
createdDate: "2018-02-23"
updatedDate: "2018-02-23"
author: "Myer Nore"
tags:
  - records
image: default.jpg
draft: false
---

## Intro to Record Types

A [Record](https://reasonml.github.io/docs/en/record.html)
is used for domain modeling, and is a declaration of a new `type`
with certain attributes and their types. To make a new Record type,
use the `type` keyword with the curly braces:

```reason
type contact = {
    firstName: string,
    middleInitial: string,
    lastName: string,
    emailAddress: string,
    isEmailVerified: bool
};

let person1: contact = {
    firstName: "Richard",
    middleInitial: "G",
    lastName: "Montgomery",
    emailAddress: "RichardGMontgomery@dayrep.com",
    isEmailVerified: false
};

Js.log("greetings, " ++ person1.firstName);
let verifiedStr = person1.isEmailVerified
  ? "is verified" : "is not verified";
Js.log("email " ++ verifiedStr);
```

Here, [`bool` is the ReasonML boolean](https://reasonml.github.io/docs/en/boolean.html), and [`string` is the ReasonML string](https://reasonml.github.io/docs/en/string-and-char.html).
A Record type definition is fairly rigid.

This example comes from the excellent talk
[_Domain Modeling Made Functional_ by Scott Wlaschin](https://www.youtube.com/watch?v=Up7LcbGZFuo).
We will revisit and improve this type as more of ReasonML is uncovered in
future posts.

_[Edit this post here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2018-02-23--records/index.md)_
