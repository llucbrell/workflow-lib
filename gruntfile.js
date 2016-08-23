module.exports = function (grunt) {
    
    
    // ---------------------- CONSTANT sources  ------------------------------ //
    
    var initial_directories = ['.tmp', '.tmp/doc', 'test', 'js', 'built'],
        javascript_to_docs = ['js/**/*.js'],
        javascript_files = ['js/**/*.js', '*.js'],
        destination_docs = ".tmp/doc",
        build_docs = "built/doc",
        
    // ---------------------- CONSTANT options  ------------------------------ //

        jshint_rules = {laxbreak: true},
        
        
    // --------------------- TEXT values ------------------------------------- //
        
        readme_text = "[comment]: <> (example of image -->   ![](https://raw.githubusercontent.com/llucbrell/audrey2/master/audrey.png)   )" 
                             +"\n"
                             +"[comment]: <> (example of Travis build integration -->[![Build Status](https://travis-ci.org/llucbrell/audrey2.svg?branch=master)](https://travis-ci.org/llucbrell/audrey2)    )" 
                             +"\n"
                             +"[comment]: <> (example of Tittle)"
                             +"\n"
                             +"#This is my new library h1"
                             +"\n"
                             +"[comment]: <> (example of h2)"
                             +"\n"
                             +"#This is a sub-tittle h2"
                             +"\n"
                             +"\n"
                             +"[comment]: <> (example of text)"
                             +"\n"
                             +"When we build a CLI (Command Line Interface) we can find some troubles. While the software stays small it's easy to mantain and work with it. But as much a it grows... It could be a work for something out of space."
                             +"\n"
                             +"[comment]: <> (example of link -----> [link](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)           )"
                             +"\n",
        
        license_text =  "The MIT License"
                                +"==============="
                                +"\n"
                                +"Copyright (c) Lucas_C / llucbrell 2015"
                                +"\n"
                                +"Permission is hereby granted, free of charge, to any person obtaining a copy"
                                +"of this software and associated documentation files (the 'Software'), to deal"
                                +"in the Software without restriction, including without limitation the rights"
                                +"to use, copy, modify, merge, publish, distribute, sublicense, and/or sell"
                                +"copies of the Software, and to permit persons to whom the Software is"
                                +"furnished to do so, subject to the following conditions:" 
                                +"\n"
                                +"The above copyright notice and this permission notice shall be included in"
                                +"all copies or substantial portions of the Software."
                                +"\n"
                                +"THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR"
                                +"IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,"
                                +"FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE"
                                +"AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER"
                                +"LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,"
                                +"OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN"
                                +"THE SOFTWARE.",
        
        gitignore_text = "#ignore node modules\n"
                                +"node_modules\n"
                                +"#ignore grunt temporary files\n"
                                +".tmp\n",
        
        npmignore_text = "#ignore node modules\n" //revisar
                                +"node_modules\n"
                                +"#ignore grunt temporary files\n"
                                +".tmp\n"
                                +"#ignore git files\n"
                                +".git\n",
        
        indexjs_text = "\n" ,
        
        travis_text =  "language: node_js\n" //revisar
                                +"node_js:\n"
                                +' - "6"\n'
                                +' - "5"\n'
                                +' - "4"\n'
                                +' - "0.12"\n'
                                +' - "0.11"\n'
                                +' - "0.10"\n'
                                +' - "iojs"\n'
                                +' - "iojs-v1.0.4"\n'
                                +'before_install:'
                                +' - npm install -g jasmine\n'
                                +' - npm install -g npm\n'
                                +' - npm install -g grunt-cli\n',
        
        check_text = "\n"
        
        ; 
    
    // ---------------------------------------------------------------  //

    
    
    
    // ---------------------- GRUNT CONFIG TASKS ---------------------  //
    grunt.initConfig({
        
        // to use properties of the project guided by package.json file
        pkg: grunt.file.readJSON('package.json'),
        
        // building project principal structure
        mkdir: {
            all: {
                options: {
                create: initial_directories
                }
            }
        },
        
        // building project files  index.js, travis, readme, license, gitignore, npmignore       
          "file-creator": {
            "generate-files": {
              "readme.md": function(fs, fd, done) {
                fs.writeSync(fd, readme_text);
                done();
              },
            "license.md": function(fs, fd, done) {
                fs.writeSync(fd,license_text);
                done();
              },
                ".gitignore": function(fs, fd, done) {
                    fs.writeSync(fd, gitignore_text);
                    done();
              },
               ".npmignore": function(fs, fd, done) {
                    fs.writeSync(fd, npmignore_text);
                    done();
              },
                "index.js": function(fs, fd, done) {
                    fs.writeSync(fd, indexjs_text); //revisar      
                    done();
              },
                ".travis.yml": function(fs, fd, done) {
                    fs.writeSync(fd, travis_text);
                    done();
              }
            },
             // second use.. generate more files when it's demand 
            "gen":{
               "checktext.txt": function(fs, fd, done) {
                    fs.writeSync(fd, check_text);
                    done();
              }
            }
          },
        
        // Documentation generation
        
        jsdoc:{
            // for temporary consult
            "dev-work":{
                src: javascript_to_docs ,
                options:{
                    destination: destination_docs
                }
            },
            // for build process
            "dev-build":{
                src: javascript_to_docs ,
                options:{
                    destination: build_docs
                }
            }
        },
        
        // lint javascript files
        
        jshint:{
            check:{
                src: javascript_files,
                options: jshint_rules
                
            }
        },
        
        //styling javascript files
        
        jscs: {
            src: javascript_files,
                options: { //configurar bien
                    config: ".jscsrc",
                    //esnext: true, // If you use ES6 http://jscs.info/overview.html#esnext 
                    fix: true, // Autofix code style violations when possible. 
                    requireCurlyBraces: [ "if" ]
            }
        }
        
    });
    
    // load plugin
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-file-creator');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    
    
    // default tasks
    grunt.registerTask('create', ['mkdir', 'file-creator:generate-files']);
    grunt.registerTask('work', ['file-creator:gen', 'jsdoc:dev-work', 'jshint:check']);
    grunt.registerTask('build', ['file-creator:gen', 'jsdoc:dev-build','jshint:check', 'jscs']);

};