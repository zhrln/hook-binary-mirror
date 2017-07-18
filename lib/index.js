/**
 * @fileOverview
 * @author   yanjing
 * @since    2017/07/18
 */
const fs = require('fs');
const path = require('path');
const npmHook = require('./npm-hooks');
const hookBinaryMirror = fs.readFileSync(path.join(__dirname, './main.js'), 'utf-8');

module.exports = function(){
  npmHook.preinstall(hookBinaryMirror, process.env.PWD, function(){
    console.log('hook-binary-mirror');
  });
};

