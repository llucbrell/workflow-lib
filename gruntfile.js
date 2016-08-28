




module.exports = function (grunt) {
    
    // ---------------------- CONSTANT sources  ------------------------------ //
    
    var initial_directories = ['.tmp', '.backup', '.tmp/replacements', '.tmp/built', 'test', 'js', 'doc', 'doc/.module', 'spec', 'spec/support'],
        // used with jshint and jscs
        javascript_files = ['js/**/*.js', '*.js', 'test', 'test/*/**'],
        // javascripts parsed for documentation
        javascript_to_docs = ['js/**/*.js','*.js'],
        //documentation destination for temporary consult
        destination_docs = "doc",
        // destination for documentation
        build_docs = "doc",
        // destination of the build task
        build_dest = '.tmp/built',
        // used when copy for a built construction
        all_build_files =  ['**/*', '**' , '.*', '**/.*', '.**/.*', '!.git','!.git/*', '!.git/**/*','!js', '!js/**/*', '!js/*' ,'!*.js', '!test','!test/*', '!test/**/*',  '!doc','!doc/*', '!doc/**/*', '!.tmp','!.tmp/*', '!.tmp/**/*', '!.backup','!.backup/*', '!.backup/**/*', ],
        // used for banner javascripts in built
        javascript_built = ['js/**/*.js', '*.js' ,'test/**/*.js', 'test/*.js'],
        // used for banner docs in built
        docs_files = ['doc/*.html'],
        //used for backup process
        all_backup_files = ['*/**', '*','.*.yml', '.*nore', '!built'],
        backup_dest = '.tmp/backup',
        //files to be excluded for root final replacement
        exclude_clean = ['*', '.*', '*.*' , '!.build.sh', '!.scripts' ,'!.git', '.git/*','!.git/**/*', '!.tmp', '!.tmp/*', '!.tmp/**/*', '!.backup', '!.backup/*', '!.backup/**/*', '!doc','!doc/*', '!doc/**/*'],
        //used for restore data
        project_temp_sources = ['.tmp/built','.tmp/built/*', '.tmp/built/*.*', '.tmp/built/.*.*','.tmp/built/**/*', '.tmp/replacements/*', '.tmp/replacements/**/*'],

        
        
        
    // ---------------------- CONSTANT task options -------------------------- //

        jshint_rules = {
                    // enforcement options
                        curly: true, // all loops with curly braces
                        eqeqeq: true, // prohibited use of == and != instead use === and !== 
                        esversion: 5, // version of the javascript 3 older-brows, 5 ecmascript 5, 6 ecmascript 6
                        //forin: true, // obligate to filter in the use of for in
                        latedef: true, // not use of variables before declarations
                        noarg: true, // no use of arguments.calle and callee
                        nonew: true, // not call the constructor outside of a variable -- or side-effects
                        //pluplus: true // don't use of ++ and -- in the code
                        //undef: true // advise of undefined variables -- use global statement for variables in other files
                        //strict: true // there must be strict in function level, ('global' for strict in global)
                        unused: true, // advise if not uses some of your variables
                        //shadow: true // allow variable shadowing (var declared inside and outside a function)
                    // Relaxing options
                        laxbreak: true, // use a break-line more laxe
                    // Environment
                        //browser: true, // jshint knows standard javascript globals from the browser document window, etc., jshint already knows
                        //browserify:  true // used with browserify tool of npm --> for front end dev
                        jasmine: true, // globals for jassmine
                        //mocha: true, //mocha globals
                        //qunit: true, // globals for qunit
                        //jquery: true, // globals for jquery -->front end
                        node: true, // glob for node
                        //phantom: true, //globals for phantom
                    // for variables
                        //undef:true, //for undefined values, at this moment disabled
                        predef: [], // extra globals
                       },
        jscs_rules ={config: '.jscsrc'},
        
    // ---------------------- BANNER strings -------------------------------- //
      
        comment = {html:{open: "<!--", close: "-->"},jscss:{open: "/*", close: "*/"}, sharp:{open:"#"}, js:{open:"//"}},
        break_lines = "\n\n\n",               

        
        

        
        
        
            // ------- LOGOS data construction  ------- //
        
        data_info = "                  ;         ;                 Project  >      <%= pkg.name %>\n"        
+"                 L        t                   Version  >      <%= pkg.version %>\n"
+"               C       t                      Author   >      <%= pkg.author %>\n"         
+"                 8    C                       License  >      <%= pkg.license %>\n"
+"                 ;Ct                          Date     >      <%= grunt.template.today('yyyy-mm-dd') %>\n\n"
+"       <%= pkg.description %>\n HHEADER",

  
        
        created_info = data_info,
        
            // ------- LOGOS construction ------- //
        
        console_logo ="\n"  
+" ▄ .▄      ▄▄▄▄· ▄▄▄▄· ▄▄▄ ..▄▄ ·  ▄▄·       ·▄▄▄▄  ▄▄▄ .\n"
+"██▪▐█▪     ▐█ ▀█▪▐█ ▀█▪▀▄.▀·▐█ ▀. ▐█ ▌▪▪     ██▪ ██ ▀▄.▀·\n"
+"██▀▐█ ▄█▀▄ ▐█▀▀█▄▐█▀▀█▄▐▀▀▪▄▄▀▀▀█▄██ ▄▄ ▄█▀▄ ▐█· ▐█▌▐▀▀▪▄\n"
+"██▌▐▀▐█▌.▐▌██▄▪▐███▄▪▐█▐█▄▄▌▐█▄▪▐█▐███▌▐█▌.▐▌██. ██ ▐█▄▄▌\n"
+"▀▀▀ · ▀█▄▀▪·▀▀▀▀ ·▀▀▀▀  ▀▀▀  ▀▀▀▀ ·▀▀▀  ▀█▄▀▪▀▀▀▀▀•  ▀▀▀ \n\n"
+"    ┌─┐┬─┐┬ ┬┌┐┌┌┬┐  ┌┬┐┌─┐┌┬┐┌─┐┬  ┌─┐┌┬┐┌─┐\n"
+"    │ ┬├┬┘│ ││││ │    │ ├┤ │││├─┘│  ├─┤ │ ├┤ \n"
+"    └─┘┴└─└─┘┘└┘ ┴    ┴ └─┘┴ ┴┴  ┴─┘┴ ┴ ┴ └─┘\n",
                                                         
                                                         


        
        header_logo = "HHEADER\n"    
+"       dP                dP       dP                                                 dP         \n" 
+"       88                88       88                                                 88         \n" 
+"       88d888b. .d8888b. 88d888b. 88d888b. .d8888b. .d8888b. .d8888b. .d8888b. .d888b88 .d8888b.\n" 
+"       88'  `88 88'  `88 88'  `88 88'  `88 88ooood8 Y8ooooo. 88'  `\"\" 88'  `88 88'  `88 88ooood8\n" 
+"       88    88 88.  .88 88.  .88 88.  .88 88.  ...       88 88.  ... 88.  .88 88.  .88 88.  ...\n" 
+"       dP    dP `88888P' 88Y8888' 88Y8888' `88888P' `88888P' `88888P' `88888P' `88888P8 `88888P'\n\n\n"
+"                                                                                                 \n"    
+"                                   i8@@8Li.                t@8000                                \n"   
+"                                 .GitL:::GGGC;             G8ifGt80LtL11,.                       \n"   
+"                                  C,Li;i8i;Ci:ti  i11i:;i::i00ii;;ifffi;;f@8                     \n"   
+"                                  ,L;0L88iCf;L01f.   ,;  ifG0101f0t:;:;;;1GC                     \n"   
+"                                    t@80CL0LfC,    ,1i :;ii CGti1;G8fi::fCiL:                    \n"   
+"                                      L0C11tGf;      ,1;   L .;:.         Lii                    \n"   
+"                                      ,i0fLGt;f1.    t:                    1.                    \n"   
+"                                    ;0C8Li;t88L;:,,i  :t,          :1 .,  .t                     \n"   
+"                                  18i;i;1fC8tL,      .             ,  1. :L                      \n"   
+"                                1C:;G8Gf;f;             ::::      ;LG0t. iLG0CCi                 \n"   
+"            ..t0fC0tGt,       iC:ifCGCt:             ;,    ;L  i G1G0C11CLCL1C88CGti             \n"   
+"          ,Li;G01f01C::GC.   C8G1;:;:;              t           ii8@@@@@C  ;G81iGfitCtt1tf:      \n"   
+"        .CiGtL,      :0:;8: Gi:i08@8.           ..                .ifft,       iL:.       .1     \n"   
+"       .0CLfi          Ct;;08Cffti1.          .,                                f.  i   it:      \n"   
+"       t1i:L            0GLf:::;;;i          ;.                                 i  :.  ;   ::    \n"   
+"       0@@@;            ,iGt:::;:1          f                                    ;; ,i  i1ti     \n"   
+"       C@@@.             18888@@8C         .f     :t11:                               t. i       \n"   
+"       .8@0               G;:::;C8f      :;.L   ,i   , f                                         \n"   
+"                          ff:C8L;;;: t81,:8::f..f    @1 1                                        \n"   
+"                          G0i:::i8L10@8,,ff,f0L0. t@,.f.1                                        \n"   
+"                           C1:18L:i8;88,:Lf8t:f:   : Lt:.                                        \n"   
+"                           ,80C:::8t:L8f:G@G,:L   ,@8  i   ;i.                                   \n"   
+"                            ,8:::t8i::C8C1@8CfG   f@G i ;;    ;1                                 \n"   
+"                              tC:t8f::,;C8C1L0f     .G1f..1 G@,1                                 \n"   
+"                                i0t01::::::f01,f1,iG0;1  Gf    1                                 \n"   
+"                                   :tC00Lt:.      ;G,       8L1.           \n"
+"                          .LG:;                    f.  f@@1  t.            \n"
+"                      ,;.0ttC::::                   L   :t: ,:             \n"
+"                 i;ftttttttt8:::;                    .L.  :1.              \n"
+"             .:Gtttttfttttttttf;::;                                        \n"
+"         i8tttttft::Cttttttttt;::::                                        \n"
+"         tttC,.;;:::::fttttttttt::::;                                      \n"
+"       ,::1Lt8;:::::::tttttttttt;:::f                                      \n"
+"     8:0tttttttG;::::::;tttttttttt:::;                                     \n"
+"   CtfttttttttttG::::::::tttttttttt:::i                                    \n"
+"   ttttttttttttttt:::::::;tttttttttC:::                                    \n"
+"    Gtttttttttttttt:::::::Gtttttttttf::t                                   \n"
+"    .ttttttttttttttt:L.Cii;tttttttttL;f1                                   \n"
+"     Lttttttttttttttfift,8ttttttttff            \n"
+"      Gttttttttttttt0fttttttttt,                \n"
+"       tttttttt1GGttCtLtG8G                     \n"
+"        .1ft.i,.  t18i           GGGf;;;:::::;::i;:;C \n" 
+"                t          .ifi:::;:;1fft11if;L11LLf1itC8fi \n"  
+"                   ;  C8LttttCCLttttttttG1ft1f       \n" 
+"                   :         t                     \n",
    
    
            logo_footer = "HFOOTER\n"
+"888               888       888                                                       888     \n" 
+"888               888       888                                                       888      \n"
+"888               888       888                                                       888       \n"
+"888-~88e  e88~-_  888-~88e  888-~88e   e88~~8e   d88~\  e88~~\  e88~~\  e88~-_   e88~\888  e88~~8e \n"
+"888  888 d888   i 888  888b 888  888b d888  88b C888   d888    d888    d888   i d888  888 d888  88b \n"
+"888  888 8888   | 888  8888 888  8888 8888__888  Y88b  8888    8888    8888   | 8888  888 8888__888 \n"
+"888  888 Y888   ' 888  888P 888  888P Y888    ,   888D Y888    Y888    Y888   ' Y888  888 Y888    , \n"
+"888  888  \"88_-~  888-_88\"  888-_88\"   \"88___/  \_88P   \"88__/  \"88__/  \"88_-~   \"88_/888  \"88___/  \n"
+"                        \n"
+"                                                                        copyright <%= pkg.author %>\n"
+"                                                                           hobbescode@gmail.com \n"
+"               :088C;                                                  \n"
+"          ,008000LtCCt.  it;1;tC00G00LfLG0t                            \n" 
+"         :800808000Gt.t0GCCGGG00L; ...:tLCt1tt0G,                      \n" 
+"          i0800LCL880C.,;  fG0t                ,8G0G000GC,             \n"  
+"          ;0080C.    .    f0C                   ,80000GG00;            \n"  
+"           :8080GftC.                .           .; 1GfGGLi            \n"  
+"             ,LG80C.             1G1 .0C; .1CCG1    :8GL0L.            \n"  
+"               .C800Gf:        ,t. 1   G0fL.C  Cf    ;                 \n"  
+"              18@0G80GCf     ::   :0G0 1t  :0G t1   i,                 \n" 
+"               t01     L     ,i         t:      ,L ..11                \n"  
+"            .Gti@.1i ,C1C    ;         ;1       11:GG0f                \n"  
+"         .1C1..L8018C8C0:    f        1G;      :L   ,Lf                \n"  
+"          ,C0t  ;C,CG000    1       C,fi      G     C.                 \n" 
+"      18G1            :C,   1,   ,LGCG01    .Gt  LftL                  \n" 
+"        :1f01                 .f08080G00Gtf0L, fC0080G1                \n" 
+"      tC1;                  :0LLt,.,,,,tL0G.    ;:t8C.                 \n" 
+"     C808Lt10,              @G f800G88881 1G:      ;C0C0C.             \n" 
+"          i0                i0808808088C81;GC       ff:                \n" 
+"        ;01:i1:               f0000GG008000G.        ;ff,              \n" 
+"        :f1. 1i                 .f@0000000,        ii   .              \n" 
+"           iG.                                      .1f.               \n" 
+"          ,1CG88L     :       .                 ,   it,                \n" 
+"                 .tt, tt      i1;;f0L          :,i0L:                  \n" 
+"               .i:    ,;L:                 G:   ,t                     \n" 
+"                        .G0t,           .f0  i;  ;:                    \n" 
+"                 tCGL       i@8G0LLLLC80f,. L                          \n"  
+"              ,LG1:            ..,,,.                                  \n" 
+"              18G000GGL.            .1.                                \n" 
+"             LG;    .;LG           ft                                  \n" 
+"             G8i      ,fGL         1G:                                 \n"  
+"         .1G0G800CCG0G0i             1t;.                              \n" 
+"         .GGG0GGGCGCG0G0,            :Cf;.                             \n" 
+"          f0C        .GL            ;10L                               \n" 
+"         fGG.       if                ;C;                              \n" 
+"         100GG00C;,Ct;:.           .0f,if1                             \n" 
+"        .G0CGG08L000:GL.            :C.                                \n" 
+"        10G  ,1CG00GG:               .Ci       \n HFOOTER",
    
        
    // --------------------- TEXT files values ------------------------------- //
        
        readme_text = "#Workflow-lib\n"
                             +"For running workflow-lib you must to ensure you know how to work with nodejs, npm and grunt. To start, clone the repository and inicialize some of the dependencies\n"
                             + "## Building\n"
                            +"Download the code\n"
                            +"```js\n"
                            +"git clone \n"
                            +"/* you can ignore the next two lines\n"
                            +"if you have already installed */ \n"
                            +"npm install -g grunt cli\n"
                            +"npm install -g jasmine\n"
                            +"```\n"
                            +"Start a project\n"
                            +"```js\n"
                            +"npm start \n"
                            +"/* Rename and answer the questions\n"
                            +"about your project name, etc., */\n"
                            +"npm install \n"
                            +"// install the dependencies \n"
                            +"grunt create \n"
                            +"// build all you need for the project \n"
                            +"```\n"
                             + "## Usage\n\n"
                             +"```js\n"
                             +"grunt work \n"
                             +"// for quick tests and basic workflow\n"
                             +"\n"
                             +"\n"
                             +"grunt build \n"
                             +"// for building --> see on built directory\n"
                             +"\n"
                             +"\n"
                             +"grunt backup \n"
                             +"// if you need a backup --> .tmp/backup\n"
                             +"```\n"
                             + "Remember that this template clean the git repository so you can init git from the beggining. And remember you can use a version updater as [dub-plus](https://www.npmjs.com/package/dub-plus) for control of your versioning style."
                             +"\n",
        
        license_text =  "#The MIT License\n"
                                +"\n"
                                +"Copyright (c) Lucas_C / llucbrell 2015\n"
                                +"\n"
                                +"Permission is hereby granted, free of charge, to any person obtaining a copy"
                                +"of this software and associated documentation files (the 'Software'), to deal"
                                +"in the Software without restriction, including without limitation the rights"
                                +"to use, copy, modify, merge, publish, distribute, sublicense, and/or sell"
                                +"copies of the Software, and to permit persons to whom the Software is"
                                +"furnished to do so, subject to the following conditions:\n" 
                                +"\n"
                                +"The above copyright notice and this permission notice shall be included in"
                                +"all copies or substantial portions of the Software.\n"
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
                                +"#but built/node_modules\n"
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
                 "spec/support/jasmine.json": function(fs, fd, done) {
                    fs.writeSync(fd, jasmine_text);
                    done();
              },
                "test/test1.spec.js": function(fs, fd, done) {
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
            main: {
                src: javascript_files,
                options: jscs_rules
            }
            // You can add more configurations over here
      },

        /*
        jscs: {
            src: javascript_files,
                options: { //configurar bien
                    config: ".jscsrc",
                    //esnext: true, // If you use ES6 http://jscs.info/overview.html#esnext 
                    //fix: true, // Autofix code style violations when possible. 
                    requireCurlyBraces: [ "if" ],

            }
        },*/
        
//                      BANNERS GENERATOR
        // create banners for the project
       
        usebanner: {
            "create-javascript-banners": {
              options: {
                position: 'top',
                banner: comment.jscss.open + header_logo + created_info +comment.jscss.close + break_lines,
                linebreak: true
              },
              files: {
                src: javascript_files,
              }
            },
            "create-javascript-foot-banners": {
              options: {
                position: 'bottom',
                banner: break_lines + comment.jscss.open + logo_footer + comment.jscss.close,
                linebreak: true
              },
              files: {
                src: javascript_files,
              }
            },
              
            "create-docs-header-ban": {
              options: {
                position: 'top',
                banner: comment.html.open + header_logo + created_info + comment.html.close,
                linebreak: true
              },
              files: {
                src: docs_files
              }
            },
            "create-docs-footer-ban": {
              options: {
                position: 'bottom',
                banner: comment.html.open + logo_footer + comment.html.close,
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
            backup:{
                src:['.tmp/backup/*']
            },
            tmp:{
                src:['.tmp']
            },
             "tmp-build":{
                src:['.tmp/built']
            },
            git:{
                src:['.git']
            },
             doc:{
                src: destination_docs
            },
            root:{
                src: exclude_clean
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
              "restore": {
                files: [ 
                         {
                             expand:true,
                             filter: 'isFile',
                             //flatten:true,
                             cwd: '', 
                             src: project_temp_sources , 
                             dest: 'flat'
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
            },
            
             // build root
          "copy-root":{
            command:[
              'bash .scripts/build.sh'

            ].join('&&')
            },
            // bypass the jsdoc bug
            "copy-doc-mod":{
            command:[
              'bash .scripts/create.sh'

            ].join('&&')
            },
            "restore-doc":{
            command:[
              'bash .scripts/restore_doc.sh'

            ].join('&&')
            },

          },
          
     
        
        

//                      REPLACE TEXT TASK
        // replace the banners for the new ones
        
        
        
        'string-replace': {
          banners: {
             files: [{
                 expand: true,
                 src: javascript_built,
                 dest: '.tmp/replacements/'
                 //'dest': 'built/*.js',
                }],
            options: {
              replacements: [{
                pattern: /\/\*\HHEADER[\s\S]*HHEADER\*\//, //match for everything betweeen /* and for header */
                replacement: comment.jscss.open + header_logo + created_info + comment.jscss.close + break_lines,
              }, 
                {
                pattern: /\/\*\HFOOTER[\s\S]*HFOOTER\*\//, //match for anything between /* and for footer */
                replacement: break_lines + comment.jscss.open + logo_footer + comment.jscss.close,

            },]
            }
          },
      
        },


        
    });
    
     // ------------------- Before Grunt advises -----------------------  //

        console.log(console_logo); // audrey logo
                                      
    
    
    
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
    grunt.loadNpmTasks('grunt-string-replace');
    
    
    // ------------------------ GRUNT TASKS  ------------------------  //
  
    // tasks
    grunt.registerTask('create', // generates the library project
                       [
                        'mkdir', 
                        'file-creator:generate-files',
                        'usebanner:create-javascript-banners',
                        'usebanner:create-javascript-foot-banners',
                        'shell:copy-doc-mod',       
                        'clean:git'                                              
                        ]);
    
    grunt.registerTask('work', // for quick working comprobations 
                       [
                        'jshint:check',
                        'shell:jasmine-global', 

                        ]);

    grunt.registerTask('doc', // for quick working comprobations 
                       [
                        'shell:restore-doc',
                        'jsdoc:dev-build',                     

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
                        'shell:restore-doc',
                        'jsdoc:dev-build',
                        'usebanner:create-docs-header-ban',
                        'usebanner:create-docs-footer-ban',
                        'clean:tmp',
                        'copy:build',
                        'string-replace:banners',
                        'clean:root',
                        'shell:copy-root',
                       ]);

    


};





