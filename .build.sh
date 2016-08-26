#!/bin/bash

cp -r ./.tmp/built/* ./
echo 'restored dependency and data files'
cp -r ./.tmp/replacements/* ./
echo 'restored library'