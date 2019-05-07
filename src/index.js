const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const resolverMap = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null;
    },
  }),
};

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
    jobsOrdered(parent, args, ctx, info) {
      return ctx.db.query.jobs({ orderBy: args.orderBy }, info)
    },
    bidsOrdered(parent, args, ctx, info) {
      return ctx.db.query.bids({ orderBy: args.orderBy }, info)
    }
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