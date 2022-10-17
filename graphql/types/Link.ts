import { objectType, extendType, intArg } from 'nexus'
import { User } from './User'

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.int('id')
    t.string('title')
    t.string('url')
    t.string('description')
    t.string('imageUrl')
    t.string('category')
    t.list.field('users', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.link
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .users()
      },
    })
  },
})

export const LinksQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('links', {
      type: Response,
      args: {
        first: intArg(),
        after: intArg()
      },
      async resolve(_, args, ctx) {
        let queryResults = null

        if (args.after) {
          queryResults = await ctx.prisma.link.findMany({
            take: args.first, 
            skip: 1, 
            cursor: {
              id: args.after,
            },
          })
        } else {
          queryResults = await ctx.prisma.link.findMany({
            take: args.first,
          })
        }
        if (queryResults.length > 0) {
          const lastLinkInResults = queryResults[queryResults.length - 1]
          const myCursor = lastLinkInResults.id

          const secondQueryResults = await ctx.prisma.link.findMany({
            take: args.first,
            cursor: {
              id: myCursor,
            },
            orderBy: {
              id: 'asc',
            },
          })
          // return response
          const result = {
            pageInfo: {
              endCursor: myCursor,
              hasNextPage: secondQueryResults.length >= args.first,
            },
            edges: queryResults.map(link => ({
              cursor: link.id,
              node: link,
            })),
          }

          return result
        }
        //
        return {
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          },
          edges: [],
        }
      },
    })
  },
})

export const Edge = objectType({
  name: 'Edge',
  definition(t) {
    t.string('cursor')
    t.field('node', {
      type: Link,
    })
  },
})

export const PageInfo = objectType({
  name: 'PageInfo',
  definition(t) {
    t.int('endCursor')
    t.boolean('hasNextPage')
  },
})

export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.field('pageInfo', { type: PageInfo })
    t.list.field('edges', {
      type: Edge,
    })
  },
})