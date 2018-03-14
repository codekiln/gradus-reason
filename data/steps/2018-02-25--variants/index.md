---
title: Variants
createdDate: "2018-02-25"
updatedDate: "2018-02-25"
author: "Myer Nore"
tags:
  - variants
image: CN_Cabin_D_in_Toronto_by_Marty_Bernard_on_Flickr.jpg
draft: false
---

## Variants are case constants for switch statements.

A Variant is a set of mutually exclusive cases to choose from.

```reason
type speakingAnimal = Dog | Cat | Bird;

let speak = (pet) => {
  switch (pet) {
  | Dog => "Woof!"
  | Cat => "Meow!"
  | Bird => "Tweet!"
  }
};

List.map(speak, [Dog, Cat, Bird])
  |> List.iter(Js.log);
```

The expression `type animal = Dog | Cat | Bird` creates a
composed type `animal` which consists of and three new types,
`Dog`, `Cat` and `Bird`. The `speak` function has the type
`(pet: speakingAnimal): string`, so it takes a `speakingAnimal`
concrete type and it produces a string.

This is so common in ReasonML that there is some syntax sugar for
making a function that matches based on a single argument,
which is appropriately namd `fun`:

```reason
type speakingAnimal = Dog | Cat | Bird;

let speak = fun
  | Dog => "Woof!"
  | Cat => "Meow!"
  | Bird => "Tweet!";

List.map(speak, [Dog, Cat, Bird])
  |> List.iter(Js.log);
```

If you want to know more about this syntax, see
[Single Argument Match Functions in the Reason docs](https://reasonml.github.io/docs/en/comparison-to-ocaml.html#single-argument-match-functions).

## Variant—Like Legos For Types

Variants let you combine types like legos, snapping them together.

The Variants above are constructed with zero parameters; `Dog`
constructs a `speakingAnimal` type without providing any additional
information.

It is also possible to declare Variants with take parameters, which
allow for structured information to be conveyed in the type.

Imagine we wanted to capture contact information, and that we had
a business rule that a person must have a primary contact
and may have a secondary contact, and each contact method could
be either verified or unverified, and valid contact types include
email and phone. The following example lays out some types that can
model this domain:

```reason
type contactInfo =
  | Email(string)
  | Phone(string);

type verifiable('a) =
  | Verified('a)
  | Unverified('a);

/* we can easily make an alias for a compound type */
type verifiableContactable = verifiable(contactInfo);

type user = {
  name: string,
  contact1: verifiableContactable,
  contact2: option(verifiableContactable)
};

let users = [
  {
    name: "Lisa R. Gibbons",
    contact1: Unverified(Email("LisaRGibbons@armyspy.com")),
    contact2: None
  },
  {
    name: "Adam L. Petty",
    contact1: Verified(Phone("208-580-5336")),
    contact2: Some(Unverified(Email("AdamLPetty@dayrep.com")))
  }
];

let renderContactable =
  fun
  | Email(em) => "email " ++ em
  | Phone(ph) => "phone " ++ ph;

let renderVerifiable =
  fun
  | Verified(info) => " (ver. " ++ renderContactable(info) ++ ")"
  | Unverified(info) => " (unver. " ++ renderContactable(info) ++ ")";

let renderUser =
  fun
  | {name, contact1: c1, contact2: None} => name ++ " " ++ renderVerifiable(c1)
  | {name, contact1: c1, contact2: Some(c2)} =>
    name ++ " " ++ renderVerifiable(c1) ++ ", " ++ renderVerifiable(c2);

List.map(renderUser, users) |> List.iter(Js.log);
```

In this example, the `contactInfo` variant has two type constructors.
Unlike the `Dog` type constructor that didn't take any parameters,
each `contactInfo` takes a single string as a parmeter: this means that
you can't construct an `Email` or `Phone` without providing a string.

The `verifiable` variant takes a type and returns two types, one
which is `Verified`, and one which is `Unverified` for that passed type.
The `verifiable` variant doesn't need to know anything about the types
it surrounds and conveys information for.

When we set up the `user` record type, we declare that `contact1` must
be a `verifiableContactable`, which is a type alias for either a verified
or unverified email or phone.

By using the [Single Argument Match Functions](https://reasonml.github.io/docs/en/comparison-to-ocaml.html#single-argument-match-functions),
it's easy to construct several render functions that can print
all the combinations of users. Try adding some users above with different
combinations, or changing the render format.

This example also features the [**option type**](https://reasonml.github.io/docs/en/newcomer-examples.html#using-the-option-type), which is quite simple and heavily used.
The option type represents either Some(something) or None. By representing
an option this way, we can avoid [three valued logic](https://en.wikipedia.org/wiki/Three-valued_logic)
and know for sure whether something exists or not.

## Variant—Trees of Types

Variants can even point to themselves, to convey a tree-like structure:

```reason
type binary_tree =
  | Leaf(int)
  | Tree(binary_tree, binary_tree);

let myTree = Tree(
    (
        Tree(
            (
            Leaf(3),
            Leaf(4)
            )
        ),
        Leaf(5)
    )
);

/**
Exercise left to user: print the tree!
**/
```

## Links

Here are a few links to other sites that have discussed Variants in
OCaml. Reminder: if you have [reason-tools](https://github.com/reasonml/reason-tools)
installed in Chrome, you can automatically convert between OCaml examples
you see on the web and ReasonML.

-   [Variants - ReasonML Docs](https://reasonml.github.io/docs/en/variant.html)
-   [Variants - _Exploring ReasonML_ Book by Dr. Axel Rauschmayer](http://reasonmlhub.com/exploring-reasonml/ch_variants.html)
-   [Variants - Real World OCaml Book](https://realworldocaml.org/v1/en/html/variants.html)
-   [Variants - OCaml Docs](https://ocaml.org/learn/tutorials/data_types_and_matching.html#Variants-qualified-unions-and-enums)
-   [Variants - Haifeng Li's blog](https://haifengl.wordpress.com/2014/07/07/ocaml-algebraic-data-types/)
-   [`enum` - Wikipedia](https://en.wikipedia.org/wiki/Enumerated_type#TypeScript)

Image Credit: [_CN Cabin D in Toronto, ON in September 1979_ by Marty Bernard on Flickr](https://www.flickr.com/photos/129679309@N05/32569599444/in/photolist-RC4Hd1-qhmqiA-bVcPXy-dYSEjP-pZq2kZ-iGgxJm-pYe764-SarC3H-V1ZZXS-S2jFSV-RD9TFL-og85Jk-e8ZH8z-SarCrZ-fAt8uA-dj84X4-fHefXD-ekbZ9d-fEdYa8-4f7tYS-e7ppLe-e77Gc9-6Ju6DB-88sE3m-aixzwa-q3Mv4v-85xzzy-omYRht-nYDooo-cCqh2d-22tvuqF-f3FnJ-nQGj9r-34gAKS-4DMuyv-bCcJcX-bCcHcR-SARC5E-pj8Yga-fNXRjJ-88pqqH-fEdZZF-qdN8Bz-dN6QcC-8Ygz59-pvifGf-BMLF4X-dx5pDh-UoeTw6-aZM6kZ)

_[Edit this post here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2018-02-25--variants/index.md)_
