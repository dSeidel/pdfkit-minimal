# Stencil Example with PDFKit (not working)

I tried several ways to add pdfkit to my stencil app for PDF generation. But I still fail. So I set up a minimal example:

- stencil init for an app
- removed the router and unneccessary components
- added pdfkit and blob-stream as dependencies
- made a link to click on for generating a pdf

I'm not able to get the app compiled to a running version.

I document my ways here, with the errors I got:

FIRST TRY: Without adjusting stencil.config.ts (i.e., without rollup plugins):

```bash
user@ubuntu-20-04-dev:~/workspace/pdfkit-stencil/pdfkit-minimal$ npx stencil build
[36:56.8]  @stencil/core
[36:57.0]  v2.13.0 🍣
[36:58.3]  build, app, prod mode, started ...
[36:58.3]  transpile started ...
[37:00.3]  transpile finished in 2.01 s
[37:00.3]  copy started ...
[37:00.3]  generate lazy started ...
[37:00.6]  copy finished (3 files) in 216 ms
[37:01.4]  generate lazy finished in 1.03 s

[ ERROR ]  Node Polyfills Required
           For the import "stream" to be bundled from ./node_modules/blob-stream/index.js, ensure the
           "rollup-plugin-node-polyfills" plugin is installed and added to the stencil config plugins (client). Please
           see the bundling docs for more information. Further information: https://stenciljs.com/docs/module-bundling

[37:01.4]  build failed in 3.05 s
```

SECOND TRY: With nodePolyfills as suggested:

```bash
user@ubuntu-20-04-dev:~/workspace/pdfkit-stencil/pdfkit-minimal$ npx stencil build
[39:43.1]  @stencil/core
[39:43.3]  v2.13.0 🍣
[39:44.8]  build, app, prod mode, started ...
[39:44.8]  transpile started ...
[39:47.0]  transpile finished in 2.25 s
[39:47.0]  copy started ...
[39:47.0]  generate lazy started ...
[39:47.3]  copy finished (3 files) in 211 ms
[39:48.5]  generate lazy finished in 1.44 s

[ ERROR ]  Rollup: Plugin Error: ./node_modules/fontkit/src/TTFFont.js:249:2
           Unexpected character '@' (249:2) in
           /home/user/workspace/pdfkit-stencil/pdfkit-minimal/node_modules/fontkit/src/TTFFont.js (plugin: commonjs,
           transform)

    L248:   */
    L249:  @cache
    L250:  get bbox() {

[39:48.5]  build failed in 3.72 s
```

THIRD TRY: With additional babel to handle the legacy decorators:

```bash
user@ubuntu-20-04-dev:~/workspace/pdfkit-stencil/pdfkit-minimal$ npx stencil build
[40:35.2]  @stencil/core
[40:35.4]  v2.13.0 🍣
[40:36.7]  build, app, prod mode, started ...
[40:36.7]  transpile started ...
[40:38.7]  transpile finished in 1.99 s
[40:38.7]  copy started ...
[40:38.7]  generate lazy started ...
babelHelpers: 'bundled' option was used by default. It is recommended to configure this option explicitly, read more here: https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
[40:39.3]  copy finished (3 files) in 615 ms
[40:51.6]  generate lazy finished in 12.92 s
[40:51.6]  build finished in 14.94 s
```

BUT IN BROWSER (using `npm start` to run the app):

```
index-bad3e30f.js:3539 ReferenceError: require is not defined
    at app-root.entry.js:31694:14 undefined
```

The line it `app-root.entry.js` is `const fs$1 = require('fs');`

````

FOURTH TRY: With commonjs option `transformMixedEsModules` (not typed, but seems to work in the `stencil.config.ts`):

```bash
user@ubuntu-20-04-dev:~/workspace/pdfkit-stencil/pdfkit-minimal$ npx stencil build
[43:38.2]  @stencil/core
[43:38.4]  v2.13.0 🍣
[43:39.8]  build, app, prod mode, started ...
[43:39.8]  transpile started ...
[43:41.9]  transpile finished in 2.12 s
[43:41.9]  copy started ...
[43:41.9]  generate lazy started ...
babelHelpers: 'bundled' option was used by default. It is recommended to configure this option explicitly, read more here: https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
[43:42.7]  copy finished (3 files) in 756 ms
[43:55.8]  generate lazy finished in 13.82 s
[43:55.8]  build finished in 15.98 s
````

BUT IN BROWSER (using `npm start` to run the app):

```
index-bad3e30f.js:3539 ReferenceError: Cannot access 'GPOSLookup' before initialization
    at app-root.entry.js:37591:60 undefined
```

## General Stencil Getting Started

To start a new project using Stencil, clone this repo to a new directory:

```bash
npm init stencil app
```

and run:

```bash
npm start
```

To build the app for production, run:

```bash
npm run build
```

To run the unit tests once, run:

```
npm test
```

To run the unit tests and watch for file changes during development, run:

```
npm run test.watch
```
