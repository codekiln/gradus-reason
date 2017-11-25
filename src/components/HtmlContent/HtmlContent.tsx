import * as React from "react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from "react-html-parser";
import ReasonEditor2 from "../ReasonEditor2";

interface HtmlProps extends React.HTMLProps<HTMLDivElement> {
  content: string;
}

const options = {
  decodeEntities: true,
  // tslint:disable only-arrow-functions
  transform: function transform(node, index) {

    if (node.type === "tag" && node.name === "pre" && node.attribs.class === "language-reason") {
      return <ReasonEditor2 key={index} reason={node.children[0].children[0].data}/>;
    }
  },
};

export default ({content}: HtmlProps) => {
    return <div>{ ReactHtmlParser(content, options) }</div>;
};
