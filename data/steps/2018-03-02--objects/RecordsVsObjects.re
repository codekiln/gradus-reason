/* declare a record type */
type contactRecord = {
    name: string,
    email: string
};
  
/* 
instantiate a record with type contactRecord
(note: the type annotation is optional)
*/
let contactRec: contactRecord = {
    name: "Donald Knuth"
    email: "taocp@cs.stanford.edu"
};

Js.log(contactRec.name ++ " has/had email " ++ contactRec.email);

/* declare a "closed" object type - note the single period {. */
type contactObj = {.
    name: string,
    twitter: string
};

/* instantiate a closed object type */
let contactObj: contactObject = {
    name: "Cheng Lou",
    twitter: "@_chenglou"
};

Js.log(contactObj##name ++ " has twitter " ++ contactObj##twitter);