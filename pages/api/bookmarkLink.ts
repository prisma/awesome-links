import { prisma } from '../../lib/prisma';

export default async function bookmark(req, res) {
  const { id } = req.body;
  const link = await prisma.link.findUnique({
    where: { id },
  });

  await prisma.user.update({
    where: {
      email: 'abdelwahab@prisma.io',
    },
    data: {
      favorites: {
        connect: {
          id: link.id,
        },
      },
    },
  });
  return res.status(200).json({
    message: `Link has been saved!`,
  });
}
