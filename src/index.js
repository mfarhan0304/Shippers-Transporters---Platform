const { GraphQLServer } = require('graphql-yoga')

const resolvers = {
  Query: {
    jobs: () => jobs,
    bids: () => bids,
    bidsToJob: (parent, args) => postMessage.find(bid => bid.Job.id === args.id)
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`The server is running on http://localhost:4000`))