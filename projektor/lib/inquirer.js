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
        default: argv._[1] || '1.0.0',
        validate: function(value) {
          const re = /^\d{1,2}\.\d{1,2}\.\d{1,2}$/;
          if (re.test(value)) {
            return true;
          } else {
            return 'Please enter a valide version number.'
          }
        }
      },
      {
        name: 'description',
        type: 'input',
        message: 'description (optional):',
      },
      {
        name: 'main',
        type: 'input',
        message: 'entry point (index.js):',
        default: argv._[3] || 'index.js',
        validate: function(value) {
          const ext = value.split('.').pop();
          if (ext && ext === 'js') {
            return true;
          } else {
            return 'Please make sure this is a javascript file.'
          }
        }
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
      },
      {
        name: 'keywords',
        type: 'input',
        message: 'keywords (optional):',
      },
      {
        name: 'author',
        type: 'input',
        message: 'author:',
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
