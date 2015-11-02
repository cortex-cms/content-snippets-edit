(function(global) {
  'use strict';

  $('body').prepend( $('<toolbar></toolbar>') );
  $('body').append( $('<media-library></media-library>') );
  $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'http://fonts.googleapis.com/css?family=Roboto:400,500,700,300,100') );
  $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'https://fonts.googleapis.com/icon?family=Material+Icons') );
  $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', config.CONTENT_SNIPPETS_EDIT_CSS_URL) );
  $.getScript('https://cdn.ckeditor.com/4.5.4/standard/ckeditor.js', function() {
    global.CKEDITOR.config.autoParagraph = false;
    global.CKEDITOR.config.allowedContent = true;
    global.CKEDITOR.plugins.addExternal( 'media-selector', global.config.CKEDITOR_PLUGINS_URL + 'media-selector/', 'plugin.js' );
    global.CKEDITOR.plugins.addExternal( 'sourcedialog', global.config.CKEDITOR_PLUGINS_URL + 'sourcedialog/', 'plugin.js' );
    global.CKEDITOR.plugins.addExternal( 'codemirror', global.config.CKEDITOR_PLUGINS_URL + 'codemirror/', 'plugin.js' );
    global.CKEDITOR.config.extraPlugins = 'media-selector,sourcedialog';
    global.CKEDITOR.config.removePlugins = 'image,sourcearea';

    var stores = {
      MediasStore: new MediasStore()
    };

    for (var k in stores) {
      RiotControl.addStore(stores[k]);
    }

    _.extend(global.stores, stores);

    riot.mount('snippet');
    riot.mount('media-library');
    riot.mount('toolbar');
  });
}(this));
