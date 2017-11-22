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

    if (node.type === "tag" && node.name === "pre" && node.attribs.class === "language-reason") {
      return <Editor key={index} code={node.children[0].children[0].data}
                     onUpdateCode={(code) => {console.log("onUpdateCode", code); }} />;
    }
  },
};

export default ({content}: HtmlProps) => {
    return <div>{ ReactHtmlParser(content, options) }</div>;
};
