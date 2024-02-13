const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get("/financing/house-type/find-all", (req, res) => {
  const db = router.db;
  const housTypeData = db.get("house-type");

  res.jsonp({
    data: housTypeData,
  });
});

server.get("/synchronize-collateral", (req, res) => {
  const { registrationNumber } = req.body;
  const db = router.db;
  const sycnhronizeCollateralData = db.get("synchronize-collateral");

  const collateralData = sycnhronizeCollateralData.value();

  res.jsonp({
    data: {
      registrationNumber,
      ...collateralData,
    },
  });
});

server.use(
  jsonServer.rewriter({
    "/fos/*": "/$1",
    "/financing/*": "/$1",
  }),
);

server.use(router);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port http://localhost:${port}`);
});
