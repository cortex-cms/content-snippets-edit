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
    API_BASE: 'https://api.cbcortex.com/api/v1',
    API_ROUTES: {
      WEBPAGES: '/webpages',
      WEBPAGES_FEED: '/webpages/feed'
    },
    CONTENT_SNIPPETS_EDIT_CSS_URL: 'https://s3.amazonaws.com/cortex-content-snippets/content-snippets-edit.css',
    CKEDITOR_PLUGINS_URL: 'https://admin.cbcortex.com/ckeditor-plugins/'
  };
}(this));
