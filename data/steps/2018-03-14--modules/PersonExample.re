/**
 * We're going to implement a Person module below that will define
 * the Person type and group it with its associated functions.
 * First, though we define an interface that callers will use.
 * This is like a "whitelist"; only things in the `module type` are
 * accessible outside the module. This is similar to an interface
 * in Java, if you are familiar with that.
 */
module type PersonType = {
  type t;
  let make: (~name: string) => t;
  let toString: t => string;
};

/**
 * This is an implementation of the PersonType interface defined above.
 * We can put things in here that are not in the interface, and
 * the compiler will hide them from .
 **/
module BasicPerson: PersonType = {
  type t = {name: string};
  let make = (~name: string) => {name: name};
  let toString = t => "name: " ++ t.name;
};

let p1 = BasicPerson.make(~name="Jason Hickey");

Js.log(BasicPerson.toString(p1));