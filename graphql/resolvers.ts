// /graphql/resolvers.ts
import prisma from '../lib/prisma'
export const resolvers = {
    Query: {
        links: () => {
            return prisma.link.findMany()
        },
    },
}