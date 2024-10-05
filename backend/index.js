const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { ApolloServer } = require("@apollo/server");
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer");
const { expressMiddleware } = require("@apollo/server/express4");
const mongoose = require("mongoose");
const app = express();
const httpServer = http.createServer(app);
const {typeDefs} = require("./graphql/shema")
const {resolvers} = require("./graphql/resovled")
dotenv.config();

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
});

async function startServer() {
  await server.start();

  app.use(
    bodyParser.json({ limit: "50mb" }),
    cors(),
    expressMiddleware(server)
  );

  mongoose.connect(process.env.CONNECT)
    .then(async() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log("🚀 Server is running on http://localhost:4000/graphql");
}

startServer();
