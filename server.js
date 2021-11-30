const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs');
const { connectDb } = require('./database');
const { AuthResolvers, UserResolvers, CategoriseResolvers, ProductResolvers } = require('./resolvers')
const { getUser } = require('./helper/getUser');

const authSchema = readFileSync('./schemas/auth.schema.graphql').toString('utf-8')
const userSchema = readFileSync('./schemas/user.schema.graphql').toString('utf-8')
const categoriseSchema = readFileSync('./schemas/categorise.schema.graphql').toString('utf-8')
const productSchema = readFileSync('./schemas/product.schema.graphql').toString('utf-8')

const typeDefs = [authSchema, userSchema, categoriseSchema, productSchema]
const resolvers = [AuthResolvers, UserResolvers, CategoriseResolvers, ProductResolvers]

const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')



try {



  const server = new ApolloServer({

      typeDefs, resolvers, introspection: true, playground: true, context: async ({ req }) => {

      const token = req.headers.authorization || '';

      const user = await getUser(token);

      return { auth: user.auth, user: user.user, role: user.role, token }

    }
  });



  connectDb()

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });



} catch (error) {
  console.log(error);
}
