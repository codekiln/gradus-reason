type contactInfo =
  | Email(string)
  | Phone(string);

type verifiable('a) =
  | Verified('a)
  | Unverified('a);

/* we can easily make an alias for a compound type */
type verifiableContactable = verifiable(contactInfo);

type user = {
  name: string,
  contact1: verifiableContactable,
  contact2: option(verifiableContactable)
};

let users = [
  {
    name: "Lisa R. Gibbons",
    contact1: Unverified(Email("LisaRGibbons@armyspy.com")),
    contact2: None
  },
  {
    name: "Adam L. Petty",
    contact1: Verified(Phone("208-580-5336")),
    contact2: Some(Unverified(Email("AdamLPetty@dayrep.com")))
  }
];

let renderContactable =
  fun
  | Email(em) => "email " ++ em
  | Phone(ph) => "phone " ++ ph;

let renderVerifiable =
  fun
  | Verified(info) => " (ver. " ++ renderContactable(info) ++ ")"
  | Unverified(info) => " (unver. " ++ renderContactable(info) ++ ")";

let renderUser =
  fun
  | {name, contact1: c1, contact2: None} => name ++ " " ++ renderVerifiable(c1)
  | {name, contact1: c1, contact2: Some(c2)} =>
    name ++ " " ++ renderVerifiable(c1) ++ ", " ++ renderVerifiable(c2);

List.map(renderUser, users) |> List.iter(Js.log);