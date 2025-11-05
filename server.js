import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser)
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(` Teste do JSON Server: ${port}`);
});