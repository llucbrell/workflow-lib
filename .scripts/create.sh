#!/bin/bash
pwd
mkdir doc/.module/grunt-jsdoc
cp -r node_modules/grunt-jsdoc/* doc/.module/grunt-jsdoc
cp node_modules/grunt-jsdoc/.* doc/.module/grunt-jsdoc
echo 'copied doc module to bypass bug'
