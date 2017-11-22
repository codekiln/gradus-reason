import * as React from "react";
import * as CodeMirrorEditor from "codemirror";
import {Editor} from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/mllike/mllike";
import "codemirror/mode/rust/rust";

export interface CodeMirrorOptions extends CodeMirrorEditor.EditorConfiguration { }

interface CodeMirrorProps extends React.HTMLProps<HTMLDivElement> {
  value: string;
  options?: CodeMirrorOptions;
  onEditorChange?: (value: string) => void;
  className?: string;
}

export default class CodeMirror extends React.Component<CodeMirrorProps, null> {

  private editor: Editor | null;
  private containerDiv: HTMLElement;
  private defaultOptions: CodeMirrorEditor.EditorConfiguration = {
    lineNumbers: true,
    mode: "rust",
    theme: "monokai",
  };

  componentDidMount() {
    const editorOptions = {
      ...this.defaultOptions,
      ...this.props.options,
    };
    this.editor = CodeMirrorEditor(this.containerDiv, editorOptions);
    this.editor.setValue(this.props.value);

    this.editor.on("change", (cm, metadata) => {
      const value = this.editor.getValue();
      if (value !== this.props.value && this.props.onEditorChange) {
        this.props.onEditorChange(value);
      }
    });
  }

  render() {
    // see also https://goenning.net/2016/11/02/strongly-typed-react-refs-with-typescript/
    return (
      <div className={this.props.className} ref={(div) => this.containerDiv = div}/>
    );
  }
};
