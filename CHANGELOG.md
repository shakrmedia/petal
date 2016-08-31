Changelog
=========

This changelog is for archive purposes. For latest changelogs, please refer to [releases](https://github.com/shakrmedia/petal/releases) descriptions.


## 0.5.0

- **ADDED:** Added global variables for border radius on various elements. Change the values for the variables to enable rounded borders.
    - `@btn-border-radius`
    - `@input-border-radius`
    - `@panel-border-radius`
    - `@label-border-radius`
    - `@badge-border-radius`
- **CHANGED:** Split button now requires `.btn-split` class alongside `.btn-group`.
- **CHANGED:** `drop-shadow` mixins don't use +merge feature but instead now provide variables of the same name. Use `@drop-shadow` variables when you want to add alongside your existing `box-shadow` properties, and the mixin when you just want a quick apply.
- **DROPPED:** Deprecates `.spaced` class on `.input-addon-btn`. Dropping because of the difficulty it causes when trying to apply border-radius to input groups. If you want spacing between forms and buttons, wrap them in separate containers and apply paddings manually.
- **CHANGED:** `.card` is now an alias of `.panel`. They had shared exactly the same style as now, only difference being the `.hover-em` class which you can use on both now.
- **FIXED:** Minor fixes regarding selectbox styles.

Also, this will probably the first release after Petal will be open-sourced. Yay! :)

## 0.4.0

- Quick margins and padding classes are now in a separate file named `utilities.less` instead of existing `mixins.less`. Add `utilities.less` to import list in your base stylesheet. (83d9b0042a8f018fdfb2cf298e792670dcec6117)
- Adds reference import for dependencies per individual modules. (Variables, mixins, etc) Thanks to this, you can now import individual modules without having to check for which dependencies you need for each files. If you are using `custom-variables.less` override, make sure you import them after the actual modules and they will override default values just fine as they were. (9d20eed1b1fb7c23040ac51836c9bbaf91f3a493)
- `.block`, `.inline-block` quick classes have been removed from `layout.less`. Manually define them in your site stylesheet if you need them. (846f3f9913d7169b6917c4b6d85553d3efb3ad62)
- `basic.less` is now treated as one of the modules, not dependencies. (cf493b048cd94981c4fcb6e683754200c2075b08)
- Font order and fallback font for monospace text blocks has been changed. (cf493b048cd94981c4fcb6e683754200c2075b08)
- Text-related code (`code`, `pre`, `hr`, `li`, `a`) have been moved from `basic.less` to `typography.less`.  (2300dc412feaa810ccd6986ad347da8bc1890ce7)
- `h5` header tag now uses `rem` unit just as others. (2300dc412feaa810ccd6986ad347da8bc1890ce7)


## 0.3.2

- Added new variables / Changed names
	- `btn-border-width`
	- `btn-letter-spacing`
	- `btn-line-height`
	- `input-line-height`

	Now you can easily customize button border width and other typographic settings by changing variable values. Be sure to copy the `variables.less` sheet over to `custom-variables.less` for overriding instead of directly modifying `variables.less` to ensure compatibility with future updates.
- Some variables names have changed slightly for consistency:
	- `checkbox-disable-animation` -> `checkbox-disable-transition`
	- `chk-switch-disable-animation` -> `chk-switch-disable-transition`

	Don't forget to update those names if you had them in `custom-variables.less`.



## 0.3.1

- Adds Modal
	Adds classes for basic modal design.
- Fixes for inconsistent input and button line-heights
	Default `font-size` for `.btn`s have been changed to `0.9em` (was `0.8em`) to match the `input` font size. The button `font-size` was intentionally set smaller than input font size because of the all-caps style, and had larger em `line-height` to compensate for the smaller size, but it was ultimately rendering inconsistently across browsers. As of now there is no way that I know of how I can set identical `line-height`s with flexible units for different elements whilst keeping unique font-size values (without adding additional inner spans in buttons, maybe), so I decided to just ditch varying font-size and equalize all sizes and line heights for form elements. Many `line-height` values for various form elements have been either removed or reset to base value `1`. Thanks to this change, by default settings button texts will appear a bit larger than before, but buttons and inputs in an inline form will now perfectly align in height and vertical alignment.

	If you have set custom variables in your project, the new variable value will not override the value upon updating Petal. Manually update the value if you want to apply the changes.
- Other minor fixes and changes


## 0.3.0

- Updated Petalicons
	CHANGED:
	`draggable` -> `draggable-horizontal`
	`draggable-vertical` -> `draggable`
	`dollar-round` -> `currency-dollar`

	NEW:
	`draggable-horizontal`
	`currency-won`
	`currency-yen`
	`translate-alt`
	`cloud`
	`cloud-check`
	`cloud-cross`
	`cloud-upload`
	`share-alt`
	`outlink`
	`upload-alt`
	`device-tv`
	`device-desktop`
	`device-laptop`
	`device-mobile`
	`device-tablet`

- Refined selectbox dropdown list design, adds dark mode
- Other minor changes
