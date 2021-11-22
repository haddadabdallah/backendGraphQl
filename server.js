const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs');
const { connectDb } = require('./database');
const { AuthResolvers, UserResolvers } = require('./resolvers')
const { getUser } = require('./helper/getUser');

const authSchema = readFileSync('./schemas/auth.schema.graphql').toString('utf-8')
const userSchema = readFileSync('./schemas/user.schema.graphql').toString('utf-8')



const typeDefs = [authSchema, userSchema]
const resolvers = [AuthResolvers, UserResolvers]


const server = new ApolloServer({
  typeDefs, resolvers, context: async ({ req }) => {

    const token = req.headers.authorization || '';

    const user = await getUser(token);

    return { auth: user ? true : false, user }

  }
});

connectDb()

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});