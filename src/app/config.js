(function(global) {
  'use strict';

  _.extend(global.config, {
    CONTENT_SNIPPETS_EDIT_CSS_URL: process.env.CONTENT_SNIPPETS_EDIT_CSS_URL,
    CKEDITOR_PLUGINS_URL: process.env.CKEDITOR_PLUGINS_URL
  });
}(this));
