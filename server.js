const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get("/financing/house-type/find-all", (req, res) => {
  const db = router.db;
  const housTypeData = db.get("house-type");

  res.jsonp({
    data: housTypeData,
  });
});

server.use(
  jsonServer.rewriter({
    "/fos/*": "/$1",
    "/financing/*": "/$1",
  }),
);

server.use(jsonServer.bodyParser);
server.use(router);

const port = process.env.PORT || 30001;
server.listen(port, () => {
  console.log(`JSON Server is running on port http://localhost:${port}`);
});
