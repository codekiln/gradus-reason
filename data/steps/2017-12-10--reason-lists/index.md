---
title: Reason Lists
createdDate: "2017-12-10"
updatedDate: "2017-12-10"
author: "Myer Nore"
tags:
  - lists
image: default.jpg
draft: true
---

The [Reason docs for lists are here](https://reasonml.github.io/guide/language/list-and-array). Basically,
a list in Reason OCaml specifically refers to a linked list data structure. 

Here's a quick example to record how to filter a list and print it out:

```reason
let myStrs = ["", "a", "ab", "abc", "abcd", "abcde"];
myStrs 
	|> List.filter((mystr) => String.length(mystr) > 2) 
	|> List.iter(Js.log)
```

(_Edit this post 
[here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2017-12-10--reason-lists/index.md)!_)