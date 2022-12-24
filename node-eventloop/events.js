const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();

myEmitter.on("test", () => {
  console.log("test event");
});

myEmitter.on("test", (stock) => {
  console.log("test event 2", stock);
});

myEmitter.emit("test", 9);

////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("request received");
  res.end("request sent");
});
server.on("request", (req, res) => {
  console.log("another request received");
});
server.on("close", () => {
  console.log("server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("waiting for requests");
});
