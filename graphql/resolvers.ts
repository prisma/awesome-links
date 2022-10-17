export const resolvers = {
  Query: {
    links: (_parent, _args, ctx) => {
      return ctx.prisma.link.findMany()
    },
  },
}