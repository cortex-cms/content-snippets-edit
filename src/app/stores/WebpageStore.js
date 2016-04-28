(function(global) {
  'use strict';

  function WebpageStore(webpage) {
    riot.observable(this);

    this.webpage = webpage || [];
    this._api = new Api(config.API_BASE);

    this._fetch();
    this.on(constants.ACTIONS.SNIPPET_CHANGED, this._update_snippet);
    this.on(constants.ACTIONS.SAVE_WEBPAGE, this._save);
  }

  WebpageStore.prototype._changed = function() {
    this.trigger(constants.ACTIONS.WEBPAGE_CHANGED, this.webpage);
  };

  WebpageStore.prototype._fetch = function() {
    return new Promise(function(resolve, reject) {
      var url = location.protocol + '//' + location.host + location.pathname;
      this._api
        .get(config.API_ROUTES.WEBPAGES_FEED + '?url=' + encodeURIComponent(url))
        .then(function(webpage) {
          this.webpage = webpage;
          resolve(webpage);
          this._changed();
        }.bind(this), reject);
    }.bind(this));
  };

  WebpageStore.prototype._save = function() {
    parent.postMessage({event: constants.FRAME_ACTIONS.SAVE_WEBPAGE, webpage: this.webpage}, '*');
  };

  WebpageStore.prototype._update_snippet = function(snippet) {
    var that = this,
      foundSnippetIndex = _.findIndex(this.webpage.snippets, function(obj) {
        return obj.document.name === snippet.name;
      });

    if (foundSnippetIndex >= 0) {
      this.webpage.snippets[foundSnippetIndex].document.body = snippet.body;
    }
    else {
      that.webpage.snippets.push({
        document: {
          name: snippet.name,
          body: snippet.body
        }
      });
    }
  };

  global.WebpageStore = WebpageStore;
}(this));
