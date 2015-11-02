(function(global) {
  'use strict';

  _.extend(global.constants.ACTIONS, {
    MEDIAS_CHANGED: 'medias_changed',
    MEDIAS_NEXT: 'medias_next',
    MEDIAS_PREVIOUS: 'medias_previous',
    MEDIAS_SEARCH: 'medias_search',
    INSERT_MEDIA: 'insert_media'
  });

  _.extend(global.constants.FRAME_ACTIONS, {
    GET_MEDIAS: 'get_medias',
    MEDIAS_DATA: 'medias_data'
  });
}(this));
