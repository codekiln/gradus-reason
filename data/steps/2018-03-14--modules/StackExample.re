module type INT_STACK = {
  type t;
  /* create an empty stack */
  let empty: unit => t;
  /* push an element on the top of the stack */
  let push: (int, t) => t;
  /* returns true iff the stack is empty */
  let is_empty: t => bool;
  /* pops top element off the stack;
     returns empty stack if the stack is empty */
  let pop: t => t;
  /* returns the top element of the stack; returns
     None if the stack is empty */
  let top: t => option(int);
};

module ListIntStack: INT_STACK = {
  type stack = list(int);
  type t = stack;
  let empty = () : stack => [];
  let push = (i: int, s: stack) => [i, ...s];
  let is_empty = (s: stack) =>
    switch (s) {
    | [] => true
    | [_, ..._] => false
    };
  let pop = (s: stack) =>
    switch (s) {
    | [] => []
    | [_, ...t] => t
    };
  let top = (s: stack) =>
    switch (s) {
    | [] => None
    | [h, ..._] => Some(h)
    };
};