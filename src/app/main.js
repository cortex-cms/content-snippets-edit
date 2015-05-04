(function(global) {
  var stores = {
  };

  for (var k in stores) {
    RiotControl.addStore(stores[k]);
  }

  global.stores = stores;

}(this));
