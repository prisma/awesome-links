export const resolvers = {
  Query: {
    links: (_parent, _args, context) => {
      return context.prisma.link.findMany();
    },
  },
};
