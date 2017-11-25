import * as React from "react";
import debounce, {DebounceCallback} from "../utils/debounce";
import Editor from "../components/ReasonEditor";
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import {Segment} from "semantic-ui-react";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider/Divider";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu/Menu";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import {withPrefix} from "../gatsby-utils";

const examples = [{
  name: "Tree sum",
  // tslint:disable-next-line:object-literal-sort-keys
  code:
    `type tree = Leaf | Node(int, tree, tree);

let rec sum =
  fun
  | Leaf => 0
  | Node(value, left, right) => value + sum(left) + sum(right);

let myTree =
  Node(
    1,
    Node(2, Node(4, Leaf, Leaf), Node(6, Leaf, Leaf)),
    Node(3, Node(5, Leaf, Leaf), Node(7, Leaf, Leaf))
  );

sum(myTree) |> Js.log;`,
}, {
  name: "FFI - Base64",
  // tslint:disable-next-line:object-literal-sort-keys
  code:
    `[@bs.val] external btoa : string => string = "";
[@bs.val] external atob : string => string = "";

let text = "Hello World!";
Js.log(text |> btoa);
Js.log(text |> btoa |> atob);`,
}, {
  name: "Recursion - Factorial",
  // tslint:disable-next-line:object-literal-sort-keys
  code:
    `/* Based on https://rosettacode.org/wiki/Factorial#Recursive_50 */
let rec factorial = (n) =>
  n <= 0
  ? 1
  : n * factorial(n - 1);

Js.log(factorial(6));`,
}, {
  name: "Recursion - Greatest Common Divisor",
  // tslint:disable-next-line:object-literal-sort-keys
  code:
    `/* Based on https://rosettacode.org/wiki/Greatest_common_divisor#OCaml */
let rec gcd = (a, b) =>
  switch (a mod b) {
  | 0 => b
  | r => gcd(b, r)
  };

Js.log(gcd(27, 9));`,
}, {
  name: "Recursion - Towers of Hanoi",
  // tslint:disable-next-line:object-literal-sort-keys
  code:
    `/* Based on https://rosettacode.org/wiki/Towers_of_Hanoi#OCaml */
let rec hanoi = (n, a, b, c) =>
  if (n > 0) {
    hanoi(n - 1, a, c, b);
    Js.log({j|Move disk from pole $a to pole $b|j});
    hanoi(n - 1, c, b, a)
  };

hanoi(4, 1, 2, 3);`,
}, {
  name: "Json",
  // tslint:disable-next-line:object-literal-sort-keys
  code:
    `let person = {
  "name": {"first": "Bob", "last": "Zhmith"},
  "age": 32
};

let json =
  person
  |> Js.Json.stringifyAny
  |> Js.Option.getExn
  |> Js.Json.parseExn;

let name =
  json
  |> Js.Json.decodeObject
  |> Js.Option.andThen([@bs] ((p) => Js.Dict.get(p, "name")))
  |> Js.Option.andThen([@bs] ((json) => Js.Json.decodeObject(json)))
  |> Js.Option.getExn;

let firstName =
  Js.Dict.get(name, "first")
  |> Js.Option.andThen([@bs] ((json) => Js.Json.decodeString(json)))
  |> Js.Option.getExn;

let lastName =
  Js.Dict.get(name, "last")
  |> Js.Option.andThen([@bs] ((json) => Js.Json.decodeString(json)))
  |> Js.Option.getExn;

Js.log({j|Hello, $firstName $lastName|j});`,
}, {
  name: "FizzBuzz",
  // tslint:disable-next-line:object-literal-sort-keys
  code:
    `/* Based on https://rosettacode.org/wiki/FizzBuzz#OCaml */
let fizzbuzz = (i) =>
  switch (i mod 3, i mod 5) {
  | (0, 0) => "FizzBuzz"
  | (0, _) => "Fizz"
  | (_, 0) => "Buzz"
  | _ => string_of_int(i)
  };

for (i in 1 to 100) {
  Js.log(fizzbuzz(i))
};`,
}, {
  name: "Normal distribution of random numbers",
  // tslint:disable-next-line:object-literal-sort-keys
  code:
    `/* Based on https://rosettacode.org/wiki/Random_numbers#OCaml */
let pi = 4. *. atan(1.);

let random_gaussian = () =>
  1. +. sqrt((-2.) *. log(Random.float(1.))) *. cos(2. *. pi *. Random.float(1.));

Array.init(42, (_) => random_gaussian()) |> Array.iter(Js.log);`,
}, {
  name: "Regex",
  // tslint:disable-next-line:object-literal-sort-keys
  code:
    `let input = {|
  <html>
    <head>
      <title>A Simple HTML Document</title>
    </head>
    <body>
      <p>This is a very simple HTML document</p>
      <p>It only has two paragraphs</p>
    </body>
  </html>
|};

input
|> Js.String.match([%re "/<p\\b[^>]*>(.*?)<\\/p>/gi"])
|> (
  fun
  | Some(result) => result |> Js.Array.forEach(Js.log)
  | None => Js.log("no matches")
);`,
}, {
  name: "Quicksort",
  // tslint:disable-next-line:object-literal-sort-keys
  code:
    `/* Based on https://rosettacode.org/wiki/Sorting_algorithms/Quicksort#OCaml */
let rec quicksort = (gt) =>
  fun
  | [] => []
  | [x, ...xs] => {
      let (ys, zs) = List.partition(gt(x), xs);
      quicksort(gt, ys) @ [x, ...quicksort(gt, zs)]
    };

[4, 65, 2, (-31), 0, 99, 83, 782, 1] |> quicksort((>)) |> Array.of_list |> Js.log;`,
}, {
  name: "String interpolation",
  // tslint:disable-next-line:object-literal-sort-keys
  code:
    `for (a in 1 to 10) {
  for (b in 1 to 10) {
    let product = a * b;
    Js.log({j|$a times $b is $product|j})
  }
};`,
}];

const errorTimeout = 500;

const waitUntilScriptsLoaded = (done: () => void) => {
  if ((window as any)) {
    const tout = setInterval(() => {
      // test for bucklescript compiler existence and
      // refmt existence (one of the exposed method is printML)
      if ((window as any).ocaml && (window as any).printML) {
        clearInterval(tout);
        done();
      }
    }, 10);
  }
};

interface ErrorLocation {
  startLine: string;
  startLineStartChar: string;
  endLine: string;
  endLineEndChar: string;
}

interface SyntaxError extends Error {
  location: ErrorLocation;
}

const formatErrorLocation = ({startLine, startLineStartChar, endLine, endLineEndChar}: ErrorLocation) => {
  if (startLine === endLine) {
    if (startLineStartChar === endLineEndChar) {
      return `Line ${startLine}:${startLineStartChar}`;
    } else {
      return `Line ${startLine}:${startLineStartChar}-${endLineEndChar}`;
    }
  } else {
    return `Line ${startLine}:${startLineStartChar}-Line ${endLine}:${endLineEndChar}`;
  }
};

const stripErrorNumberFromReasonSyntaxError = (error) => {
  return error.replace(/\d+: /, "");
};

const capitalizeFirstChar = (str) => {
  if (str.length === 0) {
    return "";
  }
  return str[0].toUpperCase() + str.slice(1);
};

interface ICompilerOutput {
  type: string;
  contents: string[] | number;
}

interface ITryProps {
  autoEvaluate: true;
  js: string;
  jsIsLatest: false;
  ocaml: string;
  output: ICompilerOutput[];
  reason: string;
}

interface CompileError extends Error {
  js_error_msg: string;
}

interface ITryState {
  autoEvaluate: boolean;
  compileError?: CompileError | null;
  compileWarning?: Error;
  js: string;
  jsError?: Error | null;
  jsIsLatest: boolean;
  ocaml: string;
  ocamlSyntaxError?: SyntaxError | null;
  output: ICompilerOutput[];
  reason: string;
  reasonSyntaxError?: SyntaxError | null;
}

interface CompileResult {
  js_code: string;
}

export default class Try extends React.Component<ITryProps, ITryState> {
  state: ITryState = {
    autoEvaluate: true,
    js: "// loading",
    jsIsLatest: false,
    ocaml: "(* loading *)",
    output: [],
    reason: "/* loading */",
  };

  outputOverloaded = false;

  evalWorker: Worker;

  errorTimerId: NodeJS.Timer;

  tryCompiling: DebounceCallback = debounce((reason: string, ocaml: string) => {
    try {
      const [res, warning] = this.compile(ocaml);
      if (res.js_code) {
        this.setState((_) => ({
          compileWarning: warning,
          js: res.js_code,
          jsIsLatest: true,
        }));
        if (this.state.autoEvaluate) {
          this.evalJs(res.js_code);
        }
        return;
      } else {
        this.errorTimerId = setTimeout(
          () => this.setState((_) => ({
            compileError: res,
            compileWarning: null,
            js: "",
          })),
          errorTimeout,
        );
      }
    } catch (err) {
      this.errorTimerId = setTimeout(
        () => this.setState((_) => ({
          compileError: err,
          compileWarning: null,
          js: "",
        })),
        errorTimeout,
      );
    }
    this.setState(() => {
      return {
        compileError: null,
        compileWarning: null,
        jsIsLatest: false,
        output: [],
      };
    });
  }, 100);

  concatToOutputAndSetState = (item: ICompilerOutput) =>
    this.setState((state: ITryProps) => ({
      ...state,
      output: state.output.concat(item),
    }))

  output = (item: ICompilerOutput) => {
    if (this.outputOverloaded) {
      return;
    }

    if (this.state.output.length > 100) {
      this.outputOverloaded = true;
      this.concatToOutputAndSetState({type: "error", contents: ["[Too much output!]"]});
      return;
    }

    this.concatToOutputAndSetState(item);
  }

  initEvalWorker = () => {
    this.evalWorker = new Worker(withPrefix("/evalWorker.js"));
    this.evalWorker.onmessage = ({data}: MessageEvent) => {
      if (data.type === "end") {
        clearTimeout(data.contents as number);
      } else {
        this.output(data);
      }
    };
    this.evalWorker.onerror = (err) => {
      this.errorTimerId = setTimeout(
        () => this.setState((_) => ({
          jsError: err,
        })),
        errorTimeout,
      );
    };
  }

  evalJs(code) {
    this.outputOverloaded = false;
    this.setState(
      (state) => ({...state, output: []}),
      () => {
        const timerId = setTimeout(() => {
          this.evalWorker.terminate();
          this.initEvalWorker();
          this.concatToOutputAndSetState({type: "error", contents: ["[Evaluation timed out!]"]});
        }, 1000);
        this.evalWorker.postMessage({
          code: wrapInExports(code),
          timerId,
        });
      },
    );
  }

  componentDidMount() {
    waitUntilScriptsLoaded(() => {
      this.initEvalWorker();
      const {language, code} = {language: "reason", code: examples[0].code};
      language === "reason" ? this.updateReason(code) : this.updateOCaml(code);
    });
  }

  componentWillUnmount() {
    if (this.evalWorker) {
      this.evalWorker.terminate();
    }
  }

  updateReason = (newReasonCode: string) => {
    if (newReasonCode === this.state.reason) {
      return;
    }
    clearTimeout(this.errorTimerId);

    this.setState((prevState: ITryProps) => {
      let newOcamlCode = prevState.ocaml;
      try {
        const windowProxy = window as any;
        newOcamlCode = windowProxy.printML(windowProxy.parseRE(newReasonCode));
        this.tryCompiling(newReasonCode, newOcamlCode);
      } catch (e) {
        this.errorTimerId = setTimeout(
          () => this.setState(() => {
            return {
              compileError: null,
              js: "",
              jsError: null,
              ocaml: "",
              ocamlSyntaxError: null,
              output: [],
              reasonSyntaxError: e as SyntaxError,
            };
          }),
          errorTimeout,
        );
      }

      return {
        compileError: null,
        jsError: null,
        ocaml: newOcamlCode,
        ocamlSyntaxError: null,
        reason: newReasonCode,
        reasonSyntaxError: null,
      };
    });
  }

  updateOCaml = (newOcamlCode) => {
    if (newOcamlCode === this.state.ocaml) {
      return;
    }
    clearTimeout(this.errorTimerId);

    this.setState((prevState: ITryProps) => {
      let newReasonCode = prevState.reason;
      try {
        newReasonCode = (window as any).printRE((window as any).parseML(newOcamlCode));
        this.tryCompiling(newReasonCode, newOcamlCode);
      } catch (e) {
        this.errorTimerId = setTimeout(
          () => this.setState(() => {
            return {
              compileError: null,
              js: "",
              jsError: null,
              ocamlSyntaxError: e,
              output: [],
              reason: "",
              reasonSyntaxError: null,
            };
          }),
          errorTimeout,
        );
      }

      return {
        compileError: null,
        jsError: null,
        ocaml: newOcamlCode,
        ocamlSyntaxError: null,
        reason: newReasonCode,
        reasonSyntaxError: null,
      };
    });
  }

  compile = (code: string): [CompileResult, string | null] => {
    const originalConsoleDotErrorBackup = console.error;
    let warning = "";
    console.error = (...args) => args.forEach((argument) => warning += argument + `\n`);
    const res = JSON.parse((window as any).ocaml.compile(code));
    console.error = originalConsoleDotErrorBackup;
    return [res, warning || null];
  }

  toggleEvaluate = () => {
    if (!this.state.autoEvaluate) {
      this.evalLatest();
    }
    this.setState(() => {
      return {
        autoEvaluate: !this.state.autoEvaluate,
      };
    });
  }

  evalLatest = () => {
    if (this.state.jsIsLatest) {
      this.evalJs(this.state.js);
    }
  }

  render() {
    const {
      reason,
      ocaml,
      js,
      reasonSyntaxError,
      compileError,
      compileWarning,
      ocamlSyntaxError,
      jsError,
    } = this.state;
    return (
      <Container>
        <Segment vertical style={{border: "none"}}>
          <Menu>
            <Dropdown item text="Examples">
              <Dropdown.Menu>
                {examples.map((example) => {
                  const cb = (e, {value}) => {
                    this.updateReason(value as string);
                  };
                  return (
                    <Dropdown.Item key={example.name} onClick={cb} value={example.code}>
                      {example.name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            {!this.state.autoEvaluate && (
              <Menu.Item>
                <Button primary onClick={this.evalLatest}>Evaluate Now</Button>
              </Menu.Item>
            )}

            <Menu.Item
              name="autoEvaluate"
              active={this.state.autoEvaluate}
              content="Auto Evaluate"
              onClick={this.toggleEvaluate}
              icon="refresh"
            />
          </Menu>

        </Segment>
        <Segment vertical style={{border: "none"}}>
          <div>
            <div>
              <Editor
                reason={reason}
                ocaml={ocaml}
                js={js}
                onUpdateCode={this.updateReason}
                result={
                  this.state.output.map(
                    (item, i) => formatOutput(item),
                  ).join("\n")}
              />
              {reasonSyntaxError &&
              <div>
                <div>
                  {formatErrorLocation(reasonSyntaxError.location)}
                  {" "}
                  {capitalizeFirstChar(stripErrorNumberFromReasonSyntaxError(reasonSyntaxError.message))}
                </div>
              </div>}
            </div>
            <div>
              {ocamlSyntaxError &&
              <div>
                <div>
                  {ocamlSyntaxError.message}
                </div>
              </div>}
              {compileError &&
              <div>
                <div>
                  {compileError.js_error_msg
                    ? compileError.js_error_msg
                    : compileError.message}
                </div>
              </div>}
              {compileWarning &&
              <div>
                <div>
                  {compileWarning}
                </div>
              </div>}
            </div>
          </div>
          <div>
            <div>
              {jsError &&
              <div>
                <div>
                  {jsError.message}
                </div>
              </div>}
            </div>
          </div>
          <Divider/>
        </Segment>
      </Container>
    );
  }
}

const wrapInExports = (code) =>
  `(function(exports) {${code}})({})`;

const formatOutput = (item) => {
  return item && item.contents ? `${item.contents.join(" ")}` : "";
};
