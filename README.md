# Content Snippets (Edit)

A tool to enable in-page editing of elements with [Cortex](https://github.com/cortex-cms) as a backend.

### Building/Watching

Install some global dependencies, then project dependencies:

```sh
$ npm -g install bower gulp
$ npm install
$ bower install
```

You will also need to host/locate several CKEditor plugins, which should be available via any hosted Cortex instance. See `main.js` for further information.

Now you can build or watch the project! Built and Compiled assets will be plopped into the `dist` directory.

```sh
$ gulp build
or
$ gulp watch
or, to minify assets:
$ gulp compile
````

### Configuration

Before using or distributing `content-snippets-edit`, the `.env` file should be configured. Copy and rename the `.env.example` provided and configure to match the environment.
