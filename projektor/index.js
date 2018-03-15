#! /usr/bin/env node

const clear = require('clear')
    , chalk = require('chalk')
    , figlet = require('figlet')
    , inquirer = require('./lib/inquirer')
    , suppose = require('./lib/suppose');

clear();
console.log(
  chalk.blue(
    figlet.textSync('Projektor', { horizontalLayout: 'default', font: 'graffiti' })
  )
);

suppose.createProject();


