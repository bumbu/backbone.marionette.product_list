# Backbone Shop Test

This is a test application

## Files and Folders structure

* Grunt.js
* package.json
* README.md

* _src_ - Front-end source
* _src/components_ - Front-end components source
* _app_ - Application
* _test_ - Tests

## Developing front-end

1. install node.js
*  cd to project folder
*  run ```npm instal```
*  install bower ```npm install -g bower```
*  install components ```bower install```
*  run ```grunt```

Now you are in live development mode. Making any changes will compile automatically JS and CSS source.

Before commiting changes run ```grunt build```. This command will compile, minify and copy all the files in the right folders.

## Used technologies
* Grunt
* Bootstrap
* Requirejs
* Underscore
* jQuery
* Modernizr
* Backbone
* Marionette
* localStorage
* Wreqr

## TODO
* Minimize all JS for production version
* Build requirejs modules (r.js??)
* Finish all incode TODOs
* Implement localStorage sync in Backbone maner
