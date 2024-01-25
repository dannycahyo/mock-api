const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router); // Move the router middleware before the custom middleware

// Custom output middleware
server.use((req, res, next) => {
  if (
    res.get("Content-Type") &&
    res.get("Content-Type").includes("application/json")
  ) {
    const oldJson = res.json;

    res.json = function (data) {
      oldJson.call(this, {
        timestamp: new Date().toISOString(),
        statusCode: "00",
        statusDescription: "Success",
        statusTitle: "OK",
        data: data,
      });
    };
  }

  next();
});

const port = process.env.PORT || 30001;
server.listen(port, () => {
  console.log(`JSON Server is running on port http://localhost:${port}`);
});
