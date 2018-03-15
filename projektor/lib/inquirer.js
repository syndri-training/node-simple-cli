const inquirer = require('inquirer');

module.exports = {
  askPackageInfo: () => {
    const argv = require('minimist')(process.argv.slice(8));

    const questions = [
      {
        name: 'name',
        type: 'input',
        message: 'name:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a name for the project.'
          }
        }
      },
      {
        name: 'version',
        type: 'input',
        message: 'version (1.0.0):',
        default: argv._[1] || '1.0.0'
      },
      {
        name: 'description',
        type: 'input',
        message: 'description (optional):',
        default: argv._[2] || ''
      },
      {
        name: 'main',
        type: 'input',
        message: 'entry point (index.js):',
        default: argv._[3] || 'index.js'
      },
      {
        name: 'test',
        type: 'input',
        message: 'test command (optional):',
        default: argv._[4] || 'echo \"Error: no test specified\" && exit 1'
      },
      {
        name: 'repo',
        type: 'input',
        message: 'git repository (optional):',
        default: argv._[5] || ''
      },
      {
        name: 'keywords',
        type: 'input',
        message: 'keywords (optional):',
        default: argv._[6] || ''
      },
      {
        name: 'author',
        type: 'input',
        message: 'author:',
        default: argv._[7] || ''
      },
      {
        name: 'license',
        type: 'input',
        message: 'license (ISC):',
        default: argv._[8] || 'ISC'
      },
      {
        name: 'ok',
        type: 'confirm',
        message: 'ok?:'
      }
    ];
    return inquirer.prompt(questions);
  }
}
