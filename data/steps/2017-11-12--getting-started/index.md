---
title: Getting Started
createdDate: "2017-11-13"
updatedDate: "2017-11-23"
author: "Myer Nore"
tags:
  - meta
  - rtop
  - conditionals
  - operator_precedence
  - booleans
image: gradus_header.png
draft: false
---

## About Gradus Reason

Welcome to _Gradus Reason_. This site is a place to learn the [Reason OCaml](https://reasonml.github.io/) 
language.

The name _Gradus_ is a reference to ancient language textbooks such as 
[_Gradus ad Parnassum_](https://en.wikipedia.org/wiki/Gradus_ad_Parnassum), which were used 
by early scholars to learn Latin and Greek. The title meant 
"Steps to Parnassus," a mountain range in Greece that was symbolically important for 
the arts and creative activity.

The posts here aim to be instructive and contain plenty of examples that mark the 
steps of learning the language. They are particularly oriented toward those with 
no familiarity with OCaml.

## Getting Started With The `rtop` REPL

When learning ReasonML, it is helpful to use `rtop` locally, 
Reason's **R**ead **E**val **P**rint **L**oop (REPL). `rtop`'s name comes from 
OCaml's `utop`, which stands for "User Toplevel," meaning, a user-interactive 
top-level shell. Here, it's `rtop`, since it's a Reason Toplevel.

To install it, [follow the instructions in the reason guide](https://reasonml.github.io/guide/editor-tools/global-installation/#recommended-through-npmyarn). If you 
use yarn and have a mac, you can install it with: 
`yarn global add https://github.com/reasonml/reason-cli/archive/3.0.1-bin-darwin.tar.gz`
. After everything is installed, you should be able to execute `rtop` in your terminal to get
the interactive prompt:

    $ rtop
    ──────────────────┬─────────────────────────────────────────────────────────────┬──────────────────
                      │ Welcome to utop version 2.0.1 (using OCaml version 4.02.3)! │
                      └─────────────────────────────────────────────────────────────┘

                       ___  _______   ________  _  __
                      / _ \/ __/ _ | / __/ __ \/ |/ /
                     / , _/ _// __ |_\ \/ /_/ /    /
                    /_/|_/___/_/ |_/___/\____/_/|_/

      Execute statements/let bindings. Hit <enter> after the semicolon. Ctrl-d to quit.

            >   let myVar = "Hello Reason!";
            >   let myList: list string = ["first", "second"];
            >   #use "./src/myFile.re"; /* loads the file into here */

    Type #utop_help for help about using utop.

    Reason # 1 + 2 * 3;
    - : int = 7

## Example 1: `1 + 2 * 3`

    Reason # 1 + 2 * 3;
    - : int = 7

If you enter `1 + 2 * 3;` you get back the response `- : int = 7`.
Reason returns the result of the expression along with the type of the result; 
here 7 was interpreted as an **int**eger. 

The multiplication operator `*` was performed before `+`, which means that it has 
higher operator precedence. What if you wanted to find out about operator precedence 
in Reason? With Reason it's advisable to start with 
[doing a google site search of reasonml.github.io](https://www.google.com/search?q=site:reasonml.github.io+precedence).

In this case, there aren't any results that explicitly show an operator precedence table,
which is standard for language documentation (see, for example, the [python language operator precedence](https://docs.python.org/3/reference/expressions.html#operator-precedence).) The next step would be to 
do [a site search of realworldocaml.org](https://www.google.com/search?q=site:realworldocaml.org+precedence), a great book about OCaml that is available online. That would lead
you to [the OCaml operator precedence table](https://realworldocaml.org/v1/en/html/variables-and-functions.html#table2_1).

This example shows how learning Reason involves searching Reason docs, 
then searching for backup documentation on OCaml. Reason is just a syntax of OCaml, 
so it should be the same except for where Reason says it deviates.

## Tour of the `rtop` REPL

Let's look at a few types in the REPL. First, we'll look at an expression that evaluates
to a boolean:

    Reason # 50 > 60;
    - : bool = false

See also [Reason docs on Booleans](https://reasonml.github.io/guide/language/boolean).

Here's an expression that evaluates to a character type: 

    Reason # 'c';
    - : char = 'c'

Here's an example that shows how Reason is strongly typed:

    Reason # 3 + true;
    Error: This expression has type bool but an expression was expected of type int

This turns out to be one of the great strengths of the language; it's possible to make
abstractions that are more difficult to misuse. 

Next, two examples showing conditional logic. See also [Reason docs on if-else](https://reasonml.github.io/guide/language/if-else).

    Reason # if (60 > 50) {0} else {1};
    - : int = 0                                                                                        
    Reason # 60 > 50 ? 0 : 1;
    - : int = 0                                                                                        

In the first, we see that in Reason if else is an _expression that returns a value_, 
just like ternary expressions. With one further example it's possible to see that 
in Reason, the branches of an if-else expression must return the same type: 

    Reason # if (60 > 50) {0} else {'c'};
    Error: This expression has type char but an expression was expected of type int

## To Explore:

1.  What is the type of expression returned by each of the following?
    1.  `30;`
    2.  `1000 / 100 / 10;`
    3.  `true || false;`
    4.  `true && false;`
    5.  `'a' + 'b';`
2.  Consider `1 + 2 mod 3`, `(1 + 2) mod 3`, and `1 + (2 mod 3)`. What does this mean 
    about `+` vs `mod`?
3.  What are the values of `min_int` and `max_int`? What do they come from?
4.  What happens if you do `'c' > 'b'`?

_[Edit this post here](https://github.com/codekiln/gradus-reason/tree/master/data/steps/2017-11-12--getting-started/index.md)_
