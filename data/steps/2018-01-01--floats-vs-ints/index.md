---
title: Floats vs Ints
createdDate: "2018-01-01"
updatedDate: "2017-01-01"
author: "Myer Nore"
tags:
  - floats
image: default.jpg
draft: true
---

## Integers and Floating Points

Recall the cube function:

    Reason # let cube = (x) => x * x * x;
    let cube: (int) => int = <fun>;                                                                    
    Reason # cube;
    - : (int) => int = <fun>                                                                           
    Reason # cube(3);
    - : int = 27                                                                                       

When we declared the `cube` function, Reason decided that it would take an `int` and 
return an `int`. So if we try to pass it `3.5`, it throws a type error: 

    Reason # cube(3.5);
    Error: This expression has type float but an expression was expected of type int

How would we declare a cube function that took floats? By looking at the Reason docs for 
[floats and ints](https://reasonml.github.io/guide/language/integer-and-float), we can 
see that multiplying floats is done with `*.`: 

    Reason # 3.2 *. 3.2;
    - : float = 10.240000000000002                                                                     
    Reason # let cube = (x: float) => x *. x *. x;
    let cube: (float) => float = <fun>;                                                                
    Reason # cube(3.2);
    - : float = 32.7680000000000078                                                                    
    Reason # cube(3);
    Error: This expression has type int but an expression was expected of type float

_[Edit this post here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2018-01-01--floats-vs-ints/index.md)_

## TODO

-   [ ] Replace default.jpg image for this step
-   [ ] Write an awesome article
-   [ ] Remove these todos
-   [ ] `git add ./data/steps/2017-12-01--floats-vs-ints; git commit -m "Added Floats vs Ints step"`
-   [ ] PR to [gradus-reason](https://github.com/codekiln/gradus-reason)
