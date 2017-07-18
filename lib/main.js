#!/usr/bin/env node

'use strict';

const localConfig = {
  "china": {
    "ENVS": {
      "NODEJS_ORG_MIRROR": "https://npm.taobao.org/mirrors/node",
      "NVM_NODEJS_ORG_MIRROR": "https://npm.taobao.org/mirrors/node",
      "NVM_IOJS_ORG_MIRROR": "https://npm.taobao.org/mirrors/iojs",
      "PHANTOMJS_CDNURL": "https://npm.taobao.org/mirrors/phantomjs",
      "CHROMEDRIVER_CDNURL": "https://tnpm-hz.oss-cn-hangzhou.aliyuncs.com/dist/chromedriver",
      "OPERADRIVER_CDNURL": "https://npm.taobao.org/mirrors/operadriver",
      "ELECTRON_MIRROR": "https://npm.taobao.org/mirrors/electron/",
      "SASS_BINARY_SITE": "https://npm.taobao.org/mirrors/node-sass",
      "FLOW_BINARY_MIRROR": "https://github.com/facebook/flow/releases/download/v"
    },
    "leveldown": {
      "host": "https://npm.taobao.org/mirrors/leveldown/v{version}"
    },
    "leveldown-hyper": {
      "host": "https://npm.taobao.org/mirrors/leveldown-hyper/v{version}"
    },
    "mknod": {
      "host": "https://npm.taobao.org/mirrors/mknod/v{version}"
    },
    "couchbase": {
      "host": "https://npm.taobao.org/mirrors/couchbase/v{version}"
    },
    "sodium-prebuilt": {
      "host": "https://npm.taobao.org/mirrors/sodium-prebuilt/v{version}"
    },
    "utp-native": {
      "host": "https://npm.taobao.org/mirrors/utp-native/v{version}"
    },
    "node-tk5": {
      "host": "https://npm.taobao.org/mirrors/node-tk5/v{version}"
    },
    "fuse-bindings": {
      "host": "https://npm.taobao.org/mirrors/fuse-bindings/v{version}"
    },
    "zmq-prebuilt": {
      "host": "https://npm.taobao.org/mirrors/zmq-prebuilt/v{version}"
    },
    "gl": {
      "host": "https://npm.taobao.org/mirrors/gl/v{version}"
    },
    "hackrf": {
      "host": "https://npm.taobao.org/mirrors/hackrf/v{version}"
    },
    "rabin": {
      "host": "https://npm.taobao.org/mirrors/rabin/v{version}"
    },
    "v8-debug": {
      "host": "https://npm.taobao.org/mirrors/node-inspector"
    },
    "v8-profiler": {
      "host": "https://npm.taobao.org/mirrors/node-inspector"
    },
    "sqlite3": {
      "host": "https://npm.taobao.org/mirrors"
    },
    "grpc": {
      "host": "https://npm.taobao.org/mirrors",
      "remote_path": "{name}/v{version}"
    },
    "fsevents": {
      "host": "https://npm.taobao.org/mirrors/fsevents"
    },
    "nodegit": {
      "host": "https://npm.taobao.org/mirrors/nodegit/v{version}"
    },
    "flow-bin": {
      "replaceHost": "https://github.com/facebook/flow/releases/download/v",
      "host": "https://npm.taobao.org/mirrors/flow/v"
    },
    "jpegtran-bin": {
      "replaceHost": [
        "https://raw.githubusercontent.com",
        "https://raw.github.com"
      ],
      "host": "https://raw.github.cnpmjs.org"
    },
    "cwebp-bin": {
      "replaceHost": [
        "https://raw.githubusercontent.com",
        "https://raw.github.com"
      ],
      "host": "https://raw.github.cnpmjs.org"
    },
    "zopflipng-bin": {
      "replaceHost": [
        "https://raw.githubusercontent.com",
        "https://raw.github.com"
      ],
      "host": "https://raw.github.cnpmjs.org"
    },
    "optipng-bin": {
      "replaceHost": [
        "https://raw.githubusercontent.com",
        "https://raw.github.com"
      ],
      "host": "https://raw.github.cnpmjs.org"
    },
    "mozjpeg": {
      "replaceHost": [
        "https://raw.githubusercontent.com",
        "https://raw.github.com"
      ],
      "host": "https://raw.github.cnpmjs.org"
    },
    "gifsicle": {
      "replaceHost": [
        "https://raw.githubusercontent.com",
        "https://raw.github.com"
      ],
      "host": "https://raw.github.cnpmjs.org"
    },
    "pngquant-bin": {
      "replaceHost": [
        "https://raw.githubusercontent.com",
        "https://raw.github.com"
      ],
      "host": "https://raw.github.cnpmjs.org",
      "replaceHostMap": {
        "https://raw.githubusercontent.com": "https://raw.github.cnpmjs.org",
        "https://raw.github.com": "https://raw.github.cnpmjs.org",
        "https://github.com": "https://github.com.cnpmjs.org"
      }
    },
    "pngcrush-bin": {
      "replaceHost": [
        "https://raw.githubusercontent.com",
        "https://raw.github.com"
      ],
      "host": "https://raw.github.cnpmjs.org"
    },
    "jpeg-recompress-bin": {
      "replaceHost": [
        "https://raw.githubusercontent.com",
        "https://raw.github.com"
      ],
      "host": "https://raw.github.cnpmjs.org"
    },
    "advpng-bin": {
      "replaceHost": [
        "https://raw.githubusercontent.com",
        "https://raw.github.com"
      ],
      "host": "https://raw.github.cnpmjs.org"
    },
    "pngout-bin": {
      "replaceHost": [
        "https://raw.githubusercontent.com",
        "https://raw.github.com"
      ],
      "host": "https://raw.github.cnpmjs.org"
    },
    "jpegoptim-bin": {
      "replaceHost": [
        "https://raw.githubusercontent.com",
        "https://raw.github.com"
      ],
      "host": "https://raw.github.cnpmjs.org"
    }
  }
};

const fs = require('fs');
const path = require('path');
let binaryMirrorConfig = {};

try {
  binaryMirrorConfig = require('binary-mirror-config')['china'];
} catch (e) {
  binaryMirrorConfig = localConfig['china'];
}

const binaryMirror = binaryMirrorConfig[process.env.npm_package_name];

if (binaryMirror) {
  const PWD = process.env.PWD;
  replaceHostInFile(binaryMirror, path.join(PWD, 'lib/index.js'));
  replaceHostInFile(binaryMirror, path.join(PWD, 'lib/install.js'));
}

function replaceHostInFile(binaryMirror, filepath) {

  const exists = fs.existsSync(filepath);

  if (!exists) {
    return;
  }

  let content = fs.readFileSync(filepath, 'utf8');
  let replaceHostMap = binaryMirror['replaceHostMap'];

  if (!replaceHostMap) {

    let replaceHosts = binaryMirror['replaceHost'];

    if (!Array.isArray(replaceHosts)) {
      replaceHosts = [ replaceHosts ];
    }

    replaceHostMap = {};

    for (const replaceHost of replaceHosts) {
      replaceHostMap[replaceHost] = binaryMirror.host;
    }

  }

  for (const replaceHost in replaceHostMap) {
    content = content.replace(replaceHost, replaceHostMap[replaceHost]);
  }

  fs.writeFileSync(filepath, content);
}
