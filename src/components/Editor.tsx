import * as React from "react";
import CodeMirror, {CodeMirrorOptions} from "./CodeMirror/CodeMirror";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";
import Label from "semantic-ui-react/dist/commonjs/elements/Label/Label";
import "codemirror/theme/ambiance.css";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider/Divider";

interface SidebarMenuProps extends React.HTMLProps<HTMLDivElement> {
  code: string;
  onUpdateCode: (code: string) => void;
  options?: CodeMirrorOptions;
}

export default class Editor extends React.PureComponent<SidebarMenuProps, null> {

  static getEditor(code, onUpdateCode, editorOptions) {
    if (typeof navigator !== "undefined") {
      return (<CodeMirror
        value={code}
        options={editorOptions}
        onEditorChange={onUpdateCode}
      />);
    }
    return (<code>{code}</code>);
  }

  render() {
    const {code, onUpdateCode, options} = this.props;

    return (
      <div className="reason-editor">
        <Segment.Group>
          <Segment>
            <Label color="red" ribbon>Reason</Label>
            {Editor.getEditor(code, onUpdateCode, options)}
            <Divider hidden />
            <Label as="a" color="brown" ribbon="right"><Icon fitted name="refresh"/> Result</Label>
            {Editor.getEditor(code, onUpdateCode, {
              ...options, lineNumbers: false, readOnly: true, theme: "ambiance",
            })}
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}
