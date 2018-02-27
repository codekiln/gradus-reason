---
title: Records
createdDate: "2018-02-23"
updatedDate: "2018-02-23"
author: "Myer Nore"
tags:
  - records
image: records_by_thomas_on_flickr.jpg
draft: false
---

## Intro to Record Types

A [Record](https://reasonml.github.io/docs/en/record.html)
is a declaration of a new datastructure with certain fixed attributes.
To make a new Record type, use the `type` keyword with the curly braces:

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

Record types are rigid; after declaration, you cannot add, remove
or change the record type's attributes.

Record type names and their attributes are expected
to be lowercase.

This example comes from the excellent talk
[_Domain Modeling Made Functional_ by Scott Wlaschin](https://www.youtube.com/watch?v=Up7LcbGZFuo).
We will revisit and improve this type as more of ReasonML is uncovered in
future posts.

## Record Examples

### Update a Record with the spread operator

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

let greet = (p: contact) => {
  Js.log("greetings " ++ p.firstName);
  let verifiedStr = p.isEmailVerified
    ? "email is verified"
    : "email isn't verified";
  Js.log("your " ++ verifiedStr);
};

greet(person1);

Js.log("----------");

/* update the email address verified field */
let person1: contact = {
  ...person1,
  isEmailVerified: true
};

greet(person1);
```

The update syntax using the spread operator "`...`" returns a new object
with the previous properties copied in. This is called "immutable update"
because the previous object is not changed in memory; instead, a new
object is created.

## Links

-   [Reason Docs: Record](https://reasonml.github.io/docs/en/record.html)
-   [ReasonML: records - by Dr. Axel Rauschmayer](http://2ality.com/2018/01/records-reasonml.html)

Image Credit: [_Records_ by Thomas on Flickr](https://www.flickr.com/photos/_-o-_/8091614099/in/photolist-dk2CXV-2eZnAT-9uDtSe-uv9kE-mPvd2i-95NWFe-5AvX1a-7wWD4H-6bfdTu-4E2uq-68Y9SC-9fZsgA-duu53y-9uGsXs-9uFu1V-9uJs7J-9uDtHR-mt9Tut-9uDsnt-UobUs7-7jVeAU-a9aAQQ-W7qamU-9tPRui-cp8HB-72aKnT-6f461Y-qtdqN5-9uJsXo-jKHWo-bJ7wW-6Menaa-AprvT8-4hJbaM-4hJ7UR-gNux1-4Nt7uf-SSRFx4-4hNbUm-4hJ7kD-57qf9P-4hNfzq-4hJ756-97625P-4hJ89H-9762ci-ffSKCZ-ajarzJ-HkD166-8MafAw/)

_[Edit this post here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2018-02-23--records/index.md)_
