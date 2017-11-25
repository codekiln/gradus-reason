---
title: Filtering Reason Lists
createdDate: "2017-11-14"
updatedDate: "2017-11-14"
author: "Myer Nore"
tags:
  - lists
image: default.jpg
draft: false
---

Reason step / post / tutorial coming here soon ... please edit
[here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2017-11-14--filtering-reason-lists/index.md)!

It's now possible to get an editor in the blog post. To get reason syntax highlighting, just 
use a fenced code block marked with `reason`:

```reason
let myStrs = ["", "a", "ab", "abc", "abcd", "abcde"];
myStrs 
	|> List.filter((mystr) => String.length(mystr) > 2) 
	|> List.iter(Js.log)
```

## TODO

-   [ ] Replace default.jpg image for this step
-   [ ] Write an awesome article
-   [ ] Remove these todos
-   [ ] `git add ./data/steps/2017-11-14--filtering-reason-lists; git commit -m "Added Filtering Reason Lists step"`
-   [ ] PR to [gradus-reason](https://github.com/codekiln/gradus-reason)
