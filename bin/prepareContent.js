#!/usr/bin/env node

const wrapLinks = require('../lib/wrapLinks');

let { content } = process.env;

content = wrapLinks(content);

process.stdout.write(content);