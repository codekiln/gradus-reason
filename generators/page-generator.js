const {inputRequired} = require('./utils');

module.exports = plop => {
  plop.setGenerator('page (new top level menu item - rare!)', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Page name?',
        validate: inputRequired('name')
      }
    ],
    actions: [
      {
        type: 'add',
        path: '../src/pages/{{camelCase name}}.tsx',
        templateFile: 'templates/page-tsx.template'
      }
    ]
  });
};
