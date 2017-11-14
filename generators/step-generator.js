const path = require('path');
const fs = require('fs-extra');
const {inputRequired} = require('./utils');

const authors = JSON.parse(fs.readFileSync('./data/author.json'));

const templateForStepFolder = '{{createdDate}}--{{dashCase title}}';

function normalizeTag(tag) {
  return tag.toLowerCase().split(' ').join('_');
}

module.exports = plop => {
  plop.setGenerator('Reason step / tutorial / post', {
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: 'Step title?',
        validate: inputRequired('title')
      },
      {
        type: 'list',
        name: 'author',
        message: 'The author of post (add your name to data/author.json first)',
        choices: authors.map(author => ({name: author.id, value: author.id}))
      },
      {
        type: 'input',
        name: 'tags',
        message: 'tags? (at least one, lowercase plural, no spaces, separated with a comma if > 1)',
        validate: inputRequired('input')
      },
      {
        type: 'confirm',
        name: 'draft',
        message: 'It\'s a draft?'
      }
    ],
    actions: data => {
      // Get current date
      data.createdDate = new Date().toISOString().split('T')[0];

      // Parse tags as yaml array
      if (data.tags) {
        data.tags = `\ntags:\n  - ${data.tags.split(',').map(normalizeTag).join('\n  - ')}`;
      }

      return [
        {
          type: 'add',
          path: '../data/steps/' + templateForStepFolder + '/index.md',
          templateFile: 'templates/step-md.template'
        },

        /**
         * Copy the default image into the new post
         * @param promptAnswers - the answers to prompts in a JSON object
         * @returns String - the path to the copied image
         */
        function (promptAnswers) {
          const defaultImgSrc = path.resolve(__dirname, 'templates', 'default.jpg');
          // Console.log(promptAnswers);
          const imgDest = plop.renderString('../data/steps/' + templateForStepFolder + '/default.jpg', promptAnswers);
          const imgDestPath = path.resolve(__dirname, imgDest);
          try {
            // Console.log(`copying ${defaultImgSrc} to ${imgDestPath} ...`)
            fs.copySync(defaultImgSrc, imgDestPath);
            // Console.log('...successful')
            return imgDestPath;
          } catch (err) {
            console.error(err);
          }
          return '';
        }
      ];
    }
  });
};
