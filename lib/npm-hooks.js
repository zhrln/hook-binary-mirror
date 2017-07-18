/**
 * https://github.com/mikkoh/npm-hooks/blob/master/index.js
 */

var path = require('path');
var fs = require('fs');

module.exports = {

  prepublish: createScript.bind(undefined, 'prepublish'),
  publish: createScript.bind(undefined, 'publish'),
  postpublish: createScript.bind(undefined, 'postpublish'),
  preinstall: createScript.bind(undefined, 'preinstall'),
  install: createScript.bind(undefined, 'install'),
  postinstall: createScript.bind(undefined, 'postinstall'),
  preuninstall: createScript.bind(undefined, 'preuninstall'),
  uninstall: createScript.bind(undefined, 'uninstall'),
  postuninstall: createScript.bind(undefined, 'postuninstall'),
  pretest: createScript.bind(undefined, 'pretest'),
  test: createScript.bind(undefined, 'test'),
  posttest: createScript.bind(undefined, 'posttest'),
  prestop: createScript.bind(undefined, 'prestop'),
  stop: createScript.bind(undefined, 'stop'),
  poststop: createScript.bind(undefined, 'poststop'),
  prestart: createScript.bind(undefined, 'prestart'),
  start: createScript.bind(undefined, 'start'),
  poststart: createScript.bind(undefined, 'poststart'),
  prerestart: createScript.bind(undefined, 'prerestart'),
  restart: createScript.bind(undefined, 'restart'),
  postrestart: createScript.bind(undefined, 'postrestart')
};

function createScript(type, script, pathInto, cb) {

  pathInto = path.resolve(pathInto);

  if (typeof pathInto === 'function') {
    cb = pathInto;
    pathInto = path.join('.', 'node_modules');
  }

  var pathSplit = pathInto.split(path.sep);
  var pathNodeModules;
  var pathHook;
  var writeStream;

  if (pathSplit[pathSplit.length - 1] !== 'node_modules') {
    pathInto = path.join(pathInto, 'node_modules');
  }

  createNPMHooksFolder(pathInto, function (err, createdFolder) {
    if (err) {
      cb(err);
      return;
    }

    writeScript(path.join(path.join(pathInto, '.hooks'), type), script, cb);
  });
}

function writeScript(writeInto, script, cb) {
  fs.writeFile(
    writeInto,
    script,
    {encoding: 'utf8', mode: '0755'},
    cb
  );
}

function createNPMHooksFolder(modulesPath, cb) {

  createFolderIfDoesntExist(modulesPath, function (err, created) {
    if (err) {
      cb(err);
      return;
    }

    createFolderIfDoesntExist(path.join(modulesPath, '.hooks'), cb);
  });
}

function createFolderIfDoesntExist(pathFolder, cb) {

  fs.exists(pathFolder, function (exists) {

    if (!exists) {
      fs.mkdir(pathFolder, function (err) {
        if (err) {
          cb(err);
          return;
        }

        cb(null, true);
      });
    } else {
      cb(null, false);
    }
  });
}
