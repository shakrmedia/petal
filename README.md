Petal [![Build Status](https://magnum.travis-ci.com/shakrmedia/petal.svg?token=oGydrksF8C4ZzTmuT3Ki&branch=master)](https://magnum.travis-ci.com/shakrmedia/petal)
=====

<img align="right" width="100" height="100" src="http://shakrmedia.github.io/petal/logo.svg">

Petal is a modern, light CSS UI framework developed at [Shakr](http://shakr.com). 

Petal aims to provide an ample set of consistently designed UI components you can easily utilize in your web projects.

Petal is fully coded on LESS from scratch.


## Setting up Petal
### The Quick Way
Include the `link` code inside the `<head>` of your HTML file.
```HTML
<link rel="stylesheet" type="text/css" href="https://shakr-petal.s3-ap-northeast-1.amazonaws.com/edge/petal.min.css">
```

Refer to the documentation page on how to use the available components and style classes.


## CDN links
In case you want an uncompressed version of the code, we also have that.

#### Uncompressed 
```
https://shakr-petal.s3-ap-northeast-1.amazonaws.com/edge/petal.css
```

#### Minified 
```
https://shakr-petal.s3-ap-northeast-1.amazonaws.com/edge/petal.min.css
```

### The Custom Way
You can customize some settings like colors and font options to fit the look of your project design and manually compile your own build of Petal.

If you already have a LESS compiler set up in your project, just copy the files in the `less` folder from the [Petal repository](https://github.com/ShakrMedia/petal) to your local project folder. It's recommended you put the Petal files in a separate directory (presumably, named "Petal") to avoid confusion.

Alternatively, you can also clone the whole repository and use [grunt](http://gruntjs.com/) to compile Petal, then add the compiled CSS file to your project.

To customize options, change the values of variables in `petal.less` before compiling.


## Changelog
Please view [Releases](https://github.com/shakrmedia/petal/releases) for the changelog.


## External projects included in Petal
- [normalize.css](https://github.com/necolas/normalize.css) by Nicolas Gallagher & Jonathan Neal : MIT License
- [Lato font](http://www.google.com/fonts/specimen/Lato) by Łukasz Dziedzic : SIL Open Font License, 1.1
- [Selecter](https://github.com/Formstone/Selecter) by Ben Plum : MIT License


## Author
- **Hansol Kim** (zvuc) : https://github.com/zvuc/
- and the Shakr Dev team


## License 
Released under the MIT License.
See [LICENSE](https://github.com/ShakrMedia/petal/blob/master/LICENSE) for details.
