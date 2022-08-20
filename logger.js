const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(msg) {
    console.log(msg);

    this.emit("loggedMessage", { id: 1, name: "Mohammed" });
  }
}

module.exports = Logger;
