import * as React from "react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from "react-html-parser";
import ReasonEditor from "../ReasonEditor";

interface HtmlProps extends React.HTMLProps<HTMLDivElement> {
  content: string;
}

const options = {
  decodeEntities: true,
  // tslint:disable only-arrow-functions
  transform: function transform(node, index) {

    if (node.type === "tag" && node.name === "pre" && node.attribs.class === "language-reason") {
      return <ReasonEditor key={index} reason={node.children[0].children[0].data}
                     onUpdateCode={(code) => {console.log("onUpdateCode", code); }} />;
    }
  },
};

export default ({content}: HtmlProps) => {
    return <div>{ ReactHtmlParser(content, options) }</div>;
};
