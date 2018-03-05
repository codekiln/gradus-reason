type htmlColor =
  | Black
  | Silver
  | Gray
  | White
  | Maroon
  | Red
  | Purple
  | Fuchsia
  | Green
  | Lime
  | Olive
  | Yellow
  | Navy
  | Blue
  | Teal
  | Aqua;

type weight =
  | Regular
  | Bold;

type color =
  | NamedColor(htmlColor, weight)
  | RGB(int, int, int)
  | Gray(int)
  | DefaultColor;

type styledText = {
  text: string,
  color
};

type styledParagraph =
  | List(styledText);
/* let render = (txt, ~style="") =>
   "[span style=" ++ style ++ " text=" ++ txt ++ "]"; */
/* let renderStyledParagraph = fun
     | {text: t, DefaultColor} => render(t);

   let myParagraph = [
     styledText(text: "The quick ", color: DefaultColor),
     styledText("brown ", RGB(176, 61, 50),
     styledText("fox ", NamedColor(Red, Regular)),
     styledText("jumps over the lazy ", DefaultColor),
     styledText("dog.", Gray(166))
   ];

   renderStyledParagraph(myParagraph) |> List.iter(Js.log); */