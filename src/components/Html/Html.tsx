import * as React from "react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from "react-html-parser";
import Editor from "../Editor";

interface HtmlProps extends React.HTMLProps<HTMLDivElement> {
  content: string;
}

const options = {
  decodeEntities: true,
  // tslint:disable only-arrow-functions
  transform: function transform(node, index) {

    if (node.type === "tag" && node.name === "code" && node.parent.attribs.class === "language-reason") {
      console.log("found node of type code: ", node);
      const onUpdateCode = (code) => {console.log("onUpdateCode", code); };
      return <Editor key={index} code={node.children[0].data} onUpdateCode={onUpdateCode}/>;
    }

  },
};

export default ({content}: HtmlProps) => {
    return <div>{ ReactHtmlParser(content, options) }</div>;
};
