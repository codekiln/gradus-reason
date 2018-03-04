/* declare a record type */
type contactRecord = {
  name: string,
  twitter: option(string)
};

let printContactRec = (contact: contactRecord) =>
  switch contact.twitter {
  | Some(tw) => Js.log(contact.name ++ " has twitter " ++ tw)
  | None => Js.log(contact.name ++ " doesn't have a twitter")
  };

/*
 instantiate a record with type contactRecord
 (note: the type annotation is optional)
 */
let contactRec: contactRecord = {
  name: "Donald Knuth",
  twitter: Some("taocp@cs.stanford.edu")
};

printContactRec(contactRec);

/* declare a "closed" object type - note the single period {. */
type contactObj = {
  .
  name: string,
  twitter: option(string)
};

let printContactObj = (contact: contactObj) =>
  switch contact#twitter {
  | Some(tw) => Js.log(contact#name ++ " has twitter " ++ tw)
  | None => Js.log(contact#name ++ " doesn't have a twitter")
  };

let myContact: contactObj = {
  pub name = "Kehinde Wiley";
  pub twitter = Some("@kehindewileyart")
};

printContactObj(myContact);