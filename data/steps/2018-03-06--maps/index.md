---
title: Maps
createdDate: "2018-03-06"
updatedDate: "2018-03-06"
author: "Myer Nore"
tags:
  - hashtables
  - maps
  - records
  - fold_left
  - j_string_interpolation
image: warburton_post_office_boxes_by_mic_stanic_on_flickr.jpg
draft: false
---

## Maps - Intro

In many applications it becomes necessary to look up a 
[Record](/steps/tags/records/), [Object](/steps/tags/objects/) or
other data structure by a unique identifier, just as a phone book
enables one look up a person's phone number by their name. This structure
goes by many names: hashtable, lookup table, hashmap, dict, dictionary, map, etc.
There are tools for this in ReasonML, but two good choices are: 

-   Use [`Map`](https://reasonml.github.io/api/Map.html) from Reason's OCaml standard API. 
    This is a good general-purpose, performant, immutable dictionary and should probably be 
    the first choice. 
-   Use Bucklescript's [Object as Hash Map`Js.Dict.t`](https://bucklescript.github.io/docs/en/object.html#object-as-record).
    This is is a thin wrapper over the mutable Javascript object.
    It's a good option you are worried about minimizing your bundle size or
    are modifying objects that come from JS. 

### Side Note: Reason & OCaml Standard Libraries

If you go to the [Reason docs](https://reasonml.github.io/docs/en/overview.html) and search
for `Map` today, you won't find any resources for `Map`. There are many
features in Reason that are supplied by OCaml's standard
library, whose docs are [accessible on the API tab of the Reason site](https://reasonml.github.io/api/index.html),
though certain elements of the standard API are not currently indexed 
by the search engine or given much coverage in the standard Reason docs. 
If you look in the API tab, you'll find [`Map - Association tables over ordered types`](https://reasonml.github.io/api/Map.html) is one of API entries, 
but the API docs can be a little sparse. In cases like this I find it helpful
to search for the item in Real World OCaml book or in Stack Overflow's OCaml posts, 
and then use [the Reason Tools browser extension](https://chrome.google.com/webstore/detail/reason-tools/kmdelnjbembbiodplmhgfjpecibfhadd) 
to convert any examples to Reason. See the Links section at the bottom of this post
for more information.

## Construct a `Map` From a `List`

This example declares a new [Record](/steps/tags/records/) type
called `composer`, then constructs a new `Map` type with `String` instances 
as the lookup keys. After we have minted a specialized `StringMap` Module,
we create a `getComposerMap` function which converts a `list` of `composer` types 
into the `StringMap`. Note: We haven't talked about `Modules` yet in Gradus Reason.

```reason
type composer = {
    id: string,
    name: string
  };
  
module StringMap = Map.Make(String);

let getComposerMap = (composers: list(composer)) => {
    List.fold_left(
        (map, user) => StringMap.add(user.id, user.name, map),
        StringMap.empty,
        composers
    )
};

let composers: list(composer) = [
    {id: "lbeethoven", name: "Ludwig van Beethoven"},
    {id: "wmozart", name: "Wolfgang Amadeus Mozart"},
    {id: "jbrahms", name: "Johannes Brahms"}
];

getComposerMap(composers) 
  |> StringMap.iter (
    (id, composerName) => Js.log({j|key:$id, val:$composerName|j})
    )
```

This example is powered by: 

-   [`String`](https://reasonml.github.io/api/String.html),
    the `String` module from the Reason OCaml standard API, which is 
    a `Module` that operates on entities of the [`string`](https://realworldocaml.org/v1/en/html/imperative-programming-1.html#strings) 
    type. 
-   [`List.fold_left`](https://reasonml.github.io/api/List.html#VALfold_left), which is 
    The Reason equivalent of Javascript's [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce). 
    This iterates over an object and accumulates results into another object.
    Here, we pass the function that will be applied to each element of the list: 
    `(map, user) => StringMap.add(user.id, user.name, map)`. This function that we supply 
    itself takes two parameters. The first parameter (here, `map`) is the variable 
    to accumulate results in. The second parameter (here, `user`) is the current object
    in the iteration:
    ```
    List.fold_left(
            (map, user) => StringMap.add(user.id, user.name, map),
            StringMap.empty,
            composers
        )
    ```
    This takes the `composers` array, which is a `list` of `composer` types,
    and executes the supplied folding function `(map, user) => StringMap.add(user.id, user.name, map)`.
    For the first composer, `map` is `StringMap.empty`. For all the other
    composers, the `map` parameter is the cumulative result of calling 
    `StringMap.add(user.id, user.name, map)`. At the end of `fold_left`, the last
    composer returns the newly filled `StringMap`.
-   [BuckleScript's `j` string interpolation](https://bucklescript.github.io/docs/en/common-data-types.html#interpolation), which 
    looks like `{j|key:$id, val:$composerName|j}` and is the equivalent of JS' [string interpolation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). Here, the
    `$id` and `$composerName` variables are resolved from block scope into a `string`.

## Map - Links

-   [Reason Standard API's _Map_](https://reasonml.github.io/api/Map.html)
-   [_Real World OCaml_ on Maps](https://realworldocaml.org/v1/en/html/maps-and-hash-tables.html)
-   [Glennsl's _bucklescript-cookbook_ guide to Maps and their alternatives](https://github.com/glennsl/bucklescript-cookbook#create-a-map-data-structure-add-or-replace-an-entry-and-print-each-keyvalue-pair)
-   [Reason Discord discussion on Map vs Js.Dict.t](https://discordapp.com/channels/235176658175262720/235176658175262720?jump=419986814288265216)
-   [`List.fold_left`](https://reasonml.github.io/api/List.html#VALfold_left) is 
    the Reason equivalent to JS' [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce). 
    Here's a [Codepen - ES6 + array.reduce](https://codepen.io/codekiln/pen/NXdmvB)

Image Credit: [_Warburton Post Office Boxes_ by Mick Stanic on Flickr](https://www.flickr.com/photos/splatt/316215760/)

## Post - TODO

-   [ ] provide a link here to the `Modules` Gradus Reason step when created.

_[Edit this post here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2018-03-06--maps/index.md)_
