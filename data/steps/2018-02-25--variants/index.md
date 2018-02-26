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

## Variant—Case Constants For Switch Statements

Like a [`enum`](https://en.wikipedia.org/wiki/Enumerated_type#TypeScript),
a Variant is a set of mutually exclusive choices, meant to be used
with a `switch` statement to easy handle different cases:

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

Here, the expression `type animal = Dog | Cat | Bird` creates a
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

The Variants used above are constructed with zero parameters; to use
the example above, `Dog` constructs a `speakingAnimal` type without
providing any additional information.

It is also possible to declare Variants that take parameters, which allow
for structured information to be conveyed in the type.

Imagine we wanted to mark up text for the web. The following types
may be useful:

```reason
type htmlColor =
  | Black | Silver | Gray | White | Maroon | Red | Purple | Fuchsia
  | Green | Lime | Olive | Yellow | Navy | Blue | Teal | Aqua;

type weight =
  | Regular
  | Bold;

type color =
  | NamedColor(htmlColor, weight)
  | RGB(int, int, int)
  | Gray(int)
  | DefaultColor;

type styledText = {
    text: string,
    color: color
};

type styledParagraph = List(styledText);

let render = (txt, ~style="") =>
    "[span style=" ++ style ++ " text=" ++ txt ++ "]";

let renderStyledParagraph = fun
  | styledText(text, DefaultColor) => render(text);

let myParagraph = [
  styledText("The quick ", DefaultColor),
  styledText("brown ", RGB(176, 61, 50),
  styledText("fox ", NamedColor(Red, Regular)),
  styledText("jumps over the lazy ", DefaultColor),
  styledText("dog.", Gray(166))
];

renderStyledParagraph(myParagraph) |> List.iter(Js.log);
```

Variants can also

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
```

## Links

Here are a few links to other sites that have discussed Variants in
OCaml. Reminder: if you have [reason-tools](https://github.com/reasonml/reason-tools)
installed in Chrome, you can automatically convert between OCaml examples
you see on the web and ReasonML.

-   [Variants - ReasonML Docs](https://reasonml.github.io/docs/en/variant.html)
-   [Variants - Real World OCaml Book](https://realworldocaml.org/v1/en/html/variants.html)
-   [Variants - OCaml Docs](https://ocaml.org/learn/tutorials/data_types_and_matching.html#Variants-qualified-unions-and-enums)
-   [Variants - Haifeng Li's blog](https://haifengl.wordpress.com/2014/07/07/ocaml-algebraic-data-types/)

Image Credit: [_CN Cabin D in Toronto, ON in September 1979_ by Marty Bernard on Flickr](https://www.flickr.com/photos/129679309@N05/32569599444/in/photolist-RC4Hd1-qhmqiA-bVcPXy-dYSEjP-pZq2kZ-iGgxJm-pYe764-SarC3H-V1ZZXS-S2jFSV-RD9TFL-og85Jk-e8ZH8z-SarCrZ-fAt8uA-dj84X4-fHefXD-ekbZ9d-fEdYa8-4f7tYS-e7ppLe-e77Gc9-6Ju6DB-88sE3m-aixzwa-q3Mv4v-85xzzy-omYRht-nYDooo-cCqh2d-22tvuqF-f3FnJ-nQGj9r-34gAKS-4DMuyv-bCcJcX-bCcHcR-SARC5E-pj8Yga-fNXRjJ-88pqqH-fEdZZF-qdN8Bz-dN6QcC-8Ygz59-pvifGf-BMLF4X-dx5pDh-UoeTw6-aZM6kZ)

_[Edit this post here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2018-02-25--variants/index.md)_
