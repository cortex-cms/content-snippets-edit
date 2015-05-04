(function(global) {
  'use strict';

  var csrf = document.querySelector("meta[name='csrf-token']").attributes['content'].value;

  function Api(baseUrl) {
    this.baseUrl = baseUrl || window.location.origin;
  }

  Api.prototype._request = function(config) {
    config.headers = config.headers || {};

    if (csrf) {
      config.headers['X-CSRF-Token'] = csrf;
    }

    config.headers['Accept'] = 'application/json,text/html';

    return Qajax(config)
      .then(Qajax.filterSuccess)
      .then(Qajax.toJSON);
  };

  Api.prototype.get = function(path) {
    return this._request({url: this.baseUrl + path, method: 'GET'})
  };

  Api.prototype.post = function(path, data) {
    return this._request({url: this.baseUrl + path, method: 'POST', data: data});
  };

  Api.prototype.delete = function(path) {
    return Qajax({url: this.baseUrl + path, method: 'DELETE'}).then(Qajax.filterSuccess);
  };

  Api.prototype.put = function(path, data) {
    return this._request({url: this.baseUrl + path, method: 'PUT', data: data});
  };

  Api.prototype.patch = function(path, data) {
    return this._request({url: this.baseUrl + path, method: 'PATCH', data: data});
  };

  global.Api = Api;

}(this));
