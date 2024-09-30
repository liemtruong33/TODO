import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { TaskResolver } from "./resolvers/TaskResolver";
import { prisma } from "./prismaClient"; // Prisma client

async function startServer() {
  const schema = await buildSchema({
    resolvers: [TaskResolver],
  });

  const server = new ApolloServer({ schema });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startServer();
