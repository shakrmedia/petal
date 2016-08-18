Petal [![Build Status](https://travis-ci.org/shakrmedia/petal.svg?branch=master)](https://travis-ci.org/shakrmedia/petal)
=====

<img align="right" width="100" height="100" src="http://shakrmedia.github.io/petal/assets/petal-logo.svg">

Petal is a modern, light CSS UI framework developed at [Shakr](http://shakr.com).

Petal aims to provide an ample set of consistently designed UI components you can easily utilize in your web projects.

Petal is fully coded on LESS from scratch.


## Setting up Petal in your project
```
https://petalcdn.shakr.com/edge/petal.css
https://petalcdn.shakr.com/edge/petal.min.css
```
Use the CDN links above for a quick slap-on usage.

Please refer to the [documentation](http://shakrmedia.github.io/petal/) for other advanced ways to use Petal in your project.


## Developing Petal
#### Build Petal
Petal uses [Grunt](http://gruntjs.com/getting-started) for compiling LESS files to a single `petal.css` file. Run `grunt petal` to compile Petal for a single time. Run `grunt dev` to go into development mode where files in the Petal directory will be watched, building automatically when you make changes to any of the source files. (This will also build the documentation.)

#### Build Docs
Petal's [documentation](http://shakrmedia.github.io/petal/) is built using [Assemble](http://assemble.io/). Run `grunt` (default task) to build Petal and documentation pages for a single time, `grunt dev` for continuous watching and automatic building. The documentation will be built into `_gh-pages` folder; this folder, along with the `build` folder, is ignored by gitignore in `master` branch to prevent pushing compiled files to repository.

The `dev` task will also run a local webserver based on the `_gh-pages` folder. While running the `dev` task, you can access the built documentation at `localhost:9000`. The pages will also livereload when you save any of the watched files.

#### Deploy Docs
To deploy the docs, you will need to set up the `_gh-pages` folder as the root folder of the Petal repository's `gh-pages` branch. To do this, first remove the existing `_gh-pages` folder. Then run:
```
git clone --branch gh-pages https://github.com/shakrmedia/petal.git _gh-pages
```
This will clone the existing `gh-pages` branch to the `_gh-pages` folder inside Petal's repo folder. Now you can run `grunt` in Petal to build the files, navigate back into `_gh-pages` folder, push the changed files to `gh-pages` branch. Github page will be automatically updated.



## Changelog
Please view [Releases](https://github.com/shakrmedia/petal/releases) for the changelog.


## External projects included in Petal
- [normalize.css](https://github.com/necolas/normalize.css) by Nicolas Gallagher & Jonathan Neal : MIT License
- [Lato font](http://www.google.com/fonts/specimen/Lato) by Łukasz Dziedzic : SIL Open Font License, 1.1
- [Selecter](https://github.com/Formstone/Selecter) by Ben Plum : MIT License


## Author
- **Hansol Kim** (zvuc) : https://github.com/zvuc/
- with help and support from the Shakr Dev team


## License 
Released under the MIT License.
See [LICENSE](https://github.com/ShakrMedia/petal/blob/master/LICENSE) for details.
