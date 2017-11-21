import * as React from "react";
import * as ace from "brace";
// import 'brace/mode/javascript';
// import 'brace/theme/monokai';
import AceEditor from "react-ace";

interface SidebarMenuProps extends React.HTMLProps<HTMLDivElement> {
  code: string;
  onUpdateCode: (code: string) => void;
}

export default class Editor extends React.PureComponent<SidebarMenuProps, null> {

  onEditorLoad(editor) {
    editor.session.setUseWorker(false);
    editor.session.setUseWrapMode(true);
  }

  render() {
    const { code, onUpdateCode } = this.props;

    const editorProps = {
      $blockScrolling: Infinity,
      wrap: true,
    };

    return (
      <div className="reason-editor">
        <AceEditor mode="javascript"
                   theme="monokai"
                   name="HTML_EDITOR"
                   value={code}
                   width="100%"
                   height="6em"
                   onChange={(value) => onUpdateCode(value)}
                   onLoad={(editor) => this.onEditorLoad(editor)}
                   editorProps={editorProps}
        />
      </div>
    );
  }
}
