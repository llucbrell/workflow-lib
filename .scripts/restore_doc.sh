#!/bin/bash
rm -r node_modules/grunt-jsdoc
mkdir node_modules/grunt-jsdoc
cp -r doc/.module/grunt-jsdoc/* node_modules/grunt-jsdoc
cp -r doc/.module/grunt-jsdoc/.* node_modules/grunt-jsdoc
echo 'copied doc module to bypass and bypassed bug'