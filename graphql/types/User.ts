// /graphql/types/User.ts
import { enumType, objectType } from 'nexus'
import { Link } from './Link'

export const User = objectType({
    name: 'User',
    definition(t) {
        t.string('id')
        t.string('name')
        t.string('email')
        t.string('image')
        t.field('role', { type: Role })
        t.list.field('bookmarks', {
            type: Link,
            async resolve(_parent, _args, ctx) {
                return await ctx.prisma.user
                    .findUnique({
                        where: {
                            id: _parent.id,
                        },
                    })
                    .bookmarks()
            },
        })
    },
})

const Role = enumType({
    name: 'Role',
    members: ['USER', 'ADMIN'],
})