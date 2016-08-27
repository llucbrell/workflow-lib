#!/bin/bash

cp -r ./.tmp/built/* ./
cp ./.tmp/built/.* ./
cp ./.tmp/built/.* ./
echo 'restored dependency and data files'
cp -r ./.tmp/replacements/* ./
echo 'restored library'