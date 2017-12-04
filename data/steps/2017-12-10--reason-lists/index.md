---
title: Reason Lists
createdDate: "2017-12-10"
updatedDate: "2017-12-10"
author: "Myer Nore"
tags:
  - lists
image: list_by_nik_stanbridge_on_flickr.jpg
draft: false
---

## Intro to Lists

The [Reason docs for lists are here](https://reasonml.github.io/guide/language/list-and-array), and 
[the API docs for the List module are here](https://reasonml.github.io/api/List.html). 
A list in Reason OCaml is [linked list](https://en.wikipedia.org/wiki/Linked_list). 

In ReasonML, a List is divided into a single-element `head` and the rest of the list, 
called the `tail`.

## List Pattern Matching Examples

### List.length

The standard library has a [List.length](https://reasonml.github.io/api/List.html#VALlength) function, 
but if it didn't already, this is one possible implementation that uses pattern matching:

```reason
let length = (list) => {
  let rec addUpLength = (innerList, currentTotal) => {
    switch innerList {
    | [] => currentTotal
    | [head, ...tail] => addUpLength(tail, currentTotal + 1)
    };
  };
  addUpLength(list, 0)
};

let cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", 
              "Dallas", "San Jose", "Austin", "Jacksonville", "San Francisco", "Columbus", "Indianapolis", "Fort Worth", 
              "Charlotte", "Seattle", "Denver"];

Js.log(length(cities));
```

This example shows how pattern matching can match empty lists `[]` as well as lists
in the `[head, ...tail]` syntax. `head` and `tail` are not keywords here, they could be
anything. Try replacing the last case with `[foo, ...bar] => addUpLength(bar, currentTotal + 1)`.

This example also shows how you can declare a "hidden" function inside a function, which 
then can do a more optimized job. Here we're passing the total along in the parameter to the 
`addUpLength` function to get [Tail Call Optimization](https://en.wikipedia.org/wiki/Tail_call), which 
is basically a fancy way of saying that it uses less memory.

## List API Examples

### Filter a list of strings by length

```reason
let myStrs = ["", "a", "ab", "abc", "abcd", "abcde", "abcdef"];
myStrs 
	|> List.filter((mystr) => String.length(mystr) > 3) 
	|> List.iter(Js.log)
```

This example is powered by:

-   the "pipeline operator" `|>` from the [Pervasives standard library](https://reasonml.github.io/api/Pervasives.html#6_Compositionoperators) 
    Direct from the docs: "Reverse-application operator: `x |> f |> g` is exactly equivalent to `g(f(x))`," 
    or, said another way, the output of x is put into f, and the output of f is put into g.
-   [String.length](https://reasonml.github.io/api/String.html#VALlength)
-   [List.filter](https://reasonml.github.io/api/List.html#VALfilter), which takes a function that returns a boolean 
-   [List.iter](https://reasonml.github.io/api/List.html#VALiter), which takes a 
    function to execute on each item of an iterable; in this case, we're passing the results of filter
    into iter and executing Js.log on each one.

### Filter a list of strings by a search string

```reason
let str1InsideStr2 = (s1, s2) => Js.Re.fromString(s1) |> Js.Re.test(s2);

let cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", 
              "Dallas", "San Jose", "Austin", "Jacksonville", "San Francisco", "Columbus", "Indianapolis", "Fort Worth", 
              "Charlotte", "Seattle", "Denver"];

let searcher = str1InsideStr2("San");

let searchResults = cities
  |> List.filter(searcher)
  |> List.iter(Js.log);
```

In addition to `|>`, `filter` and `iter` from above, this example is powered by: 

-   [Js.Re from bucklescript](https://bucklescript.github.io/bucklescript/api/Js.Re.html),
    which is linked to as the appropriate regex solution in [the Reason docs](https://reasonml.github.io/guide/language/string-and-char).
-   [currying](https://reasonml.github.io/guide/language/function#currying), when we called
    `str1InsideStr2(s1, s2)` twice, first with the parameter "San" to search for, and second as the callback
    to filter. 

## List: Explorations

Write a function that, given a list, 
1\. ... returns the list reversed.
2\. ... returns the palindrome of that list. 
3\. ... and an item _i_, returns the first index of i in the list, and -1 otherwise.

Image Credit: [_List_ by Nik Stanbridge on Flickr](https://www.flickr.com/photos/eatmorechips/4409864210/in/photolist-RTupz-89gRpz-bmUhXz-4DRFUr-3dVPg-5abzWy-6rHgR1-89gQNP-6xCxfo-89gN2F-7Ujixw-89gU5r-89k4Ky-dSzDtN-7WBfAg-89gNJV-3mB89t-B5fMhw-cG8Pxm-9VG1S8-8b97w-63QX9B-rkYzrp-y5Vct-kLouK-98D7Uc-98Gffq-VvDvrd-98D6uM-po287f-QAXg39-wDFdbC-xzSiSQ-8DqirA-VvDvXJ-wiFftw-MpjHo7-KZD1N5-L1DEi2-LXdKcv-pSFpw7-b2VdLz-98GdLS-89gTrt-89k2Ad-7HFGZy-72NR3g-6jeekC-6hm77B-5h5qPj/)

(_Edit this post 
[here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2017-12-10--reason-lists/index.md)!_)
