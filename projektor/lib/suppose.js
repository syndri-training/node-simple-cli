const suppose = require('suppose')
    , fs = require('fs')
    , chalk = require('chalk')
    , assert = require('assert')
    , inquirer = require('./inquirer');

module.exports = {
  createProject: async () => {
    const package = await inquirer.askPackageInfo();

    if (!package.ok) {
      console.log(chalk.yellow.bold('Aborted.'));
      return;
    }

    // check if directory exists with new package name
    if (!fs.existsSync(package.name)) {
      // create directory with package name
      fs.mkdirSync(package.name);
      // cd into project directory
      process.chdir(package.name);
      // init npm project
      suppose('npm', ['init'])
      .when(/name\: \([\w|\-]+\)[\s]*/).respond(`${package.name}\n`)
      .when('version: (1.0.0) ').respond(`${package.version}\n`)
      .when('description: ').respond(`${package.description}\n`)
      .when('entry point: (index.js) ').respond(`${package.main}\n`)
      .when('test command: ').respond(`${package.test}\n`)
      .when('git repository: ').respond(`${package.repo}\n`)
      .when('keywords: ').respond(`${package.keywords}\n`)
      .when('author: ').respond(`${package.author}\n`)
      .when('license: (ISC) ').respond(`${package.license}\n`)
      .when('ok? (yes) ').respond(`yes\n`)
      .on('error', function (err) {
        console.log(err.message);
      })
      .end(function (code) {
        var packageFile = './package.json';
        fs.readFile(packageFile, function (err, data) {
          var packageObj = JSON.parse(data.toString());
          // create README.md, .gitignore, and entry .js file
          fs.writeFileSync('./README.md', `# ${packageObj.name}`);
          fs.writeFileSync('./.gitignore', 'node_modules');
          fs.writeFileSync(`./${packageObj.main}`, '');
          console.log(packageObj);
          console.log(
            chalk.green.bold(`Your new project, '${packageObj.name}' is ready to go!`)
          );
        })
      });
    } else {
      // log error if directory with package name exists
      console.log(
        chalk.red.bold('A directory with the chosen package name already exists here!')
      );
    }
  }
}
