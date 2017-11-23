'use strict';

const visit = require(`unist-util-visit`);

module.exports = ({markdownAST}, {classPrefix = `language-`} = {}) => {
  // console.log('inside gatsby-remark-reason, markdownAST is: ', JSON.stringify(markdownAST, null, 4));
  visit(markdownAST, `code`, node => {
    let language = node.lang;
    let languageName = `none`;
    if (language) {
      language = language.toLowerCase();
      languageName = language;
    }
    if (languageName === `reason`) {
      // console.log('gatsby-remark-reason found reason node:');
      // console.log(node);
      // Replace the node with the markup we need to make
      // 100% width highlighted code lines work
      node.type = `html`;
      const className = `${classPrefix}${languageName}`;
      node.value = `<div class="gatsby-highlight">
        <pre class="${className}"><code>${node.value}</code></pre>
        </div>`;
    }
  });
};
