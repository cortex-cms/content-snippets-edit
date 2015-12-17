(function(global) {
  'use strict';

  /**
   * Temporarily not using Dotenv because it ain't workin!
   *
   * global.config = {
   *   API_BASE: process.env.API_BASE,
   *   API_ROUTES: {
   *     WEBPAGES: '/webpages',
   *     WEBPAGES_FEED: '/webpages/feed'
   *   },
   *   CONTENT_SNIPPETS_EDIT_CSS_URL: process.env.CONTENT_SNIPPETS_EDIT_CSS_URL,
   *   CKEDITOR_PLUGINS_URL: process.env.CKEDITOR_PLUGINS_URL
   * };
   */

  global.config = {
    API_BASE: 'http://localhost:3000/api/v1',
    API_ROUTES: {
      WEBPAGES: '/webpages',
      WEBPAGES_FEED: '/webpages/feed'
    },
    CONTENT_SNIPPETS_EDIT_CSS_URL: 'https://s3.amazonaws.com/cortex-content-snippets/content-snippets-edit.css',
    CKEDITOR_PLUGINS_URL: 'http://admin.cbcortex.com/ckeditor-plugins/'
  };
}(this));
