const { ApolloServer, gql } = require('apollo-server');
const MovieSchema = require('./schema/movie');
const TvSeries = require('./schema/tv-series');

const typeDefs = gql`

    type Query

    type Mutation

`;

const resolvers = {

};

const server = new ApolloServer({
    typeDefs: [typeDefs, MovieSchema.typeDefs, TvSeries.typeDefs],
    resolvers: [resolvers, MovieSchema.resolvers, TvSeries.resolvers]
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
