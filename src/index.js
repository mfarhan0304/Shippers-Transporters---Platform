const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    jobs(parent, args, ctx, info) {
      return ctx.db.query.jobs({ }, info)
    },
    bids(parent, args, ctx, info) {
      return ctx.db.query.bids({ }, info)
    },
    bidsToJob(parent, args, ctx, info) {
      return ctx.db.query.bids({ where: {job_id: {id: args.job_id} } }, info)
    },
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
      ...req,
      db: new Prisma({
        typeDefs: 'src/generated/prisma.graphql',
        endpoint: 'https://us1.prisma.sh/muhammad-farhan-f93c9b/database/dev',
      }),
  }),
})

server.start(() => console.log(`The server is running on http://localhost:4000`))