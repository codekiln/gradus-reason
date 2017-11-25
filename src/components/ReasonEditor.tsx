import * as React from "react";
import CodeMirror, {CodeMirrorOptions, Lang} from "./CodeMirror/CodeMirror";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";
import Label from "semantic-ui-react/dist/commonjs/elements/Label/Label";
import "codemirror/theme/ambiance.css";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";
import * as ocamlLogo from "../images/ocaml.svg";
import * as jsLogo from "../images/js_logo.svg";
import Image from "semantic-ui-react/dist/commonjs/elements/Image/Image";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu/Menu";

export interface CodeEditorProps extends React.HTMLProps<HTMLDivElement> {
  reason?: string;
  js?: string;
  ocaml?: string;
  onUpdateCode?: (code: string) => void;
  options?: CodeMirrorOptions;
  result?: string;
  title?: string;
}

interface ReasonEditorState {
  showOcaml: boolean;
  showJs: boolean;
  showResult: boolean;
}

export default class ReasonEditor extends React.Component<CodeEditorProps, ReasonEditorState> {

  static getEditor(code, lang: Lang, editorOptions = {}, onUpdateCode = (_: string) => {return null; }) {
    if (typeof navigator !== "undefined") {
      return (
        <CodeMirror
          value={code}
          options={editorOptions}
          lang={lang}
          onEditorChange={onUpdateCode}
        />
      );
    }
    return (<code>{code}</code>);
  }

  state: ReasonEditorState = {
    showJs: false,
    showOcaml: false,
    showResult: true,
  };

  handleItemClick = (e, {name, active}) => this.setState(
    (prevState: ReasonEditorState) => ({...prevState, [name]: !active}),
  )

  render() {
    const {reason, ocaml, js, onUpdateCode, options, result, title} = this.props;
    const {showResult, showOcaml, showJs} = this.state;

    const menuBlock = (
      <Menu icon secondary size="mini">
        <Menu.Item name="showResult" active={showResult}
                   onClick={this.handleItemClick}>
          <Icon name="terminal" size="large" bordered/>
        </Menu.Item>

        <Menu.Item name="showOcaml" active={showOcaml}
                   onClick={this.handleItemClick}>
          <Image src={ocamlLogo} size="mini"/>
        </Menu.Item>

        <Menu.Item name="showJs" active={showJs}
                   onClick={this.handleItemClick}>
          <Image src={jsLogo} size="mini"/>
        </Menu.Item>

      </Menu>
    );

    const reasonBlock = reason ?
      <div className="reason-code">
        {ReasonEditor.getEditor(reason, "reason", options, onUpdateCode)}
      </div>
      : <code/>;

    const ocamlBlock = ocaml ?
      <div className="ocaml-code">
        {ReasonEditor.getEditor(ocaml, "ocaml", {...options}, onUpdateCode)}
      </div>
      : <code/>;

    const jsBlock = js ?
      <div className="js-code">
        {ReasonEditor.getEditor(ocaml, "javascript", {...options}, onUpdateCode)}
      </div>
      : <code/>;

    const resultBlock = result ?
      <div className="code-results">
        <Label color="brown" ribbon basic><Icon fitted name="terminal" spaced="right"/> Result</Label>
        {
          ReasonEditor.getEditor(result, "result", {...options})
        }
      </div>
      : <div className="code-results"/>;

    return (
      <Segment.Group>
        <Segment>
          {menuBlock}
          {reasonBlock}
          {showResult && resultBlock}
          {showOcaml && ocamlBlock}
          {showJs && jsBlock}
        </Segment>
      </Segment.Group>
    );
  }
}
