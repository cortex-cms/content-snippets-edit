(function(global) {
  'use strict';

  global.utility = {
    currentEditor: {},
    mediaLibraryModal: {},
    insertMedia: function(media) {
      this.currentEditor.insertHtml(getMediaHtml(media));
      this.mediaLibraryModal.closeModal();
    }
  };

  var getMediaHtml = function(media) {
    var media_html;

    switch(media.content_type) {
      case 'image':
        media_html = '<img src="' + media.url + '" data-media-id="' + media.id + '" alt="' + media.name + '"></img>';
        break;
      case 'youtube':
        media_html = '<iframe data-media-id="' + media.id + '" type="text/html" src="http://www.youtube.com/embed/' + media.video_id + '" frameborder="0" style="width: 100%; height: auto;" />';
        break;
      case 'pdf':
        media_html = '<a href="' + media.url + '" data-media-id="' + media.id + '">' + media.name + '</a>';
        break;
    }

    return media_html;
  }
}(this));
