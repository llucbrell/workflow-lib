
module.exports = function (grunt) {
    
    // ---------------------- CONSTANT sources  ------------------------------ //
    
    var initial_directories = ['.tmp', '.tmp/backup', 'test', 'js', 'built', 'built/docs', 'built/js', 'spec', 'spec/support'],
        javascript_to_docs = ['js/**/*.js','*.js'],
        javascript_files = ['js/**/*.js', '*.js'],
        destination_docs = ".tmp/doc",
        all_build_files =  ['*/**', '*','.*.yml', '.*nore', '!built', '!test', '!gruntfile.js','!package.json','!.gitignore, !.npmignore', '*.yml'],
        build_docs = "built/doc",
        build_dest = 'built',
        javascript_built = ['built/js/**/*.js', 'built/*.js'],
        docs_files = ['built/doc/**.html'],
        ignore_files = ['built/.gitignore', 'built/.npmignore', 'built/.*.yml'],
        all_backup_files = ['*/**', '*','.*.yml', '.*nore'],
        backup_dest = '.tmp/backup',
        
        
        
        
    // ---------------------- CONSTANT task options -------------------------- //

        jshint_rules = {laxbreak: true},
        
        
    // ---------------------- HEADER strings -------------------------------- //
        
        comment = {html:{open: "<!--", close: "-->"},jscss:{open: "/*", close: "*/"}, sharp:{open:"#"}, js:{open:"//"}},
        header_logo = 'LOGO +++ \n',        
        spaces = "                         ",       
        spaces2 = "       ",        
        break_lines = "\n\n\n",        
        end_banner = "|@#~|",        
        separator = "// ------------------------------------------------------------------ // \n",
        texted_separator = "// ------------------------- <%= pkg.name %> -------------------------- // ",

        
        created_info = spaces2 +texted_separator+ '\n'+ spaces2 + '   <%= pkg.description %> \n' +'\n' +  spaces + 'author: <%= pkg.author %> \n' + spaces + 'version: <%= pkg.version %> \n' + spaces + 'built-date: <%= grunt.template.today("yyyy-mm-dd") %> \n'  +spaces + 'license: <%= pkg.license %> \n'+'\n'+spaces2 + separator +'\n',
        
        last_built = '<%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> - v<%= pkg.version %> - ',
        
        ig_header = spaces2 +texted_separator+ '\n#\n#'+ spaces2 + '   <%= pkg.description %> \n#' +'\n#' +  spaces + 'author: <%= pkg.author %> \n#' + spaces + 'start-date: <%= grunt.template.today("yyyy-mm-dd") %> \n#'  +spaces + 'license: <%= pkg.license %> \n#'+'\n#'+spaces2 + separator +'\n',
        
        
        
    // --------------------- TEXT files values ------------------------------- //
        
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
        
        license_text =  "The MIT License\n"
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
        
        gitignore_text =  "#ignore node modules\n"
                                +"node_modules\n"
                                +"#ignore grunt temporary files\n"
                                +".tmp\n",
        
        npmignore_text = "#ignore all except what it's from built\n" 
                                +"*\n"
                                +"#not built\n"
                                +"!built\n"
                                +"built/node_modules",//revisar si los modulos de nodejs de built hay que ignorarlos o no

                                
        
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
                                +'before_install:\n'
                                +' - npm install -g jasmine\n'
                                +' - npm install -g npm\n'
                                +' - npm install -g grunt-cli\n',
        
        jasmine_text = ' {\n'
                            + '"spec_dir": "test",\n'
                            + '"spec_files": \n['
                            + '"**/*[sS]pec.js"\n'
                            + ' ],\n'
                            + '"helpers": [\n'
                            + '"helpers/**/*.js"'
                            + '  ]\n'
                            + '}\n',
        
        test_text = 'describe("A library test", function() {\n'
                            + '  it("contains spec with an expectation", function() {\n'
                            + '    expect(true).toBe(true);\n'
                            + '  });\n'
                            + '});\n',

    
        check_text = "\n"; 
    
 
  
    // ---------------------- GRUNT CONFIG TASKS ---------------------  //
    grunt.initConfig({
        
        // to use properties of the project guided by package.json file
        pkg: grunt.file.readJSON('package.json'),
        
//                      CREATE DIRECTORIES TASKS 
        // building project principal structure
        mkdir: {
            all: {
                options: {
                create: initial_directories
                }
            }
        },
        
//                      FILE GENERATOR
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
              },
                 "jasmine.json": function(fs, fd, done) {
                    fs.writeSync(fd, jasmine_text);
                    done();
              },
                "test1.spec.js": function(fs, fd, done) {
                    fs.writeSync(fd, test_text);
                    done();
              },
                
            },
             // second use.. generate more files when it's demand 
            "gen":{
               "checktext.txt": function(fs, fd, done) {
                    fs.writeSync(fd, check_text);
                    done();
              }
            }
          },
        
//                      DOCUMENT GENERATOR
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
        
//                      JAVASCRIPT LINT
        // lint javascript files
        
        jshint:{
            check:{
                src: javascript_files,
                options: jshint_rules
                
            }
        },
        
//                      JAVASCRIPT STYLES
        //styling javascript files
        
        jscs: {
            src: javascript_files,
                options: { //configurar bien
                    config: ".jscsrc",
                    //esnext: true, // If you use ES6 http://jscs.info/overview.html#esnext 
                    fix: true, // Autofix code style violations when possible. 
                    requireCurlyBraces: [ "if" ]
            }
        },
        
//                      BANNERS GENERATOR
        // create banners for the project
       
        usebanner: {
            "create-javascript-banners": {
              options: {
                position: 'top',
                banner: comment.jscss.open + header_logo + created_info + comment.jscss.close + break_lines + comment.js.open + end_banner,
                linebreak: true
              },
              files: {
                src: javascript_built,
              }
            },
              
             "create-ignore-banners": {
              options: {
                position: 'top',
                banner: comment.sharp.open  + ig_header + break_lines,
                linebreak: true
              },
              files: {
                src: ignore_files
              }
            },
          
            "create-docs-banners": {
              options: {
                position: 'top',
                banner: comment.html.open + comment.html.close,
                linebreak: true
              },
              files: {
                src: docs_files
              }
            },
            
        },
           
//                      CLEAN TASK
        // clean temporary files before make building
                     
        clean:{
            tmp:{
                src:['.tmp/backup/*']
            },
             "last-build":{
                src:['built/*']
            },
            git:{
                src:['.git']
            },
        },
        
        
//                      COPY TASKS 

          copy: {
              // make a backup to avoid problems
              "backup": {
                files: [ 
                         {
                             expand: true, 
                             src: all_backup_files , 
                             dest: backup_dest
                         },
                       ]
              },
              // copy files for building
              "build": {
                files: [ 
                         {
                             expand: true, 
                             src: all_build_files , 
                             dest: build_dest
                         },
                       ]
              },                  
            },
        
//                      SHELL TASKS 
        // shell commands for linux
        
         shell:{
             // run jasmine tests
          "jasmine-global":{
            command:[
              'jasmine'

            ].join('&&')
            }
          },
     

       
        
    });
    
     // ------------------- Before Grunt advises -----------------------  //

        console.log(comment.html.open); // audrey logo
                                        // license
    
    
    
    
    // --------------------- GRUNT LOAD PLUGGINS ---------------------  //

    // load plugin
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-file-creator');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    
    
    // ------------------------ GRUNT TASKS  ------------------------  //
  
    // tasks
    grunt.registerTask('create', // generates the library project
                       [
                        'mkdir', 
                        'file-creator:generate-files',
                        //'clean:git'                                              
                        ]);
    
    grunt.registerTask('work', // for quick working comprobations 
                       [
                        'jshint:check',
                        'shell:jasmine-global', 
                        ]);
    
    grunt.registerTask('backup', // if you want a backup
                       [
                        'clean:backup',
                        'copy:backup'
                       ]);
    
    grunt.registerTask('test', // for npm test runner
                       [
                        'jshint:check',
                        'jscs',
                        'shell:jasmine-global',                       
                        ]);
    
    grunt.registerTask('build', // make a build, remember use dub /+/++/+++ before
                       [
                        'jshint:check', 
                        'jscs', 
                        'shell:jasmine-global',
                        'clean:last-build',
                        'jsdoc:dev-build',
                        'copy:build',                      
                        'usebanner'
                       ]);

};





