// https://github.com/nivardus/riot-fluxable-tag
// Unregisters callbacks on tag unmount
function fluxableTag(tag, dispatcher) {
  // callback lookup {fn: 'action'}
  var callbacks = {};

  tag.on('unmount', function() {
    for (var fn in callbacks) {
      dispatcher.off(callbacks[fn], fn);
    }
  });

  tag.when = function(action, fn) {
    fn = fn.bind(tag);
    dispatcher.on(action, fn);
    callbacks[fn] = action;
  };
}
