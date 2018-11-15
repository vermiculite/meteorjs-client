const Data = require('./Data');

module.exports = function(eventName) {
  const args = Array.prototype.slice.call(arguments, 1);
  let callback
  if (args.length && typeof args[args.length - 1] === 'function') {
    callback = args.pop();
  }

  const id = Data.ddp.method(eventName, args);
  Data.calls.push({
    id: id,
    callback,
  });
}
