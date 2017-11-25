import * as React from "react";
import CodeMirror, {Lang} from "./CodeMirror/CodeMirror";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";
import Label from "semantic-ui-react/dist/commonjs/elements/Label/Label";
import "codemirror/theme/ambiance.css";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";
import * as ocamlLogo from "../images/ocaml.svg";
import * as jsLogo from "../images/js_logo.svg";
import Image from "semantic-ui-react/dist/commonjs/elements/Image/Image";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu/Menu";
import {DebounceCallback, default as debounce} from "../utils/debounce";
import {withPrefix} from "gatsby-link";

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

interface ReasonEditor2Props extends React.HTMLProps<HTMLDivElement> {
  reason: string;
  title?: string;
}

interface CompileError extends Error {
  js_error_msg: string;
}

interface ReasonEditor2State {
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
  showJs: boolean;
  showOcaml: boolean;
  showOutput: boolean;
}

interface CompileResult {
  js_code: string;
}

export default class ReasonEditor2 extends React.Component<ReasonEditor2Props, ReasonEditor2State> {

  static getEditor(code, lang: Lang, editorOptions = {}, onUpdateCode = (_: string) => {
    return null;
  }) {
    if (typeof navigator !== "undefined") {
      const localEditorOptions = {
        ...editorOptions,
        gutters: [],
      };
      return (
        <CodeMirror
          value={code}
          options={localEditorOptions}
          lang={lang}
          onEditorChange={onUpdateCode}
        />
      );
    }
    return (<code>{code}</code>);
  }

  state: ReasonEditor2State = {
    autoEvaluate: true,
    js: "// loading",
    jsIsLatest: false,
    ocaml: "(* loading *)",
    output: [],
    reason: "/* loading */",
    showJs: false,
    showOcaml: false,
    showOutput: true,
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

  handleItemClick = (e, {name, content}) => this.setState(
    (prevState: ReasonEditor2State) => {
      const stateKey = name ? name : content;
      console.log("caught click", e, stateKey);
      return {...prevState, [stateKey]: !prevState[stateKey]};
    },
  )

  concatToOutputAndSetState = (item: ICompilerOutput) =>
    this.setState((state: ReasonEditor2State) => ({
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
      this.updateReason(this.props.reason);
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

    this.setState((prevState: ReasonEditor2State) => {
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

    this.setState((prevState: ReasonEditor2Props) => {
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
      showOutput, showOcaml, showJs,
    } = this.state;

    const reasonBlock = reason ?
      <div className="reason-code">
        {ReasonEditor2.getEditor(reason, "reason")}
      </div>
      : <code/>;

    const menuBlock = (
      <Menu icon secondary compact size="mini">

        <Menu.Item name="showOutput" active={showOutput} onClick={this.handleItemClick}>
          <Icon name="terminal" size="small" bordered/>
        </Menu.Item>

        <Menu.Item name="showJs" active={showJs} onClick={this.handleItemClick}>
          <Image src={jsLogo} size="mini" className="label-logo"/>
        </Menu.Item>

        <Menu.Item name="showOcaml" active={showOcaml} onClick={this.handleItemClick}>
          <Image src={ocamlLogo} size="mini" className="label-logo"/>
        </Menu.Item>

      </Menu>
    );

    const resultBlock = showOutput ?
      <div className="code-results">
        <Label ribbon="right" basic color={showOutput ? "brown" : "grey"}
               as="a" onClick={this.handleItemClick} content="showOutput">
          <Icon name="terminal" size="small" bordered/>
        </Label>

        {
          showOutput && ReasonEditor2.getEditor(this.state.output.map(
            (item, i) => formatOutput(item),
          ).join("\n"), "result")
        }
      </div> : <div className="code-results"/>;

    const jsBlock = showJs ?
      <div className="js-code">
        <Label ribbon="right" basic color={showJs ? "yellow" : "grey"}
               as="a" onClick={this.handleItemClick} content="showJs">
          <Image src={jsLogo} size="mini" className="label-logo"/>
        </Label>
        {showJs && ReasonEditor2.getEditor(js, "javascript")}
      </div> : <div className="js-code"/>;

    const ocamlBlock = showOcaml ?
      <div className="ocaml-code">
        <Label ribbon="right" basic color={showOcaml ? "orange" : "grey"}
               as="a" onClick={this.handleItemClick} content="showOcaml">
          <Image src={ocamlLogo} size="mini" className="label-logo"/>
        </Label>
        {showOcaml && ReasonEditor2.getEditor(ocaml, "ocaml")}
      </div> : <div className="ocaml-code"/>;

    return (
      <Segment.Group horizontal>
        <Segment>
          {/*<Label color="red" ribbon basic><Icon fitted name="terminal" spaced="right"/> Result</Label>*/}
          {menuBlock}
          {reasonBlock}
        </Segment>
        <Segment>
          {resultBlock}
          {jsBlock}
          {ocamlBlock}
        </Segment>
      </Segment.Group>
    );
  }
}

const wrapInExports = (code) =>
  `(function(exports) {${code}})({})`;

const formatOutput = (item) => {
  return item && item.contents ? `${item.contents.join(" ")}` : "";
};
