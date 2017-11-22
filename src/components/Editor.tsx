import * as React from "react";
import CodeMirror, {CodeMirrorOptions} from "./CodeMirror/CodeMirror";

interface SidebarMenuProps extends React.HTMLProps<HTMLDivElement> {
  code: string;
  onUpdateCode: (code: string) => void;
  options?: CodeMirrorOptions;
}

export default class Editor extends React.PureComponent<SidebarMenuProps, null> {

  static getEditor(code, onUpdateCode, editorOptions) {
    return (typeof navigator !== "undefined") ? (<CodeMirror
      value={code}
      options={editorOptions}
      onEditorChange={onUpdateCode}
    />) : (<code>{code}</code>);
  }

  render() {
    const {code, onUpdateCode, options} = this.props;

    const codeblock = Editor.getEditor(code, onUpdateCode, options);

    return (
      <div className="reason-editor">
        {codeblock}
      </div>
    );
  }
}
