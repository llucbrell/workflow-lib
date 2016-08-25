#Workflow-lib
For running workflow-lib you must to ensure you know how to work with nodejs, npm and grunt. To start, clone the repository and inicialize some of the dependencies
## Building
Download the code
```js
git clone 
/* you can ignore the next two lines
if you have already installed */ 
npm install -g grunt cli
npm install -g jasmine
```
Start a project
```js
npm start 
/* Rename and answer the questions
about your project name, etc., */
npm install 
// install the dependencies 
grunt create 
// build all you need for the project 
```
## Usage

```js
grunt work 
// for quick tests and basic workflow


grunt build 
// for building --> see on built directory


grunt backup 
// if you need a backup --> .tmp/backup
```
Remember that this template clean the git repository so you can init git from the beggining. And remember you can use a version updater as [dub-plus](https://www.npmjs.com/package/dub-plus) for control of your versioning style.
