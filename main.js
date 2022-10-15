const { Worker, isMainThread, parentPort } = require("node:worker_threads");

if (isMainThread) {
  module.exports = function stringifyJson(json) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename);
      worker.once("message", (message) => {
        resolve(message);
      });
      worker.postMessage(json);
      worker.on("error", reject);
    });
  };
} else {
  parentPort.once("message", (json) => {
    parentPort.postMessage(JSON.stringify(json));
  });
}
