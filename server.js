import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Middlewares padrões do JSON Server
server.use(middlewares);

// HABILITAR CORS (ESSENCIAL PARA FUNCIONAR NO GITHUB PAGES)
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  // Para requisições OPTIONS (pré-flight CORS)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Necessário para trabalhar com JSON no corpo das requisições
server.use(jsonServer.bodyParser);

// Rotas do JSON Server
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`🚀 JSON Server rodando na porta ${port}`);
});