(function(global) {
  'use strict';

  global.constants = {
    ACTIONS: {
      WEBPAGE_CHANGED: 'webpage_changed',
      SNIPPET_CHANGED: 'snippet_changed',
      SAVE_WEBPAGE: 'save_webpage',
      MEDIAS_CHANGED: 'medias_changed',
      MEDIAS_NEXT: 'medias_next',
      MEDIAS_PREVIOUS: 'medias_previous',
      MEDIAS_SEARCH: 'medias_search',
      INSERT_MEDIA: 'insert_media'
    },
    FRAME_ACTIONS: {
      LOAD_EDITOR: 'load_editor',
      GET_MEDIAS: 'get_medias',
      MEDIAS_DATA: 'medias_data',
      CANCEL_EDITOR: 'cancel_editor',
      SAVE_WEBPAGE: 'save_webpage'
    }
  };
}(this));
