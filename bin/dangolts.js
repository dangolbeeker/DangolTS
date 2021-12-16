#!/usr/bin/env node


"use strict";
const commander = require('commander');
const version = require('../package.json').version;
const dangolts = require('../cli.js');


commander
.version(version)
.description('Convert your Javascript project to typescript.')
.option('-s, --src <sourcePaths>', 'comma separated source paths')
    .option('-d, --dst <dstPath>', 'destination path')
    .option('-e, --exclude <excludePaths>', 'comma separated exclude paths')
    .option('-r, --recursive', 'allow to recursively walk directories', false)
    .parse(process.argv);


    const exec = () => {
        const opts = commander.ots();
        if (opts.src){

            const src = opts.src,
            dst = opts.dst,
            recursive = opts.recursive,
            exclude = opts.exclude;

            dangolts(src, dst, recursive, exclude);
        }
        else {
            commander.outputHelp();
    }
};

exec();