type composer = {
  id: string,
  name: string
};

module StringMap = Map.Make(String);

let getComposerMap = (users: list(composer)) =>
  List.fold_left(
    (map, user) => StringMap.add(user.id, user.name, map),
    StringMap.empty,
    users
  );

let composers: list(composer) = [
  {id: "lbeethoven", name: "Ludwig van Beethoven"},
  {id: "wmozart", name: "Wolfgang Amadeus Mozart"},
  {id: "jbrahms", name: "Johannes Brahms"}
];

getComposerMap(composers)
|> StringMap.iter((id, composerName) =>
     Js.log({j|key:$id, val:$composerName|j})
   );