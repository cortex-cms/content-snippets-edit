(function(global) {
  'use strict';

  function MediasStore(medias, page) {
    riot.observable(this);

    this.medias = medias || [];

    this.page = page || {
      query: '',
      perPage: 10,
      page: 1
    };

    var self = this;
    window.addEventListener('message', function(event) {
      if (event.data.event == constants.FRAME_ACTIONS.MEDIAS_DATA) {
        self.trigger(constants.ACTIONS.MEDIAS_CHANGED, event.data.medias);
      }
    }, false);

    this.on(constants.ACTIONS.MEDIAS_NEXT, this._next);
    this.on(constants.ACTIONS.MEDIAS_PREVIOUS, this._previous);
    this.on(constants.ACTIONS.MEDIAS_SEARCH, this._search);

    this._fetch();
  }

  MediasStore.prototype._fetch = function() {
    return new Promise(function(resolve, reject) {
      parent.postMessage({event: constants.FRAME_ACTIONS.GET_MEDIAS, page: this.page}, '*');

      this.on(constants.ACTIONS.MEDIAS_CHANGED, function(medias) {
        this.medias = medias;
        resolve(medias);
      });
    }.bind(this));
  };

  MediasStore.prototype._next = function() {
    this.page.page = this.page.page + 1;
    this._fetch();
  };

  MediasStore.prototype._previous = function() {
    this.page.page = this.page.page - 1;
    this._fetch();
  };

  MediasStore.prototype._search = function(query) {
    this.page.query = query;
    this.page.page = 1;
    this._fetch();
  };

  global.MediasStore = MediasStore;
}(this));
