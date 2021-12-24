export const resolvers = {
    Query: {
        links: async (_parent, _args, ctx) => await ctx.prisma.link.findMany(),
    },
}