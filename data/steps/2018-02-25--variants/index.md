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

## Intro to Variants

The ReasonML docs [call Variants the "crown jewel" of the language](https://reasonml.github.io/docs/en/variant.html).

The simplest way to think of a Variant is that it is a `type` expression
that makes it easy to use with a switch statement:

```reason
type speakingAnimal = Dog | Cat | Bird;

/* technically, you don't need the type annotations here,
   but they are instructive */
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

Image Credit: [_CN Cabin D in Toronto, ON in September 1979_ by Marty Bernard on Flickr](https://www.flickr.com/photos/129679309@N05/32569599444/in/photolist-RC4Hd1-qhmqiA-bVcPXy-dYSEjP-pZq2kZ-iGgxJm-pYe764-SarC3H-V1ZZXS-S2jFSV-RD9TFL-og85Jk-e8ZH8z-SarCrZ-fAt8uA-dj84X4-fHefXD-ekbZ9d-fEdYa8-4f7tYS-e7ppLe-e77Gc9-6Ju6DB-88sE3m-aixzwa-q3Mv4v-85xzzy-omYRht-nYDooo-cCqh2d-22tvuqF-f3FnJ-nQGj9r-34gAKS-4DMuyv-bCcJcX-bCcHcR-SARC5E-pj8Yga-fNXRjJ-88pqqH-fEdZZF-qdN8Bz-dN6QcC-8Ygz59-pvifGf-BMLF4X-dx5pDh-UoeTw6-aZM6kZ)

_[Edit this post here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2018-02-25--variants/index.md)_
