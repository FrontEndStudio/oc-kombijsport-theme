# October CMS Kombijsport Theme

[OctoberCMS](https://octobercms.com) theme for [Kombijsport](http://www.kombijsport.nl)

## Installation

`$ php artisan theme:install fes.kombijsport <theme-dir>`

Replace `<theme-dir>` with whatever fits the site you're building.

## Activating the theme

`$ php artisan theme:use <name>`

Where `<name>` is whatever you specified in `theme:install`.

## Prerequisite

* Know how to work with: node, npm, bower, gulp, grunt
* Go to the root folder of this theme: ~ cd ./themes/kombijsport/
* Do:
```
  ~ npm install
  ~ bower install
```
### Cleanup /assets/ folder 

*** ! this is destructive and will remove everything under /assets/ ***

```
~ gulp clean
```

### Build modernizr.js from source

```
~ grunt js-build
```

### Build (JavaScript and Sass) files

*** ! this should be done after you have created modernizr.js with ~ grunt js-build ***

```
~ gulp build
```

