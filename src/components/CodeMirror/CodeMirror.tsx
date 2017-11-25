import * as React from "react";
import * as CodeMirrorEditor from "codemirror";
import {Editor} from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/mllike/mllike";
import "codemirror/mode/rust/rust";
import TextArea from "semantic-ui-react/dist/commonjs/addons/TextArea/TextArea";
import {Ref} from "semantic-ui-react";

export interface CodeMirrorOptions extends CodeMirrorEditor.EditorConfiguration {
}

export type Lang = "javascript" | "reason" | "ocaml" | "result";

interface CodeMirrorProps extends React.HTMLProps<HTMLDivElement> {
  value: string;
  options?: CodeMirrorOptions;
  onEditorChange?: (value: string) => void;
  className?: string;
  lang: Lang;
}

const langToOptions = {
  javascript: {
    gutters: ["gutter-js"],
    lineNumbers: false,
    mode: "rust",
    readOnly: "nocursor",
  },
  ocaml: {
    gutters: ["gutter-ocaml"],
    lineNumbers: false,
    mode: "mllike",
    readOnly: "nocursor",
  },
  reason: {
    gutters: ["gutter-reason"],
    lineNumbers: false,
    mode: "javascript",
  },
  result: {
    gutters: ["gutter-result"],
    lineNumbers: false,
    mode: "javascript",
    readOnly: "nocursor",
    theme: "ambiance",
  },
};

export default class CodeMirror extends React.Component<CodeMirrorProps, null> {

  private editor: Editor | null;
  private containerDiv: HTMLElement;
  private defaultOptions: CodeMirrorEditor.EditorConfiguration = {
    gutters: ["my-gutter"],
    lineNumbers: true,
    mode: "rust",
    theme: "monokai",
  };

  componentDidMount() {
    const langOptions = langToOptions[this.props.lang];
    const editorOptions = {
      ...this.defaultOptions,
      ...langOptions,
      ...this.props.options,
    };
    this.editor = CodeMirrorEditor.fromTextArea(
      this.containerDiv as HTMLTextAreaElement, editorOptions);
    this.editor.setValue(this.props.value);

    this.editor.on("change", (cm, metadata) => {
      const value = this.editor.getValue();
      if (value !== this.props.value && this.props.onEditorChange) {
        this.props.onEditorChange(value);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const hasChanged = this.props.value !== nextProps.value
      && nextProps.value !== this.editor.getValue();
    if (hasChanged) {
      this.editor.setValue(nextProps.value);
    }
  }

  render() {
    return (
      <div>
        <Ref innerRef={(textarea) => this.containerDiv = textarea}>
          <TextArea/>
        </Ref>
      </div>
    );
  }
};
