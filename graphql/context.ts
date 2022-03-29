import { PrismaClient } from '@prisma/client';
import prisma from '../lib/prisma';
import { Claims, getSession } from '@auth0/nextjs-auth0';

export type Context = {
  user: Claims;
  accessToken: string;
  prisma: PrismaClient;
};
export async function createContext({ req, res }): Promise<Context> {
  const { user, accessToken } = getSession(req, res);
  return {
    user,
    accessToken,
    prisma,
  };
}
